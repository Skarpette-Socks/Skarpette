const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const skarpetteRouter = require('./routes/skarpette');
const orderRouter = require('./routes/order');
const adminRouter = require('./routes/admin');
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

app.use('/skarpette', skarpetteRouter);
app.use('/order', orderRouter);
app.use('/admin', adminRouter);

app.listen(process.env.PORT, () => {
    console.log('Backend is running');
});
