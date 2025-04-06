const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
require("dotenv").config();


const app = express();
const port = 3000;

const pool = new Pool({
    user: "postgres.mhpjodxfdqkjmjbbotvm",
    host: "aws-0-ca-central-1.pooler.supabase.com",
    database: "postgres",
    password: "Hotel4$$$gamelle",
    port: 5432,
    idleTimeoutMillis: 3000,  // Ferme les connexions inactives après 30 sec
    connectionTimeoutMillis: 5000,  // Attend 5 sec avant de fermer une connexion
    max: 100,  // Limite à 100 le nombre maximal de connexions
});
pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("❌ Problème de connexion à PostgreSQL :", err);
    } else {
        console.log("✅ Connexion à PostgreSQL réussie :", res.rows[0]);
    }
});



app.use(cors());
app.use(bodyParser.json());

app.get("/hotelChains", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM hotel_chain");
        res.json(result.rows);
    } catch (err) {
        res.status(500).send("Erreur serveur");
    }
});

app.get("/hotels", async (req, res) => {
    const hotelchain_id = Number(req.query.hotelchain_id);// ✅ Déclarer la variable correctement

    if (isNaN(hotelchain_id)) {
        return res.status(400).json({ error: "hotelchain_id invalide" });
    }

    try {
        const result = await pool.query(`
            SELECT 
                h.hotel_id,
              h.email_address, 
              a.street_name, 
              a.town, 
              a.province, 
              a.country
            FROM hotel h
            JOIN address a ON h.address_id = a.address_id
            WHERE h.hotelchain_id = $1
        `, [hotelchain_id]);

        res.json(result.rows); // ✅ Retourner les bons résultats
    } catch (err) {
        console.error("Erreur lors de la récupération des hôtels :", err);
        res.status(500).send("Erreur serveur");
    }
});

