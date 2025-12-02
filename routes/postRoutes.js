const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController'); // correct path
const { verifyToken } = require('../middleware/auth');

router.post('/create', verifyToken, postController.createPost);

router.get('/',postController.getAllPosts);

module.exports = router;