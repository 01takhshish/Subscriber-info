**API for Getting Youtue Subscriber**
This API is designed to manage subscribers and their information. It provides endpoints to retrieve subscriber data, including all subscribers' details, only names and subscribed channels, and details of a subscriber by their ID. Additionally, it includes functionalities to create a MongoDB database with sample subscriber data.

**Used Technologies**

-ExpressJS
-MongoDB
-NodeJS
-BootStrap for basic structure of static webpage

**Setup**
To set up and run the API locally, follow these steps:
**Clone this repository to your local machine.**
```bash
git clone https://github.com/01takhshish/Subscriber-info
```
**Install dependencies using npm.**
```bash
npm install
```
**Set up your MongoDB connection by creating a .env file in the root directory of the project and adding your MongoDB URI.**
```bash
MONGODB_URI=mongodb://localhost/subscribers
```
If you are using MongoDB Atlas, replace 
```bash
mongodb://localhost/subscribers with your Atlas URI.
```


**Start the server.**
```bash
npm start
```
This will start the server at http://localhost:3000 (or another port if specified in your .env file).

**Endpoints**
**Get All Subscribers**
**URL: /subscribers**
-Method: GET
-Description: Retrieves details of all subscribers.
-Success Response:
-Code: 200
-Content: Array of subscriber objects containing all information.
-Error Response:
-Code: 400
-Content: { "error": "You have Done a Bad Request. Check the URL again" }

**Get Subscriber Names and Channels
URL: /subscribers/names**
-Method: GET
-Description: Retrieves details of all subscribers containing only their names and subscribed channels.
-Success Response:
-Code: 200
-Content: Array of subscriber objects containing names and subscribed channels.
-Error Response:
-Code: 400
-Content: { "error": "You have Done a Bad Request. Check the URL again" }

**Get Subscriber by ID
URL: /subscribers/:id**
-Method: GET
-Description: Retrieves details of a subscriber with the specified ID.
-Success Response:
-Code: 200
-Content: Subscriber object matching the provided ID.
-Error Response:
-Code: 400
-Content: { "message": "Error message" }

**Models**
Subscriber Model
### Field               -->       Type
- _id                 -->       ObjectID
- name                -->       String
- subscribedChannel   -->       String
- subscribedDate      -->       Date
- __v                 -->       Int32

**Deployment**
Deployed version<a href="https://01takhshish.github.io/subscribe/">YouTube Subscriber API</a>.</p>

****NOTE**
<p> This capstone project is associated with <a href="https://www.almabetter.com">Almabetter</a>.</p>

Ensure that your MongoDB connection URI is correctly configured in the .env file.
Sample data is provided in data.js and can be modified as needed.
The API assumes a basic understanding of RESTful principles and MongoDB.
For production use, implement additional security measures such as authentication and input validation.
Replace placeholder URLs and information with actual values specific to your application.
