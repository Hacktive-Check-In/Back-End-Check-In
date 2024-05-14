const router = require('express').Router();
router.get('/', (req, res) => {
  try {
    res.send('Home Page');
  } catch (error) {
    res.send(error);
  }
});

router.use('/restaurants', require('./restaurant'));
router.use(require('./user'))

router.use('/transactions', require('./transaction'));

module.exports = router;
