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
    idleTimeoutMillis: 30000,  // Ferme les connexions inactives après 30 sec
    connectionTimeoutMillis: 5000,  // Attend 5 sec avant de fermer une connexion
    max: 20,  // Limite à 20 le nombre maximal de connexions
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
    const hotelchain_id = Number(req.query.hotelchain_id);


    
    if (isNaN(hotelchain_id)) {
        return res.status(400).json({ error: "hotelchain_id invalide" });
    }

    try {
        const result = await pool.query("SELECT * FROM hotel WHERE hotelchain_id = $1", [hotelchain_id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).send("Erreur serveur");
    }
});

app.get("/rooms", async (req, res) => {
    const hotel_id = parseInt(req.query.hotel_id); // Convertir en nombre
    
    if (isNaN(hotel_id)) {
        return res.status(400).json({ error: "❌ hotel_id invalide" });
    }

    try {
        const query = "SELECT * FROM public.room WHERE hotel_id = $1 AND status = 'Available' ORDER BY room_id ASC";
        const result = await pool.query(query, [hotel_id]);

        res.json(result.rows);
    } catch (err) {
        console.error("❌ Erreur lors de la récupération des chambres:", err);
        res.status(500).send("Erreur serveur");
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


app.post("/reservation", async (req, res) => {
    const { client_id, room_id, reservation_date } = req.body;  // ✅ Récupère uniquement les champs de la table

    try {
        // Vérifier que la chambre existe et est disponible
        const roomCheck = await pool.query("SELECT * FROM room WHERE room_id = $1 AND status = 'Available'", [room_id]);
        if (roomCheck.rows.length === 0) {
            return res.status(400).json({ message: "❌ La chambre sélectionnée n'est pas disponible." });
        }

        // Insérer la réservation dans la table reservation
        await pool.query(
            "INSERT INTO reservation (client_id, room_id, reservation_date, reservation_status) VALUES ($1, $2, $3, 'Pending')",
            [client_id, room_id, reservation_date]
        );

        res.json({ message: "✅ Réservation enregistrée avec succès !" });
    } catch (err) {
        console.error("❌ Erreur lors de la réservation:", err);
        res.status(500).send("Erreur serveur");
    }
});



app.listen(port, () => {
    console.log(`🚀 Serveur backend démarré sur http://localhost:${port}`);
});
