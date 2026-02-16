require('dotenv').config();
//Tools
const express = require('express');
const {createClient}=require('@supabase/supabase-js');
const connectDB = require('./src/config/databese');
const reportesRoutes = require('./src/routes/reportes');

const app = express();
const PORT = process.env.PORT || 3000;

//DB
connectDB();

//Middleware
app.use('/api/reportes', reportesRoutes);


app.listen(PORT, () => {
    console.log(`Port connection running in : http://localhost:${PORT}`);
})

