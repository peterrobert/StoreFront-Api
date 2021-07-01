const express = require('express');
const mongoose = require('mongoose');

//=== Initialize the app.
const app = express();

//=== Connect to database.
mongoose.connect('mongodb://localhost/storefront', (err) => {
    if (err) {
        console.log(err)
    }
    console.log('database connection succesful')
})

// ====Home route

app.get('/', (req, res) => {
    res.send("welcome to home")
})


//=== Server.
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("listening to port " + PORT)
});



