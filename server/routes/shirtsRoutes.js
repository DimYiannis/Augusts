const express = require('express');
const router = express.Router();
const {
    authenticateUser,
    
} = require('../middleware/authentication')

const {
    getAllProducts,
} = require('../controllers/shirtsContoller')

router
.route('/')
.get(getAllProducts);

router.route('/:id').get(authenticateUser)

module.exports = router;
