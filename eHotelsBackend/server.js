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
    idleTimeoutMillis: 30000,  // Augmenté à 30 secondes
    connectionTimeoutMillis: 10000,  // Augmenté à 10 secondes
    max: 20,  // Réduit à 20 connexions maximum
    ssl: {
        rejectUnauthorized: false
    }
});

// Gestionnaire d'erreurs pour le pool
pool.on('error', (err, client) => {
    console.error('Erreur inattendue sur le client idle', err);
    process.exit(-1);
});

// Fonction pour vérifier la connexion
async function checkConnection() {
    try {
        const client = await pool.connect();
        console.log("✅ Connexion à PostgreSQL réussie");
        client.release();
    } catch (err) {
        console.error("❌ Problème de connexion à PostgreSQL :", err);
        // Attendre 5 secondes et réessayer
        setTimeout(checkConnection, 5000);
    }
}

// Vérifier la connexion au démarrage
checkConnection();

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
/*
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

*/



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
    
    if (!hotel_id) {
        return res.status(400).json({ error: "hotel_id est requis" });
    }
    
    try {
        let query = `
            SELECT r.room_id, r.room_id as room_number, r.room_type, r.capacity, r.price_per_night
            FROM room r
            WHERE r.status = 'Available' AND r.hotel_id = $1
        `;
        
        const params = [hotel_id];
        let paramIndex = 2;
        
        if (appliances) {
            query += ` AND r.appliances = $${paramIndex++}`;
            params.push(appliances);
        }
        
        if (capacity) {
            query += ` AND r.capacity = $${paramIndex++}`;
            params.push(capacity);
        }
        
        if (extras) {
            query += ` AND r.extras = $${paramIndex++}`;
            params.push(extras);
        }
        
        if (existing_damage) {
            query += ` AND r.existing_damage = $${paramIndex++}`;
            params.push(existing_damage);
        }
        
        query += ` ORDER BY r.room_id ASC`;
        
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Erreur lors de la récupération des chambres disponibles:", err);
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

// Route pour récupérer la liste des hôtels dans suppressions hotel
app.get('/hotels', async (req, res) => {
    try {
      const result = await pool.query(`SELECT hotel_id, email_address FROM hotel`);
      res.json(result.rows);
    } catch (err) {
      console.error("❌ Erreur lors de la récupération des hôtels :", err.message);
      res.status(500).json({ error: "Erreur serveur : " + err.message });
    }
  });

// delete hotel
app.delete('/delete-hotel/:id', async (req, res) => {
    const hotelId = req.params.id;
    console.log("🔹 Requête DELETE reçue pour hotelId :", hotelId); // Debugging


    try {
        const result = await pool.query(
            'DELETE FROM hotel WHERE hotel_id = $1 RETURNING *',
            [hotelId]  
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "❌ Hôtel introuvable ou déjà supprimé." });
        }

        console.log("✅ Hôtel supprimé avec succès :", hotelId);
        res.json({ success: true, message: "✅ Hôtel supprimé avec succès !" });

    } catch (err) {
        console.error("❌ Erreur lors de la suppression :", err.message);
        res.status(500).json({ success: false, message: "Erreur serveur : " + err.message });
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

// Endpoint pour l'enregistrement d'un client avec réservation existante
app.post("/api/reservations/check-in", async (req, res) => {
    const { reservationId } = req.body;
    
    // Temporairement, on utilise un ID d'employé fixe pour les tests
    // À remplacer par l'authentification réelle plus tard
    const employeeId = 1; // ID d'employé temporaire pour les tests

    if (!reservationId) {
        return res.status(400).json({ error: "ID de réservation manquant" });
    }

    try {
        // Vérifier si la réservation existe et est valide
        const reservationCheck = await pool.query(
            `SELECT r.*, rm.room_id, rm.hotel_id 
             FROM reservation r
             JOIN room rm ON r.room_id = rm.room_id
             WHERE r.reservation_id = $1 AND r.reservation_status = 'Pending'`,
            [reservationId]
        );

        if (reservationCheck.rows.length === 0) {
            return res.status(404).json({ error: "Réservation non trouvée ou non confirmée" });
        }

        const reservation = reservationCheck.rows[0];

        // Créer l'enregistrement
        const registrationResult = await pool.query(
            `INSERT INTO registration (employee_id, client_id, registration_date)
             VALUES ($1, $2, CURRENT_TIMESTAMP)
             RETURNING registration_id`,
            [employeeId, reservation.client_id]
        );

        // Créer la location
        const rentResult = await pool.query(
            `INSERT INTO rent (employee_id, reservation_id, room_id, rent_date)
             VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
             RETURNING rent_id`,
            [employeeId, reservationId, reservation.room_id]
        );

        // Mettre à jour le statut de la chambre
        await pool.query(
            `UPDATE room SET status = 'Occupied' WHERE room_id = $1`,
            [reservation.room_id]
        );

        // Mettre à jour le statut de la réservation
        await pool.query(
            `UPDATE reservation SET reservation_status = 'Checked-in' WHERE reservation_id = $1`,
            [reservationId]
        );

        res.json({
            message: "Client enregistré avec succès",
            registrationId: registrationResult.rows[0].registration_id,
            rentId: rentResult.rows[0].rent_id
        });

    } catch (err) {
        console.error("❌ Erreur lors de l'enregistrement du client:", err);
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
});

app.listen(port, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});

// Route d'inscription aux employés
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email et mot de passe requis" });
  
    try {
      const result = await pool.query(
        "INSERT INTO employee_account (email, password) VALUES ($1, $2) RETURNING *",
        [email, password] 
      );
      res.json({ success: true, message: "Compte créé avec succès", user: result.rows[0] });
    } catch (err) {
      console.error("Erreur d'inscription :", err.message);
      res.status(500).json({ success: false, message: err.message });
    }
  });
  // route pour se connecter aux employés
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email et mot de passe requis" });
  
    try {
      const result = await pool.query(
        "SELECT * FROM employee_account WHERE email = $1 AND password = $2",
        [email, password]
      );
  
      if (result.rows.length === 0) {
        return res.status(401).json({ success: false, message: "Identifiants invalides" });
      }
  
      res.json({ success: true, message: "Connexion réussie", user: result.rows[0] });
    } catch (err) {
      console.error("Erreur de connexion :", err.message);
      res.status(500).json({ success: false, message: err.message });
    }
  });
  
  // 🔁 Récupérer toutes les adresses (pour formulaire employé)
