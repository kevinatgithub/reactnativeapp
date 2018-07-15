/**
 * Table Structures
 */

module.exports = {

  create_patients : `
    CREATE TABLE IF NOT EXISTS patients(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fname TEXT,
      mname TEXT,
      lname TEXT,
      gender TEXT,
      bdate TEXT,
      type TEXT
    );
    `,
  create_genders : `  
    CREATE TABLE IF NOT EXISTS genders(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT,
      desc TEXT
    );
    `,
  create_types : `  
    CREATE TABLE IF NOT EXISTS patientTypes(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT,
      desc TEXT
    );
  `,

  drop_patients: `DROP TABLE IF EXISTS patients;`,
  drop_genders: `DROP TABLE IF EXISTS genders;`, 
  drop_types : `DROP TABLE IF EXISTS patientTypes;`,

  // Sample Test Data to populate our database
  seed_patients : `
    INSERT INTO patients VALUES 
      (null,'Sample','Sample','Sample','M','1989-01-30','I'),
      (null,'Sample2','Sample2','Sample2','F','1989-01-30','O'),
      (null,'Sample3','Sample3','Sample3','M','1989-01-30','I');
    `,
  seed_genders : `
    INSERT INTO genders VALUES 
      (null,'M','Male'),
      (null,'F','Female');
  `,
  seed_types : `
    INSERT INTO patientTypes VALUES 
      (null,'I','In-patient'),
      (null,'O','Out-patient');
  `

}