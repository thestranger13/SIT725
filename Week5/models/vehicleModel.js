// imports the function
const { getCollection } = require('../startServer');

// function to find the vehiclenumber from database
async function findVehicle(vehicleNumber) {
    const collection = getCollection();
    return await collection.findOne({ vehicleNumber });
}

// function to insert the vehicle number 
async function saveVehicle(vehicleNumber) {
    const collection = getCollection();
    return await collection.insertOne({ vehicleNumber });
}

// function to retrieve all vehicle numbers in the database
async function getAllVehicles() {
    const collection = getCollection();
    return await collection.find({}).toArray();
}

// export the functions to allow it to be reused  
module.exports = { findVehicle, saveVehicle, getAllVehicles };