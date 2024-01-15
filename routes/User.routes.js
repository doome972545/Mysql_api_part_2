const router = require('express').Router();
const {readUser, readUserId,readUserAndCount}= require('../controller/user.controller')
const {verifyToken,verifyTokenAndAdmin} = require('../middleware/verifyToken')

router.get('/',readUser)
router.get('/:id',readUserId)
router.get('/count',readUserAndCount)


module.exports = router;