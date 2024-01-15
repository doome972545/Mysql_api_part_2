const router = require('express').Router();
const {loginAdmin,getDoctorAdminNurse,changStatus,sortUser} =require('../controller/admin.controller')
const {verifyTokenAndAdmin} = require('../middleware/verifyToken')
router.post('/',loginAdmin )
router.get('/',verifyTokenAndAdmin,getDoctorAdminNurse )
router.post('/changeStatus',verifyTokenAndAdmin,changStatus )
router.post('/sort',verifyTokenAndAdmin,sortUser )
// router.post('/:id',addPatient )
// router.post('/cancel/:id',cancelPatient )

module.exports = router;