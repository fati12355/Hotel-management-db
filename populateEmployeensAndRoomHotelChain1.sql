-- populating the address table with more instances that will later be used as the employees address
-- around 10 employees per hotel (45 hotels in total, 9 per hotel chains, 5 hotel chains in total)

ALTER TABLE hotel
DROP COLUMN manager_id;--just fixing

ALTER TABLE hotel
ADD COLUMN manager_id INTEGER REFERENCES employee(employee_id); --manager_id should reference foreign key employee_id


INSERT INTO address (Address_Id, Civic_number, Postal_code, Street_name, Town, Province, Country) VALUES
(60, 6057, '60600', 'Michigan Ave', 'Chicago', 'Illinois', 'USA'),
(61, 7832, '60601', 'Michigan Ave', 'Chicago', 'Illinois', 'USA'),
(62, 1974, '60602', 'Michigan Ave', 'Chicago', 'Illinois', 'USA'),
(63, 2656, '60603', 'Michigan Ave', 'Chicago', 'Illinois', 'USA'),
(64, 4030, '60604', 'Michigan Ave', 'Chicago', 'Illinois', 'USA'),
(65, 7370, '60605', 'Michigan Ave', 'Chicago', 'Illinois', 'USA'),
(66, 5629, '60606', 'Michigan Ave', 'Chicago', 'Illinois', 'USA');

INSERT INTO employee (Employee_Id, Hotel_Id, Address_Id, Full_Name, NAS, Position) VALUES
(1000, 182, 60, 'Employee_1000', 'NAS21000', 'Hotel Manager'),
(1001, 182, 61, 'Employee_1001', 'NAS21001', 'Receptionist'),
(1002, 182, 62, 'Employee_1002', 'NAS21002', 'Head Chef'),
(1003, 182, 63, 'Employee_1003', 'NAS21003', 'Housekeeping Supervisor'),
(1004, 182, 64, 'Employee_1004', 'NAS21004', 'Concierge'),
(1005, 182, 65, 'Employee_1005', 'NAS21005', 'Security Guard'),
(1006, 182, 66, 'Employee_1006', 'NAS21006', 'Bartender');

INSERT INTO room (Room_Id, Hotel_Id, Price, Appliances, Capacity, Extras, Existing_Damage, Status) VALUES
(300, 182, 286, 'TV, Fridge', 3, 'Ocean View', 'No damage', 'Occupied'),
(301, 182, 438, 'None', 3, 'Balcony', 'No damage', 'Available'),
(302, 182, 430, 'Mini Fridge, Heater', 1, 'Hot Tub', 'No damage', 'Available'),
(303, 182, 408, 'None', 3, 'Balcony', 'No damage', 'Occupied'),
(304, 182, 458, 'AC, TV', 2, 'Hot Tub', 'No damage', 'Available'),
(305, 182, 488, 'Mini Fridge, Heater', 2, 'Ocean View', 'No damage', 'Under Maintenance'),
(306, 182, 368, 'AC, TV', 1, 'Mountain View', 'No damage', 'Available'),
(307, 182, 279, 'TV, Fridge', 2, 'Hot Tub', 'No damage', 'Occupied'),
(308, 182, 374, 'AC, TV', 1, 'Balcony', 'No damage', 'Available'),
(309, 182, 331, 'None', 4, 'Hot Tub', 'No damage', 'Available');

INSERT INTO address (Address_Id, Civic_number, Postal_code, Street_name, Town, Province, Country) VALUES
(67, 5439, 'C1000', 'Avenida 9 de Julio', 'Buenos Aires', 'Buenos Aires', 'Argentina'),
(68, 9372, 'C1001', 'Avenida 9 de Julio', 'Buenos Aires', 'Buenos Aires', 'Argentina'),
(69, 5447, 'C1002', 'Avenida 9 de Julio', 'Buenos Aires', 'Buenos Aires', 'Argentina'),
(70, 1778, 'C1003', 'Avenida 9 de Julio', 'Buenos Aires', 'Buenos Aires', 'Argentina'),
(71, 1049, 'C1004', 'Avenida 9 de Julio', 'Buenos Aires', 'Buenos Aires', 'Argentina'),
(72, 6149, 'C1005', 'Avenida 9 de Julio', 'Buenos Aires', 'Buenos Aires', 'Argentina'),
(73, 8716, 'C1006', 'Avenida 9 de Julio', 'Buenos Aires', 'Buenos Aires', 'Argentina');

