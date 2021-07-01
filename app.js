const express = require('express');
// === Custom modules
const db = require('./server')
//=== Initialize the database and app.
db()
const app = express();

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



