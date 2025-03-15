INSERT INTO address (Civic_number, Postal_code, Street_name, Town, Province, Country)
VALUES
-- 🌍 North America
(1001, 'K1A 1B1', 'Wellington St', 'Ottawa', 'Ontario', 'Canada'),
(1002, 'M5V 2T6', 'King St W', 'Toronto', 'Ontario', 'Canada'),
(1003, 'H3B 1X8', 'Rue Sainte-Catherine', 'Montreal', 'Quebec', 'Canada'),
(1004, 'V6E 1M2', 'Robson St', 'Vancouver', 'British Columbia', 'Canada'),
(1005, 'T2P 1G7', '9 Ave SW', 'Calgary', 'Alberta', 'Canada'),
(1006, '10001', '5th Avenue', 'New York', 'New York', 'USA'),
(1007, '90015', 'Sunset Blvd', 'Los Angeles', 'California', 'USA'),
(1008, '60601', 'Michigan Ave', 'Chicago', 'Illinois', 'USA'),
(1009, '77002', 'Main St', 'Houston', 'Texas', 'USA'),
(1010, '33101', 'Ocean Drive', 'Miami', 'Florida', 'USA'),

-- 🌍 South America
(1011, '01000-000', 'Avenida Paulista', 'São Paulo', 'São Paulo', 'Brazil'),
(1012, '20031-050', 'Copacabana Beach', 'Rio de Janeiro', 'Rio de Janeiro', 'Brazil'),
(1013, 'C1001', 'Avenida 9 de Julio', 'Buenos Aires', 'Buenos Aires', 'Argentina'),
(1014, '8320000', 'Avenida Providencia', 'Santiago', 'Santiago', 'Chile'),
(1015, '110221', 'Carrera 7', 'Bogotá', 'Bogotá', 'Colombia'),

-- 🌍 Europe
(1016, '75001', 'Champs-Élysées', 'Paris', 'Île-de-France', 'France'),
(1017, '10117', 'Unter den Linden', 'Berlin', 'Berlin', 'Germany'),
(1018, 'E1 6AN', 'Oxford Street', 'London', 'England', 'UK'),
(1019, '20121', 'Via Montenapoleone', 'Milan', 'Lombardy', 'Italy'),
(1020, '28013', 'Gran Vía', 'Madrid', 'Madrid', 'Spain'),
(1021, '1070', 'Mariahilfer Straße', 'Vienna', 'Vienna', 'Austria'),
(1022, '1010', 'Kärntner Straße', 'Vienna', 'Vienna', 'Austria'),
(1023, '1050', 'Váci Street', 'Budapest', 'Budapest', 'Hungary'),
(1024, '04000', 'Nevsky Prospect', 'Saint Petersburg', 'Leningrad', 'Russia'),
(1025, '110 00', 'Wenceslas Square', 'Prague', 'Bohemia', 'Czech Republic'),

-- 🌍 Asia
(1026, '100-0005', 'Ginza', 'Tokyo', 'Tokyo', 'Japan'),
(1027, '600-8216', 'Shijo-dori', 'Kyoto', 'Kyoto', 'Japan'),
(1028, '110001', 'Connaught Place', 'New Delhi', 'Delhi', 'India'),
(1029, '560001', 'MG Road', 'Bangalore', 'Karnataka', 'India'),
(1030, '200000', 'Nanjing Road', 'Shanghai', 'Shanghai', 'China'),
(1031, '100600', 'Wangfujing', 'Beijing', 'Beijing', 'China'),
(1032, '110001', 'Orchard Road', 'Singapore', 'Central', 'Singapore'),
(1033, '150-0001', 'Myeongdong', 'Seoul', 'Seoul', 'South Korea'),
(1034, '6000', 'Ayala Avenue', 'Makati', 'Metro Manila', 'Philippines'),
(1035, '10200', 'Sukhumvit Road', 'Bangkok', 'Bangkok', 'Thailand'),