INSERT INTO employee (Employee_Id, Hotel_Id, Address_Id, Full_Name, NAS, Position) VALUES
(1007, 187, 67, 'Employee_1007', 'NAS21007', 'Hotel Manager'),
(1008, 187, 68, 'Employee_1008', 'NAS21008', 'Receptionist'),
(1009, 187, 69, 'Employee_1009', 'NAS21009', 'Head Chef'),
(1010, 187, 70, 'Employee_1010', 'NAS21010', 'Housekeeping Supervisor'),
(1011, 187, 71, 'Employee_1011', 'NAS21011', 'Concierge'),
(1012, 187, 72, 'Employee_1012', 'NAS21012', 'Security Guard'),
(1013, 187, 73, 'Employee_1013', 'NAS21013', 'Bartender');

INSERT INTO room (Room_Id, Hotel_Id, Price, Appliances, Capacity, Extras, Existing_Damage, Status) VALUES
(310, 187, 243, 'Mini Fridge, Heater', 4, 'Balcony', 'No damage', 'Available'),
(311, 187, 233, 'TV, Fridge', 4, 'Balcony', 'No damage', 'Under Maintenance'),
(312, 187, 481, 'None', 2, 'Hot Tub', 'No damage', 'Available'),
(313, 187, 338, 'Mini Fridge, Heater', 2, 'Balcony', 'No damage', 'Under Maintenance'),
(314, 187, 259, 'TV, Fridge', 1, 'Mountain View', 'No damage', 'Under Maintenance'),
(315, 187, 222, 'None', 2, 'Ocean View', 'No damage', 'Under Maintenance'),
(316, 187, 182, 'Mini Fridge, Heater', 2, 'Mountain View', 'No damage', 'Occupied'),
(317, 187, 490, 'Mini Fridge, Heater', 2, 'Balcony', 'No damage', 'Under Maintenance'),
(318, 187, 359, 'Mini Fridge, Heater', 3, 'Ocean View', 'No damage', 'Occupied'),
(319, 187, 117, 'None', 2, 'Balcony', 'No damage', 'Occupied');

INSERT INTO address (Address_Id, Civic_number, Postal_code, Street_name, Town, Province, Country) VALUES
(74, 8205, 'E1 6AN', 'Oxford Street', 'London', 'England', 'UK'),
(75, 2807, 'E1 6AN', 'Oxford Street', 'London', 'England', 'UK'),
(76, 5612, 'E1 6AN', 'Oxford Street', 'London', 'England', 'UK'),
(77, 9055, 'E1 6AN', 'Oxford Street', 'London', 'England', 'UK'),
(78, 4055, 'E1 6AN', 'Oxford Street', 'London', 'England', 'UK'),
(79, 4094, 'E1 6AN', 'Oxford Street', 'London', 'England', 'UK'),
(80, 4210, 'E1 6AN', 'Oxford Street', 'London', 'England', 'UK');

INSERT INTO employee (Employee_Id, Hotel_Id, Address_Id, Full_Name, NAS, Position) VALUES
(1014, 192, 74, 'Employee_1014', 'NAS21014', 'Hotel Manager'),
(1015, 192, 75, 'Employee_1015', 'NAS21015', 'Receptionist'),
(1016, 192, 76, 'Employee_1016', 'NAS21016', 'Head Chef'),
(1017, 192, 77, 'Employee_1017', 'NAS21017', 'Housekeeping Supervisor'),
(1018, 192, 78, 'Employee_1018', 'NAS21018', 'Concierge'),
(1019, 192, 79, 'Employee_1019', 'NAS21019', 'Security Guard'),
(1020, 192, 80, 'Employee_1020', 'NAS21020', 'Bartender');

