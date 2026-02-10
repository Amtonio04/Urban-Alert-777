const mongoose = require('mongoose');

const reporteSchema = new mongoose.Schema({
    title: { 
        type: String,
         required: true 
        },
    description: { 
        type: String, 
        required: true 
        },
    Ubicacion: {
        type: String, 
        required: true 
        },
    prioridad:{
        type: String, 
        enum: ['Baja', 'Media', 'Alta'], 
        default: 'Media'  
        },
    Estado: {
        type: String, 
        default: 'abierto' 
        },
    FechaCreacion: { 
        type: Date, 
        default: Date.now 
        },
});


module.exports = mongoose.model('Reporte', reporteSchema);