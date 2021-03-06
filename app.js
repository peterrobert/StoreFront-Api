const express = require('express');
// === Custom modules
const db = require('./database')
const categoriesRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const registerUser = require('./routes/registration');
const auth = require('./routes/auth')
//=== Initialize the database and app.
db()
const app = express();
// ====Home route
app.get('/', (req, res) => {
    res.send("welcome to home")
})

// middle ware
app.use(express.json());
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productRoutes);
app.use('/api/signUp', registerUser);
app.use('/api/auth', auth);


//=== Server.
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("listening to port " + PORT)
});