INSERT INTO room (Room_Id, Hotel_Id, Price, Appliances, Capacity, Extras, Existing_Damage, Status) VALUES
(320, 192, 289, 'None', 2, 'Mountain View', 'No damage', 'Occupied'),
(321, 192, 366, 'Mini Fridge, Heater', 2, 'Hot Tub', 'No damage', 'Under Maintenance'),
(322, 192, 299, 'None', 2, 'Hot Tub', 'No damage', 'Available'),
(323, 192, 419, 'Mini Fridge, Heater', 1, 'Mountain View', 'No damage', 'Available'),
(324, 192, 347, 'AC, TV', 3, 'Hot Tub', 'No damage', 'Occupied'),
(325, 192, 413, 'AC, TV', 1, 'Mountain View', 'No damage', 'Available'),
(326, 192, 386, 'Mini Fridge, Heater', 3, 'Balcony', 'No damage', 'Available'),
(327, 192, 363, 'Mini Fridge, Heater', 1, 'Hot Tub', 'No damage', 'Occupied'),
(328, 192, 418, 'AC, TV', 3, 'Mountain View', 'No damage', 'Under Maintenance'),
(329, 192, 206, 'Mini Fridge, Heater', 4, 'Balcony', 'No damage', 'Occupied');

INSERT INTO address (Address_Id, Civic_number, Postal_code, Street_name, Town, Province, Country) VALUES
(81, 1829, '1050', 'Váci Street', 'Budapest', 'Budapest', 'Hungary'),
(82, 4337, '1050', 'Váci Street', 'Budapest', 'Budapest', 'Hungary'),
(83, 7136, '1050', 'Váci Street', 'Budapest', 'Budapest', 'Hungary'),
(84, 3617, '1050', 'Váci Street', 'Budapest', 'Budapest', 'Hungary'),
(85, 1356, '1050', 'Váci Street', 'Budapest', 'Budapest', 'Hungary'),
(86, 9398, '1050', 'Váci Street', 'Budapest', 'Budapest', 'Hungary'),
(87, 4242, '1050', 'Váci Street', 'Budapest', 'Budapest', 'Hungary');

INSERT INTO employee (Employee_Id, Hotel_Id, Address_Id, Full_Name, NAS, Position) VALUES
(1021, 197, 81, 'Employee_1021', 'NAS21021', 'Hotel Manager'),
(1022, 197, 82, 'Employee_1022', 'NAS21022', 'Receptionist'),
(1023, 197, 83, 'Employee_1023', 'NAS21023', 'Head Chef'),
(1024, 197, 84, 'Employee_1024', 'NAS21024', 'Housekeeping Supervisor'),
(1025, 197, 85, 'Employee_1025', 'NAS21025', 'Concierge'),
(1026, 197, 86, 'Employee_1026', 'NAS21026', 'Security Guard'),
(1027, 197, 87, 'Employee_1027', 'NAS21027', 'Bartender');

INSERT INTO room (Room_Id, Hotel_Id, Price, Appliances, Capacity, Extras, Existing_Damage, Status) VALUES
(330, 197, 180, 'Mini Fridge, Heater', 1, 'Balcony', 'No damage', 'Occupied'),
(331, 197, 289, 'Mini Fridge, Heater', 2, 'Mountain View', 'No damage', 'Occupied'),
(332, 197, 487, 'TV, Fridge', 4, 'Ocean View', 'No damage', 'Occupied'),
(333, 197, 277, 'TV, Fridge', 4, 'Balcony', 'No damage', 'Available'),
(334, 197, 188, 'None', 4, 'Hot Tub', 'No damage', 'Available'),
(335, 197, 379, 'None', 1, 'Balcony', 'No damage', 'Available'),
(336, 197, 293, 'Mini Fridge, Heater', 1, 'Ocean View', 'No damage', 'Occupied'),
(337, 197, 427, 'AC, TV', 1, 'Mountain View', 'No damage', 'Available'),
(338, 197, 430, 'Mini Fridge, Heater', 4, 'Ocean View', 'No damage', 'Under Maintenance'),
(339, 197, 299, 'Mini Fridge, Heater', 2, 'Balcony', 'No damage', 'Under Maintenance');

