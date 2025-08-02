--  DROP TABLES IF THEY EXIST (in correct dependency order)
DROP TABLE IF EXISTS ROOM_ALLOCATION;
DROP TABLE IF EXISTS PATIENT_MASTER;
DROP TABLE IF EXISTS ROOM_MASTER;
DROP TABLE IF EXISTS DOCTOR_MASTER;

--  CREATE TABLES

-- DOCTOR_MASTER TABLE
CREATE TABLE DOCTOR_MASTER (
    doctor_id VARCHAR(15) PRIMARY KEY,
    doctor_name VARCHAR(15) NOT NULL,
    dept VARCHAR(15) NOT NULL
);

-- ROOM_MASTER TABLE
CREATE TABLE ROOM_MASTER (
    room_no VARCHAR(15) PRIMARY KEY,
    room_type VARCHAR(15) NOT NULL,
    status VARCHAR(15) NOT NULL
);

-- PATIENT_MASTER TABLE
CREATE TABLE PATIENT_MASTER (
    pid VARCHAR(15) PRIMARY KEY,
    name VARCHAR(15) NOT NULL,
    age NUMERIC(15) NOT NULL,
    weight NUMERIC(15) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    address VARCHAR(50) NOT NULL,
    phoneno VARCHAR(10) NOT NULL,
    disease VARCHAR(50) NOT NULL,
    doctor_id VARCHAR(15) NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES DOCTOR_MASTER(doctor_id)
);

-- ROOM_ALLOCATION TABLE
CREATE TABLE ROOM_ALLOCATION (
    room_no VARCHAR(15) NOT NULL,
    pid VARCHAR(15) NOT NULL,
    admission_date DATE NOT NULL,
    release_date DATE,
    FOREIGN KEY (room_no) REFERENCES ROOM_MASTER(room_no),
    FOREIGN KEY (pid) REFERENCES PATIENT_MASTER(pid)
);

--  INSERT DATA

-- DOCTOR_MASTER
INSERT INTO DOCTOR_MASTER VALUES
('D0001', 'Ram', 'ENT'),
('D0002', 'Rajan', 'ENT'),
('D0003', 'Smita', 'Eye'),
('D0004', 'Bhavan', 'Surgery'),
('D0005', 'Sheela', 'Surgery'),
('D0006', 'Nethra', 'Surgery');

-- ROOM_MASTER
INSERT INTO ROOM_MASTER VALUES
('R0001', 'AC', 'occupied'),
('R0002', 'Suite', 'vacant'),
('R0003', 'NonAC', 'vacant'),
('R0004', 'NonAC', 'occupied'),
('R0005', 'AC', 'vacant'),
('R0006', 'AC', 'occupied');

-- PATIENT_MASTER
INSERT INTO PATIENT_MASTER VALUES
('P0001', 'Gita', 35, 65, 'F', 'Chennai', '9867145678', 'Eye Infection', 'D0003'),
('P0002', 'Ashish', 40, 70, 'M', 'Delhi', '9845675678', 'Asthma', 'D0003'),
('P0003', 'Radha', 25, 60, 'F', 'Chennai', '9867166678', 'Pain in heart', 'D0005'),
('P0004', 'Chandra', 28, 55, 'F', 'Bangalore', '9978675567', 'Asthma', 'D0001'),
('P0005', 'Goyal', 42, 65, 'M', 'Delhi', '8967533223', 'Pain in Stomach', 'D0004');

-- ROOM_ALLOCATION
INSERT INTO ROOM_ALLOCATION VALUES
('R0001', 'P0001', '2016-10-15', '2016-10-26'),
('R0002', 'P0002', '2016-11-15', '2016-11-26'),
('R0002', 'P0003', '2016-12-01', '2016-12-30'),
('R0004', 'P0001', '2017-01-01', '2017-01-30');

SELECT * FROM DOCTOR_MASTER;
SELECT * FROM ROOM_MASTER;
SELECT * FROM PATIENT_MASTER;
SELECT * FROM ROOM_ALLOCATION;

-- 1: Display the patients who were admitted in the month of january.
SELECT P.*
FROM PATIENT_MASTER P
JOIN ROOM_ALLOCATION R ON P.pid = R.pid
WHERE MONTH(R.admission_date) = 1;

-- 2: 2: Display the female patient who is not suffering from ashma
SELECT *
FROM PATIENT_MASTER
WHERE gender = 'F' AND disease NOT LIKE '%Asthma%';

--3: Count the number of male and female patients.
SELECT gender, COUNT(*) AS gender_count
FROM PATIENT_MASTER
GROUP BY gender;

--4: Display the patient_id,patient_name, doctor_id, doctor_name, room_no, room_type and admission_date.
SELECT 
    P.pid AS patient_id,
    P.name AS patient_name,
    D.doctor_id,
    D.doctor_name,
    R.room_no,
    RM.room_type,
    R.admission_date
FROM PATIENT_MASTER P
JOIN DOCTOR_MASTER D ON P.doctor_id = D.doctor_id
JOIN ROOM_ALLOCATION R ON P.pid = R.pid
JOIN ROOM_MASTER RM ON R.room_no = RM.room_no;

--5: Display the room_no which was never allocated to any patient.
SELECT room_no
FROM ROOM_MASTER
WHERE room_no NOT IN (
    SELECT DISTINCT room_no FROM ROOM_ALLOCATION
);


--6: Display the room_no, room_type which are allocated more than once.
SELECT R.room_no, RM.room_type, COUNT(*) AS times_allocated
FROM ROOM_ALLOCATION R
JOIN ROOM_MASTER RM ON R.room_no = RM.room_no
GROUP BY R.room_no, RM.room_type
HAVING COUNT(*) > 1;

