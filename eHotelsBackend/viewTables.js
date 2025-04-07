const { Pool } = require('pg');

// Configuration de la connexion à la base de données
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

// Fonction pour afficher toutes les tables
async function viewTables() {
    try {
        // Requête pour obtenir toutes les tables
        const result = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        `);
        
        console.log('=== TABLES DE LA BASE DE DONNÉES ===');
        result.rows.forEach((row, index) => {
            console.log(`${index + 1}. ${row.table_name}`);
        });
        
        // Afficher le nombre total de tables
        console.log(`\nTotal: ${result.rows.length} tables`);
        
    } catch (err) {
        console.error('❌ Erreur lors de la récupération des tables:', err);
    } finally {
        // Fermer la connexion
        pool.end();
    }
}

// Exécuter la fonction
viewTables(); 