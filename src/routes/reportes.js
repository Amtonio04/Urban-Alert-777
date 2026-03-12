const express = require('express');
const router = express.Router();
const Reportecontrol = require('../controllers/reportecontroller');
const Auth = require('../middlewares/auth');

//localhost:3000/api/reportes/GetAllReportes
//Get
router.get('/reportes',Auth,Reportecontrol.getReportes);

//Post
router.post('/CreateReporte',Auth,Reportecontrol.createReporte);

router.use('/auth', Auth);

module.exports = router;