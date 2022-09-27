require('dotenv').config();
const mongoose = require('mongoose') 
const { DB_USER, DB_PASSWORD,DB_URI } = process.env;

    try {        
         mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}${DB_URI}`) 
        console.log('DB connected')   
    } catch (error) {
        console.log('Error not connected')   
        console.log('erro: ', error);        
    }