-- 🌍 Africa
(1036, '8001', 'Long Street', 'Cape Town', 'Western Cape', 'South Africa'),
(1037, '00100', 'Kenyatta Avenue', 'Nairobi', 'Nairobi', 'Kenya'),
(1038, '2000', 'Independence Avenue', 'Windhoek', 'Khomas', 'Namibia'),
(1039, '0001', 'Avenue Cheikh Anta Diop', 'Dakar', 'Dakar', 'Senegal'),
(1040, '4001', 'Victoria Island', 'Lagos', 'Lagos', 'Nigeria'),

-- 🌍 Oceania
(1041, '2000', 'George Street', 'Sydney', 'New South Wales', 'Australia'),
(1042, '3000', 'Flinders Street', 'Melbourne', 'Victoria', 'Australia'),
(1043, '1010', 'Queen Street', 'Auckland', 'Auckland', 'New Zealand'),
(1044, '6011', 'Lambton Quay', 'Wellington', 'Wellington', 'New Zealand'),

-- 🌍 Middle East
(1045, '12345', 'King Fahd Road', 'Riyadh', 'Riyadh', 'Saudi Arabia'),
(1046, '00000', 'Sheikh Zayed Road', 'Dubai', 'Dubai', 'UAE'),
(1047, '00000', 'Corniche Road', 'Abu Dhabi', 'Abu Dhabi', 'UAE'),
(1048, '110001', 'Tahrir Square', 'Cairo', 'Cairo', 'Egypt'),
(1049, '7500', 'Avenue Habib Bourguiba', 'Tunis', 'Tunis', 'Tunisia'),
(1050, '1234', 'Hamra Street', 'Beirut', 'Beirut', 'Lebanon'),
(1051, 'BJ-2299', 'Boulevard Saint Michel', 'Cotonou', 'Littoral', 'Benin'),        
(1052, 'CM-4781', 'Avenue Kennedy', 'Yaoundé', 'Centre', 'Cameroon'),              
(1053, 'MG-101', 'Rue Ravoninahitriniarivo', 'Antananarivo', 'Analamanga', 'Madagascar'),
(1054, 'MA-20000', 'Boulevard Mohammed V', 'Casablanca', 'Casablanca-Settat', 'Morocco');

INSERT INTO hotel (HotelChain_Id, Address_Id, manager_Id, rating, number_of_rooms, phone_number, email_address)
VALUES
-- 🏨 First Hotel of Each Chain (Starting Address_Id: 13, 14, 15, 16, 17)
(6, 13, 101, 5, 120, '613-555-0001', 'hotel1@luxuryhotels.com'),
(7, 14, 110, 3, 60, '416-555-0010', 'hotel1@budgetstays.com'),
(8, 15, 119, 5, 300, '514-555-0019', 'hotel1@resortworld.com'),
(9, 16, 128, 4, 110, '450-555-0028', 'hotel1@businessinns.com'),
(10, 17, 137, 5, 80, '905-555-0037', 'hotel1@cozyretreats.com'),

-- 🏨 Second Hotels of Each Chain (Previous Address_Id + 5)
(6, 18, 102, 5, 100, '613-555-0002', 'hotel2@luxuryhotels.com'),
(7, 19, 111, 3, 70, '416-555-0011', 'hotel2@budgetstays.com'),
(8, 20, 120, 5, 250, '514-555-0020', 'hotel2@resortworld.com'),
(9, 21, 129, 4, 100, '450-555-0029', 'hotel2@businessinns.com'),
(10, 22, 138, 4, 70, '905-555-0038', 'hotel2@cozyretreats.com'),

-- 🏨 Third Hotels of Each Chain (Previous Address_Id + 5)
(6, 23, 103, 4, 80, '613-555-0003', 'hotel3@luxuryhotels.com'),
(7, 24, 112, 4, 90, '416-555-0012', 'hotel3@budgetstays.com'),
(8, 25, 121, 4, 200, '514-555-0021', 'hotel3@resortworld.com'),
(9, 26, 130, 3, 90, '450-555-0030', 'hotel3@businessinns.com'),
(10, 27, 139, 5, 90, '905-555-0039', 'hotel3@cozyretreats.com'),

