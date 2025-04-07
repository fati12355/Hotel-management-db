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
// Fonction pour afficher les données d'une table spécifique
async function viewTableData(tableName, limit = 10) {
    try {
        // Requête pour obtenir les colonnes de la table
        const columnsResult = await pool.query(`
            SELECT column_name
            FROM information_schema.columns
            WHERE table_schema = 'public' 
            AND table_name = $1
            ORDER BY ordinal_position;
        `, [tableName]);
        
        // Requête pour obtenir les données de la table
        const dataResult = await pool.query(`
            SELECT *
            FROM ${tableName}
            LIMIT $2;
        `, [tableName, limit]);
        
        // Obtenir les noms des colonnes
        const columns = columnsResult.rows.map(row => row.column_name);
        
        console.log(`\n=== DONNÉES DE LA TABLE: ${tableName.toUpperCase()} (${dataResult.rows.length} lignes) ===`);
        
        // Afficher les en-têtes
        const headerRow = columns.map(col => col.padEnd(15)).join(' | ');
        const separator = columns.map(() => '-'.repeat(15)).join('-+-');
        
        console.log(headerRow);
        console.log(separator);
        
        // Afficher les données
        dataResult.rows.forEach(row => {
            const dataRow = columns.map(col => {
                const value = row[col] === null ? 'NULL' : String(row[col]);
                return value.padEnd(15);
            }).join(' | ');
            console.log(dataRow);
        });
        
        // Afficher le nombre total de lignes
        const countResult = await pool.query(`SELECT COUNT(*) FROM ${tableName}`);
        const totalRows = countResult.rows[0].count;
        console.log(`\nTotal: ${totalRows} lignes (affichées: ${dataResult.rows.length})`);
        
    } catch (err) {
        console.error(`❌ Erreur lors de la récupération des données de la table ${tableName}:`, err);
    }
}

// Fonction pour afficher toutes les tables
async function viewAllTables() {
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
        
        return result.rows.map(row => row.table_name);
    } catch (err) {
        console.error('❌ Erreur lors de la récupération des tables:', err);
        return [];
    }
}

// Fonction principale
async function main() {
    try {
        // Obtenir toutes les tables
        const tables = await viewAllTables();
        
        // Demander à l'utilisateur quelle table examiner
        console.log('\nEntrez le numéro de la table à examiner:');
        
        // Simuler une entrée utilisateur (dans un environnement réel, vous utiliseriez readline ou un autre mécanisme)
        const tableIndex = 0; // Par défaut, examiner la première table
        
        if (tableIndex >= 0 && tableIndex < tables.length) {
            // Afficher les données de la table sélectionnée
            await viewTableData(tables[tableIndex]);
        } else {
            console.log('❌ Numéro de table invalide');
        }
    } catch (err) {
        console.error('❌ Erreur:', err);
    } finally {
        // Fermer la connexion
        pool.end();
    }
}

// Exécuter la fonction principale
main(); 