// db.js
const { Client } = require('pg');

// Cấu hình kết nối cơ sở dữ liệu PostgreSQL
// const client = new Client({
//   user: "postgres",
//   host: 'localhost',  
//   database: 'test',
//   password: 'khaideptrai714',
//   port: 5432,
// });
const client = new Client({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT,
});

// Kết nối đến cơ sở dữ liệu
client.connect()
    .then(() => {
        // Thiết lập search_path cho schema public
        return client.query('SET search_path TO public');
    })
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err);
  });

// Export client để sử dụng trong các file khác
module.exports = client;