-- 🏨 Fourth Hotels of Each Chain (Previous Address_Id + 5)
(6, 28, 104, 5, 150, '613-555-0004', 'hotel4@luxuryhotels.com'),
(7, 29, 113, 3, 50, '416-555-0013', 'hotel4@budgetstays.com'),
(8, 30, 122, 4, 180, '514-555-0022', 'hotel4@resortworld.com'),
(9, 31, 131, 5, 150, '450-555-0031', 'hotel4@businessinns.com'),
(10, 32, 140, 3, 60, '905-555-0040', 'hotel4@cozyretreats.com'),

-- 🏨 Fifth Hotels of Each Chain (Previous Address_Id + 5)
(6, 33, 105, 4, 110, '613-555-0005', 'hotel5@luxuryhotels.com'),
(7, 34, 114, 4, 85, '416-555-0014', 'hotel5@budgetstays.com'),
(8, 35, 123, 3, 150, '514-555-0023', 'hotel5@resortworld.com'),
(9, 36, 132, 4, 95, '450-555-0032', 'hotel5@businessinns.com'),
(10, 37, 141, 4, 75, '905-555-0041', 'hotel5@cozyretreats.com'),

-- 🏨 Sixth Hotels of Each Chain (Previous Address_Id + 5)
(6, 38, 106, 3, 90, '613-555-0006', 'hotel6@luxuryhotels.com'),
(7, 39, 115, 5, 120, '416-555-0015', 'hotel6@budgetstays.com'),
(8, 40, 124, 4, 170, '514-555-0024', 'hotel6@resortworld.com'),
(9, 41, 133, 3, 85, '450-555-0033', 'hotel6@businessinns.com'),
(10, 42, 142, 5, 85, '905-555-0042', 'hotel6@cozyretreats.com'),

-- 🏨 Seventh Hotels of Each Chain (Previous Address_Id + 5)
(6, 43, 107, 5, 200, '613-555-0007', 'hotel7@luxuryhotels.com'),
(7, 44, 116, 3, 65, '416-555-0016', 'hotel7@budgetstays.com'),
(8, 45, 125, 5, 200, '514-555-0025', 'hotel7@resortworld.com'),
(9, 46, 134, 5, 120, '450-555-0034', 'hotel7@businessinns.com'),
(10, 47, 143, 3, 65, '905-555-0043', 'hotel7@cozyretreats.com'),

-- 🏨 Eighth Hotels of Each Chain (Previous Address_Id + 5)
(6, 48, 108, 4, 95, '613-555-0008', 'hotel8@luxuryhotels.com'),
(7, 49, 117, 4, 80, '416-555-0017', 'hotel8@budgetstays.com'),
(8, 50, 126, 4, 140, '514-555-0026', 'hotel8@resortworld.com'),
(9, 51, 135, 4, 100, '450-555-0035', 'hotel8@businessinns.com'),
(10, 52, 144, 4, 78, '905-555-0044', 'hotel8@cozyretreats.com'),

-- 🏨 Ninth Hotels of Each Chain (Previous Address_Id + 5)
(6, 53, 109, 3, 75, '613-555-0009', 'hotel9@luxuryhotels.com'),
(7, 54, 118, 3, 55, '416-555-0018', 'hotel9@budgetstays.com'),
(8, 55, 127, 3, 130, '514-555-0027', 'hotel9@resortworld.com'),
(9, 56, 136, 3, 80, '450-555-0036', 'hotel9@businessinns.com'),
(10, 57, 145, 3, 50, '905-555-0045', 'hotel9@cozyretreats.com');

-- UPDATE hotel SET Address_Id = 58 WHERE Address_Id = 53;  
SELECT * FROM hotel;