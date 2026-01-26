requestAnimationFrame('dotenv').config();
//Tools
const express = require('express');
const mongoose = require('mongoose');
const (createClient)=require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

//Supabase connection
const supabaseUrl = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

//MongoDB connection
mongoose.connect(process.env.MONGO_URI);
        .then((()=> console.log('Connected to MongoDB')))
        .catch(err => console.error('MongoDB connection error:', err));

//Routes
app.get('/', async (req, res) => { 
    //Supabase healthcheck
    const {data, error} = await supabaseUrl.from('profiles').select('*').limit(1);

    res.json({
        message:'Welcome to UrbanAlert API',
        database_nosql:mongoose.connection.readyState === 1 ? 'Connection ready' : 'Fail connection',
        supabase_auth:error ? 'Error Connection' : 'Online'
})