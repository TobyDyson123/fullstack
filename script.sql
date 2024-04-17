USE fullstack;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS Instructor;
DROP TABLE IF EXISTS Class;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Booking;

-- Creating the Instructor table
CREATE TABLE Instructor (
    instructorID INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    startDate DATE NOT NULL,
    bio TEXT NOT NULL,
    photo TEXT NOT NULL
);

-- Creating the Class table
CREATE TABLE Class (
    classID INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    time TIME NOT NULL,
    date DATE NOT NULL,
    duration INT NOT NULL,
    instructorID INT NOT NULL,
    capacity INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    FOREIGN KEY (instructorID) REFERENCES Instructor(instructorID)
);

-- Creating the Customer table
CREATE TABLE Customer (
    customerID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NULL,
    subscribed VARCHAR(3) DEFAULT 'no'
);

-- Creating the Booking table
CREATE TABLE Booking (
    bookingID INT AUTO_INCREMENT PRIMARY KEY,
    classID INT,
    customerID INT,
    FOREIGN KEY (classID) REFERENCES Class(classID),
    FOREIGN KEY (customerID) REFERENCES Customer(customerID)
);

-- Inserting data into the Instructor table
INSERT INTO Instructor (firstname, surname, startDate, bio, photo) VALUES 
('Will', 'Allan', '2012-01-10', 'A seasoned professional with over a decade of experience.', 'https://images.pexels.com/photos/8436721/pexels-photo-8436721.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),
('Jane', 'Smith', '2020-05-20', 'Expert in innovative teaching methods.', 'https://images.pexels.com/photos/4327032/pexels-photo-4327032.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),
('Jim', 'Brown', '2021-07-15', 'Specializes in beginner to advanced levels.', 'https://images.pexels.com/photos/6013492/pexels-photo-6013492.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),
('Emily', 'Davis', '2019-03-30', 'Passionate about interactive learning.', 'https://images.pexels.com/photos/13058691/pexels-photo-13058691.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),
('Hugh', 'Chadwick', '2018-11-01', 'A tech-savvy god-like educator with a focus on modern techniques.', 'https://images.pexels.com/photos/7529994/pexels-photo-7529994.jpeg?auto=compress&cs=tinysrgb&w=600'),
('Michelle', 'Taylor', '2022-02-18', 'Brings a wealth of knowledge in her field.', 'https://images.pexels.com/photos/2597205/pexels-photo-2597205.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');

-- Inserting data into the Class table
INSERT INTO Class (title, time, date, duration, instructorID, capacity, location) VALUES 
('Yoga for Beginners', '08:00:00', '2024-04-20', 60, 1, 10, 'Studio 1'),
('Advanced Pilates', '09:30:00', '2024-04-20', 60, 2, 15, 'Studio 1'),
('Meditation and Wellness', '11:00:00', '2024-04-21', 90, 3, 12, 'Studio 1'),
('Strength Training', '12:30:00', '2024-04-21', 60, 4, 4, 'Studio 1'),
('Cardio Kickboxing', '14:00:00', '2024-04-22', 60, 5, 5, 'Studio 1'),
('Zumba Dance', '15:30:00', '2024-04-22', 60, 6, 10, 'Studio 1'),
('CrossFit Challenge', '17:00:00', '2024-04-23', 60, 1, 3, 'Studio 1'),
('Total Body Workout', '18:30:00', '2024-04-23', 60, 2, 7, 'Studio 1'),
('Aerobics for Energy', '20:00:00', '2024-04-24', 60, 3, 6, 'Studio 1'),
('Healthy Spine and Posture', '08:30:00', '2024-04-24', 60, 4, 2, 'Studio 1'),
('Cycling for Endurance', '10:00:00', '2024-04-25', 90, 5, 10, 'Studio 1'),
('Prenatal Yoga', '11:30:00', '2024-04-26', 60, 6, 8, 'Studio 1');