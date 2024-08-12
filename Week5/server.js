const express = require("express");
const { connectToDatabase } = require('./startServer');
const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// server will be on port 3000 
const port = process.env.PORT || 3000;

// mapped to vehicleRoutes for any incoming requests
app.use('/checker', vehicleRoutes);

app.listen(port, async () => {
    console.log("Server listening on port:", port);
    await connectToDatabase();
});