var express = require ("express")
var app = express()

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route for vehicle checker 
app.get('/checker', (req, res) => {
    const vehicle = req.query.vehicle;

    // Check if the vehicle number is a valid 6-digit number
    if (/^\d{6}$/.test(vehicle)) {
        // Check if the last digit is not 4 or 8
        const lastDigit = vehicle.charAt(vehicle.length - 1);
        if (lastDigit !== '4' && lastDigit !== '8') {
            return res.json({ valid: true });
        }
    }
    res.json({ valid: false });
});

var port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("App listening to: "+port)
})

