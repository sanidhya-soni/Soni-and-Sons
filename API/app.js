require("dotenv").config();
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const authRoutes = require('./app/routes/Auth_Routes');
const userRoutes = require('./app/routes/User_Routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});