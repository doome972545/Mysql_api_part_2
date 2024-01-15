const router = require('express').Router();
const {uploadPost,showPost,removePost,editPost,getPost} = require('../controller/uploadpost')
const {upload} = require('../middleware/Upload')
const {verifyTokenAndAdmin} = require('../middleware/verifyToken')


router.post('/',upload,uploadPost)
router.get('/',showPost)
router.post('/remove/:id',removePost)
router.post('/edit/:id',upload,editPost)

module.exports = router;