const express = require('express');
const client = require('../db');
const bcrypt = require('bcrypt'); 

//Controller đăng ký
const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const query = 'SELECT * FROM public.users WHERE username = $1 ';


    // Kiểm tra người dùng đã tồn tại chưa  
    const userExists = await client.query(query, [username]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Thêm người dùng mới vào database
    const insertQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    await client.query(insertQuery, [username, hashedPassword]);
    // Trả về phản hồi khi đăng ký thành công
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller đăng nhập
const login = async (req, res) => {
  try{
    const { username, password } = req.body;
    // Kiểm tra người dùng có tồn tại không
    const query =`SELECT * FROM "users" WHERE "username" = $1`;
    //kiểm tra query có đúng không
    const result = await client.query(query, [username]);
    // Nếu không tìm thấy người dùng, trả về lỗi 404
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Kiểm tra mật khẩu
    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // Nếu mật khẩu không hợp lệ, trả về lỗi 401
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    // Trả về phản hồi khi đăng nhập thành công
    res.status(200).json({ message: 'Login successful' });
  }catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {register, login};
