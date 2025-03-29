// src/app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const categoryRoute = require('./routes/categoryRoute'); 
const authRoute = require('./routes/authRoute'); 
const messagesRoute = require('./routes/messagesRoute'); 


const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/categories',categoryRoute ); 
app.use('/api/user',authRoute ); 
app.use('/api/message',messagesRoute ); 


const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
