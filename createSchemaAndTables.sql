CREATE SCHEMA Hotel_chains_management;

CREATE TABLE address (
    Address_Id SERIAL PRIMARY KEY,
    Civic_number INTEGER NOT NULL,
    Postal_code VARCHAR(20) NOT NULL,
    Street_name VARCHAR(100) NOT NULL,
    Town VARCHAR(100) NOT NULL,
    Province VARCHAR(100) NOT NULL,
    Country VARCHAR(100) NOT NULL
);

CREATE TABLE hotel_chain (
    HotelChain_Id SERIAL PRIMARY KEY,
    Address_Id INTEGER REFERENCES address(Address_Id) ON DELETE SET NULL,
    number_of_hotels INTEGER NOT NULL,
    email_address VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL
);

CREATE TABLE hotel (
    Hotel_Id SERIAL PRIMARY KEY,
    HotelChain_Id INTEGER REFERENCES hotel_chain(HotelChain_Id) ON DELETE CASCADE,
    Address_Id INTEGER REFERENCES address(Address_Id) ON DELETE CASCADE,
    manager_Id INTEGER NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    number_of_rooms INTEGER NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email_address VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE room (
    Room_Id SERIAL PRIMARY KEY,
    Hotel_Id INTEGER REFERENCES hotel(Hotel_Id) ON DELETE CASCADE,
    price INTEGER NOT NULL,
    appliances TEXT,
    capacity INTEGER NOT NULL,
    extras TEXT,
    existing_damage TEXT,
    status VARCHAR(50) CHECK (status IN ('Available', 'Occupied', 'Under Maintenance'))
);



CREATE TABLE employee (
    Employee_Id SERIAL PRIMARY KEY,
    Hotel_Id INTEGER REFERENCES hotel(Hotel_Id) ON DELETE CASCADE,
    Address_Id INTEGER REFERENCES address(Address_Id) ON DELETE SET NULL,
    full_name VARCHAR(100) NOT NULL,
    NAS VARCHAR(20) UNIQUE NOT NULL,  -- NAS (numero d'assurance social)
    Position VARCHAR(50) NOT NULL
);

CREATE TABLE client (
    Client_Id SERIAL PRIMARY KEY,
    Address_Id INTEGER REFERENCES address(Address_Id) ON DELETE SET NULL,
    full_name VARCHAR(100) NOT NULL,
    NAS VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE reservation (
    Reservation_Id SERIAL PRIMARY KEY,
    Client_Id INTEGER REFERENCES client(Client_Id) ON DELETE CASCADE,
    Room_Id INTEGER REFERENCES room(Room_Id) ON DELETE CASCADE,
    Reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Reservation_status VARCHAR(50) CHECK (Reservation_status IN ('Pending', 'Confirmed', 'Cancelled'))
);

CREATE TABLE registration (
    Registration_Id SERIAL PRIMARY KEY,
    Employee_Id INTEGER REFERENCES employee(Employee_Id) ON DELETE SET NULL,
    Client_Id INTEGER REFERENCES client(Client_Id) ON DELETE CASCADE,
    Registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rent (
    Rent_Id SERIAL PRIMARY KEY,
    Employee_Id INTEGER REFERENCES employee(Employee_Id) ON DELETE SET NULL,
    Reservation_Id INTEGER REFERENCES reservation(Reservation_Id) ON DELETE CASCADE,
    Room_Id INTEGER REFERENCES room(Room_Id) ON DELETE CASCADE,
    Rent_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