app.get('/addresses', async (req, res) => {
    try {
      const result = await pool.query(`SELECT address_id, civic_number, street_name, town FROM address ORDER BY address_id ASC`);
      res.json(result.rows);
    } catch (err) {
      console.error("❌ Erreur lors de la récupération des adresses :", err.message);
      res.status(500).json({ error: "Erreur serveur : " + err.message });
    }
  });

  // Récupérer toutes les adresses disponibles
app.get("/addresses", async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT address_id, civic_number, street_name, town FROM address ORDER BY address_id ASC"
      );
      res.json(result.rows);
    } catch (err) {
      console.error("Erreur lors de la récupération des adresses:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });
  
  // Ajouter un employé
  app.post("/add-employee", async (req, res) => {
    const { full_name, NAS, Position, Hotel_Id, Address_Id } = req.body;
  
    if (!full_name || !NAS || !Position || !Hotel_Id || !Address_Id) {
      return res.status(400).json({ success: false, message: "Tous les champs sont requis." });
    }
  
    try {
      const result = await pool.query(
        `INSERT INTO employee (full_name, NAS, Position, Hotel_Id, Address_Id)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [full_name, NAS, Position, Hotel_Id, Address_Id]
      );
  
      res.json({ success: true, message: "Employé ajouté", data: result.rows[0] });
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'employé :", err.message);
      res.status(500).json({ success: false, message: err.message });
    }
  });
  
// Endpoint pour obtenir les chambres disponibles
app.get("/api/rooms/available", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT r.room_id, r.room_number, r.room_type, r.capacity, r.price_per_night
            FROM room r
            WHERE r.status = 'Available'
            ORDER BY r.room_number ASC
        `);
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Erreur lors de la récupération des chambres disponibles:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Endpoint pour l'enregistrement d'un client avec réservation existante
app.post("/api/reservations/check-in", async (req, res) => {
    const { reservationId } = req.body;
    
    // Temporairement, on utilise un ID d'employé fixe pour les tests
    // À remplacer par l'authentification réelle plus tard
    const employeeId = 1; // ID d'employé temporaire pour les tests

    if (!reservationId) {
        return res.status(400).json({ error: "ID de réservation manquant" });
    }

    try {
        // Vérifier si la réservation existe et est valide
        const reservationCheck = await pool.query(
            `SELECT r.*, rm.room_id, rm.hotel_id 
             FROM reservation r
             JOIN room rm ON r.room_id = rm.room_id
             WHERE r.reservation_id = $1 AND r.reservation_status = 'Pending'`,
            [reservationId]
        );

        if (reservationCheck.rows.length === 0) {
            return res.status(404).json({ error: "Réservation non trouvée ou non confirmée" });
        }

        const reservation = reservationCheck.rows[0];

        // Créer l'enregistrement
        const registrationResult = await pool.query(
            `INSERT INTO registration (employee_id, client_id, registration_date)
             VALUES ($1, $2, CURRENT_TIMESTAMP)
             RETURNING registration_id`,
            [employeeId, reservation.client_id]
        );

        // Créer la location
        const rentResult = await pool.query(
            `INSERT INTO rent (employee_id, reservation_id, room_id, rent_date)
             VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
             RETURNING rent_id`,
            [employeeId, reservationId, reservation.room_id]
        );

        // Mettre à jour le statut de la chambre
        await pool.query(
            `UPDATE room SET status = 'Occupied' WHERE room_id = $1`,
            [reservation.room_id]
        );

        // Mettre à jour le statut de la réservation
        await pool.query(
            `UPDATE reservation SET reservation_status = 'Checked-in' WHERE reservation_id = $1`,
            [reservationId]
        );

        res.json({
            message: "Client enregistré avec succès",
            registrationId: registrationResult.rows[0].registration_id,
            rentId: rentResult.rows[0].rent_id
        });

    } catch (err) {
        console.error("❌ Erreur lors de l'enregistrement du client:", err);
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
});

// Endpoint pour l'enregistrement d'un nouveau client
app.post("/api/clients/check-in", async (req, res) => {
    const { fullName, nas, addressId, roomId } = req.body;
    
    // Temporairement, on utilise un ID d'employé fixe pour les tests
    // À remplacer par l'authentification réelle plus tard
    const employeeId = 1; // ID d'employé temporaire pour les tests

    if (!fullName || !nas || !addressId || !roomId) {
        return res.status(400).json({ error: "Données manquantes" });
    }

    try {
        // Vérifier si le NAS existe déjà
        const clientCheck = await pool.query(
            "SELECT client_id FROM client WHERE nas = $1",
            [nas]
        );

        let clientId;
        if (clientCheck.rows.length > 0) {
            clientId = clientCheck.rows[0].client_id;
            // Mettre à jour l'adresse du client existant si nécessaire
            await pool.query(
                "UPDATE client SET address_id = $1 WHERE client_id = $2",
                [addressId, clientId]
            );
        } else {
            // Créer un nouveau client
            const newClient = await pool.query(
                `INSERT INTO client (full_name, nas, address_id)
                 VALUES ($1, $2, $3)
                 RETURNING client_id`,
                [fullName, nas, addressId]
            );
            clientId = newClient.rows[0].client_id;
        }

        // Créer l'enregistrement avec la date actuelle
        const registrationResult = await pool.query(
            `INSERT INTO registration (employee_id, client_id, registration_date)
             VALUES ($1, $2, CURRENT_TIMESTAMP)
             RETURNING registration_id, registration_date`,
            [employeeId, clientId]
        );

        // Créer la location
        const rentResult = await pool.query(
            `INSERT INTO rent (employee_id, room_id, rent_date)
             VALUES ($1, $2, CURRENT_TIMESTAMP)
             RETURNING rent_id`,
            [employeeId, roomId]
        );

        // Mettre à jour le statut de la chambre
        await pool.query(
            `UPDATE room SET status = 'Occupied' WHERE room_id = $1`,
            [roomId]
        );

        res.json({
            message: "Nouveau client enregistré avec succès",
            clientId: clientId,
            registrationId: registrationResult.rows[0].registration_id,
            registrationDate: registrationResult.rows[0].registration_date,
            rentId: rentResult.rows[0].rent_id
        });

    } catch (err) {
        console.error("❌ Erreur lors de l'enregistrement du nouveau client:", err);
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
});

// Endpoint pour créer une adresse
app.post("/api/address", async (req, res) => {
    const { civic_number, postal_code, street_name, town, province, country } = req.body;

    if (!civic_number || !postal_code || !street_name || !town || !province || !country) {
        return res.status(400).json({ error: "Toutes les informations d'adresse sont requises" });
    }

    try {
        // Vérifier si l'adresse existe déjà
        const addressCheck = await pool.query(
            `SELECT address_id FROM address 
             WHERE civic_number = $1 
             AND street_name = $2 
             AND town = $3 
             AND province = $4 
             AND country = $5`,
            [civic_number, street_name, town, province, country]
        );

        let addressId;
        if (addressCheck.rows.length > 0) {
            addressId = addressCheck.rows[0].address_id;
        } else {
            // Créer une nouvelle adresse
            const newAddress = await pool.query(
                `INSERT INTO address (civic_number, postal_code, street_name, town, province, country)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING address_id`,
                [civic_number, postal_code, street_name, town, province, country]
            );
            addressId = newAddress.rows[0].address_id;
        }

        res.json({
            message: "Adresse enregistrée avec succès",
            address_id: addressId
        });

    } catch (err) {
        console.error("❌ Erreur lors de la création de l'adresse:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Endpoint pour obtenir les informations de l'employé connecté
app.get("/api/employee/current", async (req, res) => {
    // TODO: Implémenter la vérification du token JWT
    const employeeId = req.headers['authorization']?.split(' ')[1];
    
    if (!employeeId) {
        return res.status(401).json({ error: "Non authentifié" });
    }

    try {
        const result = await pool.query(
            `SELECT employee_id, hotel_id, full_name, position 
             FROM employee 
             WHERE employee_id = $1`,
            [employeeId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Employé non trouvé" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("❌ Erreur lors de la récupération des informations de l'employé:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Endpoint pour récupérer les détails d'une réservation
app.get("/api/reservations/:id", async (req, res) => {
    const reservationId = req.params.id;

    try {
        const result = await pool.query(
            `SELECT r.*, rm.room_type, rm.capacity, rm.price_per_night, 
                    c.full_name as client_name, c.nas as client_nas,
                    h.email_address as hotel_name
             FROM reservation r
             JOIN room rm ON r.room_id = rm.room_id
             JOIN client c ON r.client_id = c.client_id
             JOIN hotel h ON rm.hotel_id = h.hotel_id
             WHERE r.reservation_id = $1`,
            [reservationId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Réservation non trouvée" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("❌ Erreur lors de la récupération de la réservation:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});
  