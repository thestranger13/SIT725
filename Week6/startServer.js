const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://camilleangshujie:MEHcjjRXuvYNsOlC@thestranger13.lch1ysu.mongodb.net/";
const client = new MongoClient(uri);

// reference to the database in mongodb 
let collection;

// establish the connection with the database with error handling 
async function connectToDatabase() {
    try {
        await client.connect();
        const database = client.db("vehicleChecker");
        collection = database.collection("vehicles");
        console.log("Connected to MongoDB");
    } catch (ex) {
        console.error("Error connecting to MongoDB:", ex);
    }
}

function getCollection() {
    return collection;
}

// export the functions to allow it to be reused  
module.exports = { connectToDatabase, getCollection };