INSERT INTO address (Address_Id, Civic_number, Postal_code, Street_name, Town, Province, Country) VALUES
(88, 4493, '110001', 'Connaught Place', 'New Delhi', 'Delhi', 'India'),
(89, 2358, '110001', 'Connaught Place', 'New Delhi', 'Delhi', 'India'),
(90, 6137, '110001', 'Connaught Place', 'New Delhi', 'Delhi', 'India'),
(91, 9186, '110001', 'Connaught Place', 'New Delhi', 'Delhi', 'India'),
(92, 8754, '110001', 'Connaught Place', 'New Delhi', 'Delhi', 'India'),
(93, 8230, '110001', 'Connaught Place', 'New Delhi', 'Delhi', 'India'),
(94, 9534, '110001', 'Connaught Place', 'New Delhi', 'Delhi', 'India');

INSERT INTO employee (Employee_Id, Hotel_Id, Address_Id, Full_Name, NAS, Position) VALUES
(1028, 202, 88, 'Employee_1028', 'NAS21028', 'Hotel Manager'),
(1029, 202, 89, 'Employee_1029', 'NAS21029', 'Receptionist'),
(1030, 202, 90, 'Employee_1030', 'NAS21030', 'Head Chef'),
(1031, 202, 91, 'Employee_1031', 'NAS21031', 'Housekeeping Supervisor'),
(1032, 202, 92, 'Employee_1032', 'NAS21032', 'Concierge'),
(1033, 202, 93, 'Employee_1033', 'NAS21033', 'Security Guard'),
(1034, 202, 94, 'Employee_1034', 'NAS21034', 'Bartender');

INSERT INTO room (Room_Id, Hotel_Id, Price, Appliances, Capacity, Extras, Existing_Damage, Status) VALUES
(340, 202, 187, 'None', 1, 'Hot Tub', 'No damage', 'Occupied'),
(341, 202, 487, 'TV, Fridge', 3, 'Hot Tub', 'No damage', 'Under Maintenance'),
(342, 202, 342, 'TV, Fridge', 3, 'Balcony', 'No damage', 'Available'),
(343, 202, 228, 'TV, Fridge', 1, 'Ocean View', 'No damage', 'Under Maintenance'),
(344, 202, 267, 'TV, Fridge', 4, 'Mountain View', 'No damage', 'Occupied'),
(345, 202, 123, 'TV, Fridge', 1, 'Balcony', 'No damage', 'Available'),
(346, 202, 307, 'AC, TV', 4, 'Hot Tub', 'No damage', 'Occupied'),
(347, 202, 167, 'AC, TV', 2, 'Ocean View', 'No damage', 'Occupied'),
(348, 202, 178, 'None', 3, 'Ocean View', 'No damage', 'Available'),
(349, 202, 237, 'Mini Fridge, Heater', 2, 'Hot Tub', 'No damage', 'Available');

INSERT INTO address (Address_Id, Civic_number, Postal_code, Street_name, Town, Province, Country) VALUES
(95, 9606, '150-0001', 'Myeongdong', 'Seoul', 'Seoul', 'South Korea'),
(96, 5362, '150-0001', 'Myeongdong', 'Seoul', 'Seoul', 'South Korea'),
(97, 7228, '150-0001', 'Myeongdong', 'Seoul', 'Seoul', 'South Korea'),
(98, 6279, '150-0001', 'Myeongdong', 'Seoul', 'Seoul', 'South Korea'),
(99, 5725, '150-0001', 'Myeongdong', 'Seoul', 'Seoul', 'South Korea'),
(100, 9408, '150-0001', 'Myeongdong', 'Seoul', 'Seoul', 'South Korea'),
(101, 5448, '150-0001', 'Myeongdong', 'Seoul', 'Seoul', 'South Korea');

