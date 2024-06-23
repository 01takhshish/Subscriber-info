require('dotenv').config();
const mongoose = require('mongoose');
const Subscriber = require('./models/subscribers');
const data = require('./data');

// Log environment variable for debugging
console.log('Database URL:', process.env.DATABASE_URL);

const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', () => console.log('Connected to the database'));

const refreshAll = async () => {
    try {
        await Subscriber.deleteMany({});
        await Subscriber.insertMany(data);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from the database');
    }
};

refreshAll();
