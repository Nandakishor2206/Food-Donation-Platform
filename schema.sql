-- Drop tables if they exist to avoid conflicts
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS ngos;
DROP TABLE IF EXISTS donations;

-- Create users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create NGOs table
CREATE TABLE ngos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create donations table
CREATE TABLE donations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL,
    food_name TEXT NOT NULL,
    quantity TEXT NOT NULL,
    location TEXT NOT NULL,
    mobile TEXT NOT NULL,
    status TEXT NOT NULL,
    ngo_email TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_email) REFERENCES users (email),
    FOREIGN KEY (ngo_email) REFERENCES ngos (email)
);

-- Insert some demo data
INSERT INTO users (name, email, password) VALUES 
('nanda kishor', 'nandakishorchandolu11@gmail.com', '123456'),
('manideep', 'manideepanga@gmail.com', '2206');

INSERT INTO ngos (name, email, password) VALUES 
('Food For All', 'ffa@gmail.com', 'ngo123'),
('nandu team', '23wj1a6217@gniindia.org', '123456');