INSERT INTO employee (Employee_Id, Hotel_Id, Address_Id, Full_Name, NAS, Position) VALUES
(1035, 207, 95, 'Employee_1035', 'NAS21035', 'Hotel Manager'),
(1036, 207, 96, 'Employee_1036', 'NAS21036', 'Receptionist'),
(1037, 207, 97, 'Employee_1037', 'NAS21037', 'Head Chef'),
(1038, 207, 98, 'Employee_1038', 'NAS21038', 'Housekeeping Supervisor'),
(1039, 207, 99, 'Employee_1039', 'NAS21039', 'Concierge'),
(1040, 207, 100, 'Employee_1040', 'NAS21040', 'Security Guard');
-- (1041, 207, 101, 'Employee_1041', 'NAS21041', 'Bartender');

INSERT INTO room (Room_Id, Hotel_Id, Price, Appliances, Capacity, Extras, Existing_Damage, Status) VALUES
(350, 207, 153, 'Mini Fridge, Heater', 2, 'Ocean View', 'No damage', 'Under Maintenance'),
(351, 207, 251, 'None', 3, 'Hot Tub', 'No damage', 'Occupied'),
(352, 207, 197, 'None', 1, 'Ocean View', 'No damage', 'Occupied'),
(353, 207, 399, 'Mini Fridge, Heater', 4, 'Balcony', 'No damage', 'Available'),
(354, 207, 334, 'AC, TV', 2, 'Mountain View', 'No damage', 'Under Maintenance'),
(355, 207, 276, 'None', 1, 'Balcony', 'No damage', 'Available'),
(356, 207, 364, 'None', 3, 'Mountain View', 'No damage', 'Under Maintenance'),
(357, 207, 213, 'Mini Fridge, Heater', 2, 'Ocean View', 'No damage', 'Available'),
(358, 207, 362, 'TV, Fridge', 4, 'Mountain View', 'No damage', 'Under Maintenance'),
(359, 207, 239, 'Mini Fridge, Heater', 4, 'Ocean View', 'No damage', 'Available');

INSERT INTO address (Address_Id, Civic_number, Postal_code, Street_name, Town, Province, Country) VALUES
(102, 9495, '1010', 'Queen Street', 'Auckland', 'Auckland', 'New Zealand'),
(103, 9362, '1010', 'Queen Street', 'Auckland', 'Auckland', 'New Zealand'),
(104, 9181, '1010', 'Queen Street', 'Auckland', 'Auckland', 'New Zealand'),
(105, 4696, '1010', 'Queen Street', 'Auckland', 'Auckland', 'New Zealand'),
(106, 1805, '1010', 'Queen Street', 'Auckland', 'Auckland', 'New Zealand'),
(107, 3208, '1010', 'Queen Street', 'Auckland', 'Auckland', 'New Zealand'),
(108, 7857, '1010', 'Queen Street', 'Auckland', 'Auckland', 'New Zealand');

INSERT INTO employee (Employee_Id, Hotel_Id, Address_Id, Full_Name, NAS, Position) VALUES
(1042, 217, 102, 'Employee_1042', 'NAS21042', 'Hotel Manager'),
(1043, 217, 103, 'Employee_1043', 'NAS21043', 'Receptionist'),
(1044, 217, 104, 'Employee_1044', 'NAS21044', 'Head Chef'),
(1045, 217, 105, 'Employee_1045', 'NAS21045', 'Housekeeping Supervisor'),
(1046, 217, 106, 'Employee_1046', 'NAS21046', 'Concierge'),
(1047, 217, 107, 'Employee_1047', 'NAS21047', 'Security Guard'),
(1048, 217, 108, 'Employee_1048', 'NAS21048', 'Bartender');

