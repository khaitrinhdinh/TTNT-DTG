const express = require('express');
const client = require('./db');
const cors = require('cors'); 


// Khởi tạo ứng dụng Express
const app = express();
app.use(express.json());
//sử dụng cors và tạo cổng port
app.use(cors());
const PORT = 3000;

//Route Setup
const authRoutes = require("./routes/account");
app.use("/auth", authRoutes);


// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
