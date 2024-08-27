// imports the models 
const vehicleModel = require('../models/vehicleModel');

// handling the vehicle check
exports.checkVehicle = async (req, res) => {
    const vehicleNumber = req.query.vehicle;
    console.log(`Checking vehicle number: ${vehicleNumber}`);


    if (/^\d{6}$/.test(vehicleNumber)) {
        try {
            const vehicle = await vehicleModel.findVehicle(vehicleNumber);
            if (vehicle) {
                res.json({ valid: true, message: "VALID!" });
            } else {
                await vehicleModel.saveVehicle(vehicleNumber);
                res.json({ valid: false, message: "VEHICLE NOT IN DATABSE - entry saved" });
            }
        } catch (error) {
            console.error("Error querying/saving to database:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(400).json({ error: "Hey Hey! Invalid vehicle number format?!?!" });
    }
};

// handling the retrieval of all saved vehicles 
exports.getSavedVehicles = async (req, res) => {
    try {
        const vehicles = await vehicleModel.getAllVehicles();
        res.json(vehicles);
    } catch (error) {
        console.error("Error fetching saved vehicles:", error);
        res.status(500).json({ error: "Error fetching saved vehicles" });
    }
};