const Authentication = require('../middlewares/authentication');
const restaurantController = require('../controllers/restaurantController');
const router = require('express').Router();

router.use(Authentication);
router.get('/', restaurantController.getRestaurant);
router.get('/:id', restaurantController.getRestaurantItem);

module.exports = router;
