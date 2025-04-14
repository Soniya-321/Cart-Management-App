const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');


router.get('/', authMiddleware, categoryController.getCategories);
router.post('/', authMiddleware, categoryController.addCategory);
router.put('/:id', authMiddleware, categoryController.editCategory);

module.exports = router;
