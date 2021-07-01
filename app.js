const express = require('express');
const mongoose = require('mongoose');

//=== initialize the app
const app = express();

//=== 


//=== server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
   if(err){
       console.log(err)
   }
   console.log("listening to port" + PORT)
});



