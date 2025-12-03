const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController'); // correct path
const { verifyToken } = require('../middleware/auth');

router.post('/create', verifyToken, postController.createPost);

router.get('/', verifyToken, postController.getAllPosts);

router.get('/:id', verifyToken, postController.getPostById);

router.put('/:id', verifyToken, postController.updatePost);

router.delete('/:id', verifyToken, postController.deletePost);

module.exports = router;