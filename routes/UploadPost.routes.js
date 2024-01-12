const router = require('express').Router();
const {uploadPost,showPost,removePost,editPost} = require('../controller/uploadpost')
const {upload} = require('../middleware/Upload')

router.post('/',upload,uploadPost)
router.get('/',showPost)
router.post('/remove/:id',removePost)
router.post('/edit/:id',editPost)

module.exports = router;