const sql = require('mssql');

const config = {
  user: 'sa', // replace with your database username
  password: '12345678', // replace with your database password
  server: 'Muzammil\\SQLEXPRESS', // replace with your database server address
  database: 'login', // replace with your database name
  connectionTimeout: 50000,
  requestTimeout: 50000,
  options: {
    trustServerCertificate: true // change to false for production
  }
};

async function connectToDatabase() {
  try {
    console.log('Attempting to connect to MSSQL...');
    let pool = await sql.connect(config);
    console.log("Connected successfully to MSSQL");
    return pool;
  } catch (error) {
    console.error("Error connecting to MSSQL", error);
  }
}


async function getAllUsers() {
  
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query('select * from users');
    console.log("In get all USers");
    console.log(result.recordset);
    return result.recordset;
  } catch (error) {
    console.error("Error fetching users", error);
  }
}


const getall = async () => {
  try {
    const pool = await connectToDatabase();
    const request = pool.request();
    request.input('email', "1@gmail.com");
    const result = await request.query('SELECT * FROM task WHERE userid = @email');
    console.log(result.recordset);
  } catch (error) {
    console.error('Error querying tasks:', error);
  }
};
// getall();

// getAllUsers();

module.exports = connectToDatabase;
