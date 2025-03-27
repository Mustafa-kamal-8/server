require('dotenv').config()
const mysql = require('mysql2/promise')

const db1 = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB1_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

const db2 = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB2_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

db1
  .getConnection()
  .then(() => console.log('Connected to MySQL database 1.'))
  .catch((err) => console.error('Database connection failed:', err))

db2
  .getConnection()
  .then(() => console.log('Connected to MySQL database 2.'))
  .catch((err) => console.error('Database connection failed:', err))

module.exports = { db1, db2 }
