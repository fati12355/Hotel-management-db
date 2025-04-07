-- Étape 1 : Créer une adresse de test
INSERT INTO address (address_id, civic_number, postal_code, street_name, town, province, country)
VALUES (000, 123, 'A1B2C3', 'Rue Test', 'Ville Test', 'QC', 'Canada');

-- Étape 2 : Créer une chaîne d'hôtel avec hotelchain_id = 999
INSERT INTO hotel_chain (hotelchain_id, address_id, number_of_hotels, email_address, phone_number, hotel_chain_name)
VALUES (999, 000, 1, 'test@chain.com', '123-456-7890', 'Test Chain');

-- Étape 3 : Créer un hôtel test avec hotel_id = 999
INSERT INTO hotel (hotel_id, hotelchain_id, address_id, rating, number_of_rooms, phone_number, email_address, manager_id)
VALUES (999, 999, 000, 3, 20, '999-999-9999', 'testhotel@example.com', NULL);

-- Étape 4 : Créer deux chambres associées à l'hôtel 999
INSERT INTO room (room_id, hotel_id, price, appliances, capacity, extras, existing_damage, status)
VALUES 
(9991, 999, 100, 'TV, Wifi', 2, 'Vue mer', 'aucun', 'Available'),
(9992, 999, 150, 'TV, Wifi, Clim', 4, 'Suite', 'aucun', 'Available');

-- Étape 5 (Facultatif) : Créer un client fictif
INSERT INTO client (client_id, address_id, full_name, nas)
VALUES (888, 000, 'Client Test', '0000000');
-- Créer une réservation qui empêchera la suppression de l’hôtel
INSERT INTO reservation (reservation_id, client_id, room_id, reservation_date, reservation_status)
VALUES (999, 888, 9991, NOW(), 'Pending');
DELETE FROM reservation WHERE reservation_id = 999;
SELECT* FROM room WHERE hotel_id = 999;
SELECT*from hotel WHERE hotel_id = 999;


SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'hotel';

