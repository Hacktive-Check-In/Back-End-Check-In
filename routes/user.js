// const Authentication = require('../middlewares/authentication');
const express = require('express')
const router = express.Router()

const UserControllers = require('../controllers/userController')
// router.use(Authentication);
router.post('/register', UserControllers.postRegister);
router.post('/login', UserControllers.postLogin);
// router.get('/:id', restaurantController.getRestaurantItem);

module.exports = router;