app.get("/roomFilters", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DISTINCT appliances, capacity, extras, existing_damage 
            FROM room 
            WHERE status = 'Available'
        `);
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Erreur lors du chargement des filtres :", err);
        res.status(500).send("Erreur serveur");
    }
});


app.get("/availableRooms", async (req, res) => {
    const { hotel_id, appliances, capacity, extras, existing_damage } = req.query;

    if (!hotel_id) return res.status(400).json({ error: "❌ hotel_id manquant" });

    try {
        let query = `SELECT * FROM room WHERE hotel_id = $1 AND status = 'Available'`;
        let params = [hotel_id];
        let index = 2;

        if (appliances) {
            query += ` AND appliances = $${index++}`;
            params.push(appliances);
        }

        if (capacity) {
            query += ` AND capacity = $${index++}`;
            params.push(capacity);
        }

        if (extras) {
            query += ` AND extras = $${index++}`;
            params.push(extras);
        }

        if (existing_damage) {
            query += ` AND existing_damage = $${index++}`;
            params.push(existing_damage);
        }

        query += ` ORDER BY room_id ASC`;
        const result = await pool.query(query, params);

        res.json(result.rows);
    } catch (err) {
        console.error("❌ Erreur lors du filtrage des chambres :", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});


app.get("/reservation", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM reservation ORDER BY reservation_id ASC");
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Erreur lors de la récupération des réservations:", err);
        res.status(500).send("Erreur serveur");
    }
});
app.post("/rent", async (req, res) => {
    const { employee_id, reservation_id, room_id, rent_date } = req.body;

    try {
        //  Vérifier si la chambre est disponible
        const roomCheck = await pool.query(
            "SELECT * FROM room WHERE room_id = $1 AND status = 'Available'",
            [room_id]
        );

        if (roomCheck.rows.length === 0) {
            return res.status(400).json({ message: "❌ La chambre est déjà occupée ou n'existe pas." });
        }

        //  Insérer la location (même si reservation_id est null)
        const insert = await pool.query(
            "INSERT INTO rent (employee_id, reservation_id, room_id, rent_date) VALUES ($1, $2, $3, $4) RETURNING rent_id",
            [employee_id, reservation_id || null, room_id, rent_date]
        );

        //  Mettre à jour le statut de la chambre si reservation_id est null
        if (!reservation_id) {
            await pool.query(
                "UPDATE room SET status = 'Occupied' WHERE room_id = $1",
                [room_id]
            );
        }

        res.json({ message: "✅ Location confirmée !", rent_id: insert.rows[0].rent_id });

    } catch (err) {
        console.error("❌ Erreur lors de l'enregistrement de la location :", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});



app.post("/address", async (req, res) => {
    console.log("📥 Données reçues :", req.body);

    const { civic_number, postal_code, street_name, town, province, country } = req.body;

    if (!civic_number || !postal_code || !street_name || !town || !province || !country) {
        console.log("❌ Données manquantes !");
        return res.status(400).json({ error: "❌ Données manquantes !" });
    }
    
    try {
        console.log("🔎 Vérification si l'adresse existe déjà...");
        let addressCheck = await pool.query(
            "SELECT address_id FROM address WHERE civic_number = $1 AND street_name = $2 AND town = $3",
            [civic_number, street_name, town]
        );

        let address_id;
        if (addressCheck.rows.length > 0) {
            address_id = addressCheck.rows[0].address_id;
            console.log("✅ Adresse déjà existante :", address_id);
        } else {
            console.log("📝 Insertion d'une nouvelle adresse...");
            const newAddress = await pool.query(
                "INSERT INTO address (civic_number, postal_code, street_name, town, province, country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING address_id",
                [civic_number, postal_code, street_name, town, province, country]
            );
            address_id = newAddress.rows[0].address_id;
            console.log("✅ Nouvelle adresse enregistrée :", address_id);
        }

        res.json({ message: "✅ Adresse enregistrée !", address_id });

    } catch (err) {
        console.error("❌ Erreur serveur :", err);
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
});




app.post("/client", async (req, res) => {
    console.log("📥 Données reçues pour enregistrement client :", req.body); // Debugging

    const { full_name, nas,  address_id } = req.body;

    if (!full_name || !nas || !address_id) {
        console.log("❌ Données manquantes !");
        return res.status(400).json({ error: "❌ Données manquantes !" });
    }

    try {
        console.log("🔎 Vérification si le client existe déjà...");
        let clientCheck = await pool.query("SELECT client_id FROM client WHERE nas = $1", [nas]);

        if (clientCheck.rows.length > 0) {
            console.log("✅ Client déjà existant :", clientCheck.rows[0].client_id);
            return res.json({ message: "✅ Client déjà existant", client_id: clientCheck.rows[0].client_id });
        }

        console.log("📝 Insertion d'un nouveau client...");
        const newClient = await pool.query(
            "INSERT INTO client (full_name, nas, address_id) VALUES ($1, $2, $3) RETURNING client_id",
            [full_name, nas, address_id]
        );
        

        console.log("✅ Nouveau client enregistré :", newClient.rows[0].client_id);
        res.json({ message: "✅ Client enregistré !", client_id: newClient.rows[0].client_id });

    } catch (err) {
        console.error("❌ Erreur serveur lors de l'enregistrement du client :", err);
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
});




app.post("/reservation", async (req, res) => {
    const { client_id, room_id, reservation_date } = req.body;
    

    try {
        // Vérifier si la chambre est disponible
        const roomCheck = await pool.query("SELECT * FROM room WHERE room_id = $1 AND status = 'Available'", [room_id]);
        if (roomCheck.rows.length === 0) {
            return res.status(400).json({ message: "❌ Chambre non disponible." });
        }

        // Insérer la réservation
        // ✅ On récupère reservation_id avec RETURNING
        const insert = await pool.query(
            "INSERT INTO reservation (client_id, room_id, reservation_date, reservation_status) VALUES ($1, $2, $3, 'Pending') RETURNING reservation_id",
            [client_id, room_id, reservation_date]
        );
        
        const reservation_id = insert.rows[0].reservation_id;
        // ✅ Update du statut
        await pool.query("UPDATE room SET status = 'Occupied' WHERE room_id = $1", [room_id]);

        // ✅ Retour avec reservation_id
        res.json({ message: "✅ Réservation confirmée !", reservation_id: insert.rows[0].reservation_id });

 



    } catch (err) {
        console.error("❌ Erreur lors de la réservation:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});







app.listen(port, () => {
    console.log(`🚀 Serveur backend démarré sur http://localhost:${port}`);
});
