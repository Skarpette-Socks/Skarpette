const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const mainRouter = require('./routes/main');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB: ', error);
    });

app.use('/', mainRouter);

app.listen(process.env.PORT, () => {
    console.log('Backend is running');
});