INSERT INTO room (Room_Id, Hotel_Id, Price, Appliances, Capacity, Extras, Existing_Damage, Status) VALUES
(360, 217, 352, 'Mini Fridge, Heater', 2, 'Hot Tub', 'No damage', 'Available'),
(361, 217, 373, 'Mini Fridge, Heater', 4, 'Hot Tub', 'No damage', 'Occupied'),
(362, 217, 379, 'TV, Fridge', 3, 'Balcony', 'No damage', 'Occupied'),
(363, 217, 390, 'AC, TV', 1, 'Ocean View', 'No damage', 'Available'),
(364, 217, 330, 'Mini Fridge, Heater', 1, 'Hot Tub', 'No damage', 'Occupied'),
(365, 217, 212, 'None', 1, 'Hot Tub', 'No damage', 'Occupied'),
(366, 217, 271, 'TV, Fridge', 1, 'Mountain View', 'No damage', 'Under Maintenance'),
(367, 217, 442, 'AC, TV', 1, 'Mountain View', 'No damage', 'Available'),
(368, 217, 485, 'TV, Fridge', 4, 'Balcony', 'No damage', 'Under Maintenance'),
(369, 217, 288, 'AC, TV', 1, 'Mountain View', 'No damage', 'Occupied');

INSERT INTO address (Address_Id, Civic_number, Postal_code, Street_name, Town, Province, Country) VALUES
(109, 7210, 'MG-101', 'Rue Ravoninahitriniarivo', 'Antananarivo', 'Analamanga', 'Madagascar'),
(110, 1653, 'MG-101', 'Rue Ravoninahitriniarivo', 'Antananarivo', 'Analamanga', 'Madagascar'),
(111, 9873, 'MG-101', 'Rue Ravoninahitriniarivo', 'Antananarivo', 'Analamanga', 'Madagascar'),
(112, 6457, 'MG-101', 'Rue Ravoninahitriniarivo', 'Antananarivo', 'Analamanga', 'Madagascar'),
(113, 3545, 'MG-101', 'Rue Ravoninahitriniarivo', 'Antananarivo', 'Analamanga', 'Madagascar'),
(114, 7917, 'MG-101', 'Rue Ravoninahitriniarivo', 'Antananarivo', 'Analamanga', 'Madagascar'),
(115, 8565, 'MG-101', 'Rue Ravoninahitriniarivo', 'Antananarivo', 'Analamanga', 'Madagascar');

INSERT INTO employee (Employee_Id, Hotel_Id, Address_Id, Full_Name, NAS, Position) VALUES
(1049, 222, 109, 'Employee_1049', 'NAS21049', 'Hotel Manager'),
(1050, 222, 110, 'Employee_1050', 'NAS21050', 'Receptionist'),
(1051, 222, 111, 'Employee_1051', 'NAS21051', 'Head Chef'),
(1052, 222, 112, 'Employee_1052', 'NAS21052', 'Housekeeping Supervisor'),
(1053, 222, 113, 'Employee_1053', 'NAS21053', 'Concierge'),
(1054, 222, 114, 'Employee_1054', 'NAS21054', 'Security Guard'),
(1055, 222, 115, 'Employee_1055', 'NAS21055', 'Bartender');

INSERT INTO room (Room_Id, Hotel_Id, Price, Appliances, Capacity, Extras, Existing_Damage, Status) VALUES
(370, 222, 399, 'TV, Fridge', 2, 'Balcony', 'No damage', 'Under Maintenance'),
(371, 222, 363, 'TV, Fridge', 1, 'Hot Tub', 'No damage', 'Available'),
(372, 222, 327, 'TV, Fridge', 2, 'Mountain View', 'No damage', 'Occupied'),
(373, 222, 282, 'Mini Fridge, Heater', 3, 'Ocean View', 'No damage', 'Under Maintenance'),
(374, 222, 435, 'Mini Fridge, Heater', 2, 'Balcony', 'No damage', 'Occupied'),
(375, 222, 113, 'Mini Fridge, Heater', 1, 'Ocean View', 'No damage', 'Available'),
(376, 222, 418, 'AC, TV', 3, 'Balcony', 'No damage', 'Occupied'),
(377, 222, 312, 'TV, Fridge', 3, 'Ocean View', 'No damage', 'Under Maintenance'),
(378, 222, 112, 'TV, Fridge', 4, 'Balcony', 'No damage', 'Occupied'),
(379, 222, 440, 'None', 1, 'Balcony', 'No damage', 'Under Maintenance');
