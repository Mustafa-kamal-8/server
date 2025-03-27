// src/routes/courseRoutes.js
const express = require('express');

const {  createCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');


const router = express.Router();

router.post('/', createCategory);

router.get('/', getCategory);

router.patch('/', updateCategory);
router.delete('/', deleteCategory);


module.exports = router;
