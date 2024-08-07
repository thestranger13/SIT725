const express = require("express");
const { connectToDatabase, getCollection } = require('./startServer');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

// Route for the vehicle checker
app.get('/checker', async (req, res) => {
    const vehicle = req.query.vehicle;

    if (/^\d{6}$/.test(vehicle)) {
        try {
            const collection = getCollection();
            let result = await collection.findOne({ vehicleNumber: vehicle });
            
            if (result) {
                res.json({ valid: true, message: "VALID!" });
            } else {
                // If the vehicle number does not exist, this will save the entry
                await collection.insertOne({ vehicleNumber: vehicle });
                console.log(`Saved vehicle number: ${vehicle}`); 
                res.json({ valid: false, message: "VEHICLE INVALID - entry saved" });
            }
        } catch (error) {
            console.error("Error querying/saving to database:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.status(400).json({ error: "Invalid vehicle number format" });
    }
});

// Route to display the saved vehicles 
app.get('/savedvehicles', async (req, res) => {
    try {
        const collection = getCollection();
        const vehicles = await collection.find({}).toArray();
        console.log('Fetched vehicles:', vehicles);
        res.json(vehicles);
    } catch (error) {
        console.error("Error fetching saved vehicles:", error);
        res.status(500).json({ error: "Error fetching saved vehicles" });
    }
});

app.listen(port, async () => {
    console.log("Server listening on port:", port);
    await connectToDatabase();
});