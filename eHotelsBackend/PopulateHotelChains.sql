-- Oh crap, I forgot to add the name column in table hotel chain
ALTER TABLE hotel_chain
ADD COLUMN hotel_chain_name VARCHAR (100) NOT NULL;

-- populate the address before the hotel chains
INSERT INTO address (Civic_number, Postal_code, Street_name, Town, Province, Country)
VALUES 
(101, 'K1A 0B1', 'Wellington St', 'Ottawa', 'Ontario', 'Canada'),
(202, 'M5V 2T6', 'King St W', 'Toronto', 'Ontario', 'Canada'),
(303, 'H3B 1X8', 'Sainte-Catherine St', 'Montreal', 'Quebec', 'Canada'),
(404, 'V6E 1M2', 'Robson St', 'Vancouver', 'British Columbia', 'Canada'),
(505, 'T2P 1G7', '9 Ave SW', 'Calgary', 'Alberta', 'Canada');

-- --populate the 5 hotel chains 
INSERT INTO hotel_chain (Address_Id, number_of_hotels, email_address, phone_number,hotel_chain_name)
VALUES 
(1, 8, 'contact@luxuryhotels.com', '613-555-1234', 'Luxury hotel'),
(2, 10, 'info@perfectstays.com', '416-555-5678', 'Perfect stay'),
(3, 9, 'reservations@resortworld.com', '514-555-7890', 'Resort world'),
(4, 8, 'support@businessinns.com', '450-555-1010', 'The Inns'),
(5, 12, 'info@cozyretreats.com', '905-555-2020', 'Cozy retreat');

-- --populate the hotels 
INSERT INTO hotel (HotelChain_Id, Address_Id, manager_Id, rating, number_of_rooms, phone_number, email_address)
VALUES
-- Luxury Hotels Chain (HotelChain_Id = 6)
(6, 1, 101, 5, 120, '613-555-0001', 'hotel1@luxuryhotels.com'),
(6, 2, 102, 5, 100, '613-555-0002', 'hotel2@luxuryhotels.com'),
(6, 3, 103, 4, 80, '613-555-0003', 'hotel3@luxuryhotels.com'),
(6, 4, 104, 5, 150, '613-555-0004', 'hotel4@luxuryhotels.com'),
(6, 5, 105, 4, 110, '613-555-0005', 'hotel5@luxuryhotels.com'),
(6, 6, 106, 3, 90, '613-555-0006', 'hotel6@luxuryhotels.com'),
(6, 7, 107, 5, 200, '613-555-0007', 'hotel7@luxuryhotels.com'),
(6, 8, 108, 4, 95, '613-555-0008', 'hotel8@luxuryhotels.com'),
(6, 9, 109, 3, 75, '613-555-0009', 'hotel9@luxuryhotels.com'),

-- Budget Stays Chain (HotelChain_Id = 7)
(7, 10, 110, 3, 60, '416-555-0010', 'hotel1@budgetstays.com'),
(7, 11, 111, 3, 70, '416-555-0011', 'hotel2@budgetstays.com'),
(7, 12, 112, 4, 90, '416-555-0012', 'hotel3@budgetstays.com'),
(7, 13, 113, 3, 50, '416-555-0013', 'hotel4@budgetstays.com'),
(7, 14, 114, 4, 85, '416-555-0014', 'hotel5@budgetstays.com'),
(7, 15, 115, 5, 120, '416-555-0015', 'hotel6@budgetstays.com'),
(7, 16, 116, 3, 65, '416-555-0016', 'hotel7@budgetstays.com'),
(7, 17, 117, 4, 80, '416-555-0017', 'hotel8@budgetstays.com'),
(7, 18, 118, 3, 55, '416-555-0018', 'hotel9@budgetstays.com'),

-- Resort World Chain (HotelChain_Id = 8)
(8, 19, 119, 5, 300, '514-555-0019', 'hotel1@resortworld.com'),
(8, 20, 120, 5, 250, '514-555-0020', 'hotel2@resortworld.com'),
(8, 21, 121, 4, 200, '514-555-0021', 'hotel3@resortworld.com'),
(8, 22, 122, 4, 180, '514-555-0022', 'hotel4@resortworld.com'),
(8, 23, 123, 3, 150, '514-555-0023', 'hotel5@resortworld.com'),
(8, 24, 124, 4, 170, '514-555-0024', 'hotel6@resortworld.com'),
(8, 25, 125, 5, 200, '514-555-0025', 'hotel7@resortworld.com'),
(8, 26, 126, 4, 140, '514-555-0026', 'hotel8@resortworld.com'),
(8, 27, 127, 3, 130, '514-555-0027', 'hotel9@resortworld.com'),

-- Business Inns Chain (HotelChain_Id = 9)
(9, 28, 128, 4, 110, '450-555-0028', 'hotel1@businessinns.com'),
(9, 29, 129, 4, 100, '450-555-0029', 'hotel2@businessinns.com'),
(9, 30, 130, 3, 90, '450-555-0030', 'hotel3@businessinns.com'),
(9, 31, 131, 5, 150, '450-555-0031', 'hotel4@businessinns.com'),
(9, 32, 132, 4, 95, '450-555-0032', 'hotel5@businessinns.com'),
(9, 33, 133, 3, 85, '450-555-0033', 'hotel6@businessinns.com'),
(9, 34, 134, 5, 120, '450-555-0034', 'hotel7@businessinns.com'),
(9, 35, 135, 4, 100, '450-555-0035', 'hotel8@businessinns.com'),
(9, 36, 136, 3, 80, '450-555-0036', 'hotel9@businessinns.com'),

-- Cozy Retreats Chain (HotelChain_Id = 10)
(10, 37, 137, 5, 80, '905-555-0037', 'hotel1@cozyretreats.com'),
(10, 38, 138, 4, 70, '905-555-0038', 'hotel2@cozyretreats.com'),
(10, 39, 139, 5, 90, '905-555-0039', 'hotel3@cozyretreats.com'),
(10, 40, 140, 3, 60, '905-555-0040', 'hotel4@cozyretreats.com'),
(10, 41, 141, 4, 75, '905-555-0041', 'hotel5@cozyretreats.com'),
(10, 42, 142, 5, 85, '905-555-0042', 'hotel6@cozyretreats.com'),
(10, 43, 143, 3, 65, '905-555-0043', 'hotel7@cozyretreats.com'),
(10, 44, 144, 4, 78, '905-555-0044', 'hotel8@cozyretreats.com'),
(10, 45, 145, 3, 50, '905-555-0045', 'hotel9@cozyretreats.com');

-- just checking SELECT * FROM address;
 SELECT * FROM hotel_chain;

