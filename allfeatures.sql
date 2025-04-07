--  INSÉRER UNE NOUVELLE ADRESSE
INSERT INTO address (civic_number, postal_code, street_name, town, province, country)
VALUES (123, 'K1A0B1', 'Main Street', 'Ottawa', 'Ontario', 'Canada');

--  VÉRIFIER SI UN CLIENT EXISTE PAR NAS
SELECT client_id FROM client WHERE nas = '12345678';

--  INSÉRER UN NOUVEAU CLIENT
INSERT INTO client (full_name, nas, address_id)
VALUES ('John Doe', '12345678', 1);

--  INSÉRER UNE NOUVELLE RÉSERVATION
INSERT INTO reservation (client_id, room_id, reservation_date, reservation_status)
VALUES (1, 2, CURRENT_TIMESTAMP, 'Confirmed');

--  METTRE À JOUR LE STATUT D'UNE CHAMBRE APRÈS RÉSERVATION
UPDATE room SET status = 'Occupied' WHERE room_id = 2;

--  FILTRER LES CHAMBRES DISPONIBLES SELON LES CRITÈRES DU CLIENT
SELECT * FROM room 
WHERE status = 'Available'
  AND capacity >= 3
  AND price BETWEEN 150 AND 300
  AND extras ILIKE '%balcony%';

--  RÉCUPÉRER LES HÔTELS D'UNE CHAÎNE SPÉCIFIQUE
SELECT * FROM hotel WHERE hotelchain_id = 1;

--  RÉCUPÉRER LES CHAMBRES D'UN HÔTEL DONNÉ
SELECT * FROM room WHERE hotel_id = 1;

--  RÉCUPÉRER UNE RÉSERVATION À PARTIR DE SON ID
SELECT * FROM reservation WHERE reservation_id = 10;

--  FAIRE UNE LOCATION AVEC RÉSERVATION
INSERT INTO rent (employee_id, reservation_id, room_id, rent_date)
VALUES (1, 10, 2, CURRENT_TIMESTAMP);

--  FAIRE UNE LOCATION SANS RÉSERVATION
INSERT INTO rent (employee_id, reservation_id, room_id, rent_date)
VALUES (1, NULL, 3, CURRENT_TIMESTAMP);

--  CHERCHER UNE CHAMBRE DISPONIBLE SANS RÉSERVATION
SELECT * FROM room 
WHERE status = 'Available' AND capacity >= 2 AND price <= 180;

--  ENREGISTRER UN EMPLOYÉ
INSERT INTO employee (hotel_id, address_id, full_name, nas, position)
VALUES (1, 1, 'Alice Smith', '99887766', 'Receptionist');

--  AUTHENTIFIER UN EMPLOYÉ PAR SON NAS
SELECT * FROM employee WHERE nas = '99887766';

--  SUPPRIMER UN CLIENT PAR ID
DELETE FROM client WHERE client_id = 5;

--  DÉSINSCRIRE UNE CHAMBRE
--l’employé voie toutes les réservations prévues aujourd’hui
UPDATE room SET status = 'Under Maintenance' WHERE room_id = 4;
SELECT r.reservation_id, c.full_name, r.room_id, r.reservation_date
FROM reservation r
JOIN client c ON r.client_id = c.client_id
WHERE DATE(r.reservation_date) = CURRENT_DATE;
-- Supprimer une réservation annulée
DELETE FROM reservation
WHERE reservation_id = 15;
 -- Voir toutes les chambres occupées d’un hôtel
 SELECT room_id, price, capacity
FROM room
WHERE hotel_id = 3 AND status = 'Occupied';
--Rechercher les locations en cours par client
SELECT rent_id, client_id, room_id, rent_date
FROM rent
WHERE reservation_id IS NOT NULL
ORDER BY rent_date DESC;

-- Passer une chambre à "Under Maintenance"
UPDATE room
SET status = 'Under Maintenance'
WHERE room_id = 8;
--Consulter l’historique des locations d’un client
SELECT rent_id, room_id, rent_date
FROM rent
WHERE reservation_id IN (
    SELECT reservation_id FROM reservation WHERE client_id = 4
);
--Vérifier le login d’un employé (email + mot de passe)
-- Vérifie si un compte employé existe avec cet email et ce mot de passe
SELECT * 
FROM employee_account
WHERE email = 'abc@gmail.com' AND password = 'abc123';



