const router = require('express').Router();
const {loginAdmin,getDoctorAdmin,addPatient,cancelPatient} =require('../controller/admin.controller')

router.post('/',loginAdmin )
router.get('/:id',getDoctorAdmin )
router.post('/:id',addPatient )
router.post('/cancel/:id',cancelPatient )

module.exports = router;