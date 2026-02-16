const reporteService = require('../models/reporte');

exports.getreportes = async (req, res) => {
    try {
        const reportes = await reporte.find();
        res.json(reportes);
    } catch (error) {
        res.status(500).json({ message: 'Error to get reportes', error });
        
    }
};

exports.createreporte = async (req, res) => {
    try {
         const { title, description, Ubicacion } = req.body;

         let prioridad='Media'
         if (description.toLowerCase().includes('fuego') ||
         description.toLowerCase().includes('incendio'))
         {
            prioridad='Alta'
         }

         const newReporte = new reporte({
            title,
            description,
            Ubicacion,
            prioridad
         });

         const savedReporte = await newReporte.save();
         res.status(201).json(savedReporte);
    } catch (error) {
        res.status(400).json({ message: 'Error to create reporte', error });
        
    }
};