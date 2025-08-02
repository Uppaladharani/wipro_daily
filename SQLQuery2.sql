use EmpSample_#OK
go
SELECT*
FROM Tblemployees;
--1.List of Employees who have a one-part name
SELECT * 
FROM dbo.tblEmployees
WHERE LEN(Name) - LEN(REPLACE(Name, ' ', '')) = 0;

--2. List of Employees who have a three-part name
SELECT * 
FROM dbo.tblEmployees
WHERE LEN(Name) - LEN(REPLACE(Name, ' ', '')) = 2;
--3. List of Employees who have First, Middle or Last name as only 'Ram'
SELECT * 
FROM dbo.tblEmployees
WHERE 
    (LEN(Name) - LEN(REPLACE(Name, ' ', '')) = 0 AND Name = 'Ram') OR
    (LEN(Name) - LEN(REPLACE(Name, ' ', '')) = 1 AND 
     (LEFT(Name, CHARINDEX(' ', Name)) = 'Ram' OR 
      RIGHT(Name, LEN(Name) - CHARINDEX(' ', Name)) = 'Ram')) OR
    (LEN(Name) - LEN(REPLACE(Name, ' ', '')) = 2 AND 
     'Ram' IN (
         PARSENAME(REPLACE(Name, ' ', '.'), 1),
         PARSENAME(REPLACE(Name, ' ', '.'), 2),
         PARSENAME(REPLACE(Name, ' ', '.'), 3)
     ));

     --5. All data from dbo.tblCentreMaster
     SELECT * 
FROM dbo.tblCentreMaster;

-- 6. Distinct Employee Types
SELECT DISTINCT EmployeeType 
FROM dbo.tblEmployees;


-- 7. Employee details based on PresentBasic
SELECT Name, FatherName, DOB 
FROM dbo.tblEmployees 
WHERE PresentBasic > 3000;

SELECT Name, FatherName, DOB 
FROM dbo.tblEmployees 
WHERE PresentBasic < 3000;

SELECT Name, FatherName, DOB 
FROM dbo.tblEmployees 
WHERE PresentBasic BETWEEN 3000 AND 5000;



-- 8. Employees by Name patterns
SELECT * 
FROM dbo.tblEmployees 
WHERE Name LIKE '%KHAN';

SELECT * 
FROM dbo.tblEmployees 
WHERE Name LIKE 'CHANDRA%';

SELECT * 
FROM dbo.tblEmployees 
WHERE Name LIKE '[A-T].RAMESH';
