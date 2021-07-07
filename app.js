const express = require('express');
// === Custom modules
const db = require('./database')
const categoriesRoutes = require('./routes/category')
//=== Initialize the database and app.
db()
const app = express();

// ====Home route
app.get('/', (req, res) => {
    res.send("welcome to home")
})

// middle ware
app.use(express.json());
app.use('/api/categories', categoriesRoutes)

//=== Server.
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("listening to port " + PORT)
});



