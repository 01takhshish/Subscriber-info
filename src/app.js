const express = require('express');
const mongoose = require('mongoose');
const Subscriber = require('./models/subscribers');
const path = require('path');
const app = express();

require('dotenv').config();

// Define the directory where your static files are located
const staticPath = path.join(__dirname, '../public');

// Serve static files from the 'public' directory
app.use(express.static(staticPath));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to DATABASE
const port = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to the database'));

// Define routes
app.get('/subscriber', async (req, res) => {
    try {
        const subscribers = await Subscriber.find({});
        res.json(subscribers);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/subscribers", async (req, res) => {
    try {
      // The `subscriberModel.find()` function returns a Promise that resolves to an array of all subscribers in the database.
      const subs = await Subscriber.find();
  
      // The `res.status(200)` sets the HTTP status code to 200, indicating a successful request.
      // The `.json()` method sends a JSON response to the client, with the `subs` array as the body.
  
      res.status(200).json(subs);
    } catch (error) {
      // If an error occurs during the request, an HTTP status code of 400 is returned with an error message.
      res.status(400).json({
        error: "You have Done a Bad Request Check the URL again",
      });
      return;
    }
  });
  
  // Below code is end point to get details of subscribers containing only information name and subscribedChannel
  app.get("/subscribers/names", async (req, res) => {
    try {
      //query for getting data from subscriberModel  and returning only names in it
      const subs = await Subscriber.find(
        {},
        { _id: 0, name: 1, subscribedChannel: 1 }
      );
      // response 200 for successful data retreving
      res.status(200).json(subs);
    } catch (error) {
      //gives error message if url is incorrect or any other issue comes up
      res.status(400).json({
        error: "You have Done a Bad Request Check the URL again",
      });
      return;
    }
  });
  
  // Below code is end point to get details of subscriber that has  provided specific id
  app.get("/subscribers/:id", async (req, res) => {
    try {
      //below gets id from parameters passed in URL
      let id = req.params.id;
      //below  finds user by its ID and returns the result
      const subs = await Subscriber.findById(id);
      //response 200 for successful data retreving
      res.status(200).json(subs);
    } catch (error) {
      //gives error message if url is incorrect or any other issue comes up
      res.status(400).json({
        message: error.message,
      });
      return;
    }
  });
  


app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
