const { Pool } = require('pg');

// Configuration de la connexion à la base de données
const pool = new Pool({
    user: 'postgres',
    host: 'db.ixvxvxvxvxvxvxvxvxvxv.supabase.co',
    database: 'postgres',
    password: 'Seren2003',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    },
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    max: 20
});

// Fonction pour afficher la structure d'une table spécifique
async function viewTableStructure(tableName) {
    try {
        // Requête pour obtenir les colonnes de la table
        const result = await pool.query(`
            SELECT 
                column_name, 
                data_type, 
                character_maximum_length,
                is_nullable,
                column_default
            FROM 
                information_schema.columns
            WHERE 
                table_schema = 'public' 
                AND table_name = $1
            ORDER BY 
                ordinal_position;
        `, [tableName]);
        
        console.log(`\n=== STRUCTURE DE LA TABLE: ${tableName.toUpperCase()} ===`);
        console.log('| Colonne | Type | Longueur | Nullable | Valeur par défaut |');
        console.log('|---------|------|----------|----------|-------------------|');
        
        result.rows.forEach(row => {
            const nullable = row.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
            const defaultValue = row.column_default || '-';
            const length = row.character_maximum_length ? `(${row.character_maximum_length})` : '';
            const dataType = `${row.data_type}${length}`;
            
            console.log(`| ${row.column_name.padEnd(10)} | ${dataType.padEnd(15)} | ${(row.character_maximum_length || '-').toString().padEnd(8)} | ${nullable.padEnd(8)} | ${defaultValue.padEnd(17)} |`);
        });
        
        // Afficher le nombre total de colonnes
        console.log(`\nTotal: ${result.rows.length} colonnes`);
        
    } catch (err) {
        console.error(`❌ Erreur lors de la récupération de la structure de la table ${tableName}:`, err);
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
        console.log('\nEntrez le numéro de la table à examiner (ou "all" pour toutes les tables):');
        
        // Simuler une entrée utilisateur (dans un environnement réel, vous utiliseriez readline ou un autre mécanisme)
        const tableIndex = 0; // Par défaut, examiner la première table
        
        if (tableIndex === 'all') {
            // Afficher la structure de toutes les tables
            for (const table of tables) {
                await viewTableStructure(table);
            }
        } else if (tableIndex >= 0 && tableIndex < tables.length) {
            // Afficher la structure de la table sélectionnée
            await viewTableStructure(tables[tableIndex]);
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