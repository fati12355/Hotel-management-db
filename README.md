# 🏨 e-Hôtels – Projet de gestion d’un système de réservation d’hôtels
Ce projet est une application web développée dans le cadre du cours **CSI2532 – Bases de Données I – Hiver 2025**, visant à concevoir et implémenter 
un système de gestion pour un consortium de chaînes hôtelières en Amérique du Nord. L’application permet la
**recherche, la réservation, la location et la gestion de chambres** selon des critères variés.
## 🎯 Objectifs du projet
- Concevoir un **modèle E-R** pour représenter les entités et relations entre chaînes, hôtels, chambres, employés et clients.
- Implémenter une **base de données relationnelle** complète avec toutes les contraintes nécessaires.
- Développer une **interface utilisateur web intuitive**, permettant aux clients de réserver ou louer des chambres, et aux employés de gérer les opérations hôtelières.
- Intégrer des **requêtes SQL**, des **vues**, des **triggers** et des **index** pour optimiser la base de données.
## 🔧 Technologies utilisées
- **Base de données** : PostgreSQL via [Supabase](https://supabase.io)
- **Back-end** :Node.js avec Express.js 
- **Front-end** : HTML, CSS, Bootstrap, JavaScript, AJAX/jQuery
- **Outils** : GitHub , Visual Studio, Supabase Studio
## 2. 🛠️ Instructions d’installation

### 🔍 Prérequis

- [Node.js](https://nodejs.org) installé
- [pgAdmin 4](https://www.pgadmin.org/) (souvent installé avec PostgreSQL)
- Navigateur moderne (Chrome, Firefox…)

### 🧩 a. Connexion à la base de données via pgAdmin

1. Ouvrir pgAdmin 4
2. Clic droit sur **Servers** → **Register** → **Server**
3. Onglet **General** : nommer (ex. `eHotelsSupabase`)
4. Onglet **Connection** :
   - **Host name/address** : `aws-0-ca-central-1.pooler.supabase.com` *(ou `localhost` si en local)*
   - **Port** : `5432`
   - **Username** : `postgres.mhpjodxfdqkjmjbbotvm`
   - **Password** : `Hotel4$$$gamelle`
5. Cliquer sur **Save**
### 📁 b. Cloner le projet
```bash
git clone https://github.com/fati12355/Hotel-management-db
cd Hotel-management-db
📦c. Installer le backend des dépendances
cd eHotelsBackend
npm install

PGUSER=postgres.mhpjodxfdqkjmjbbotvm
PGPASSWORD=Hotel4$$$gamelle
PGHOST=aws-0-ca-central-1.pooler.supabase.com
PGPORT=5432
PGDATABASE=postgres

npm start
