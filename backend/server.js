const express = require('express');
const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv').config;
const port = process.env.PORT || 8000




const connectDB = require('./config/db')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


connectDB();
app.listen(port, () => console.log(`Server started on port ${port}`))

