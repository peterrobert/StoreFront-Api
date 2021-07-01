const mongoose = require('mongoose');

//=== Connect to database.
const databaseConnection = async () => {
  try {
    const db = await  mongoose.connect('mongodb://localhost/storefront')
    console.log('database connected successfully ' + db)
  } catch (error) {
     console.log(error) 
  }
  
}

module.exports = databaseConnection

