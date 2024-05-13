// const Authentication = require('../middlewares/authentication');

const router = require('express').Router();

// router.use(Authentication);
router.get('/', (req, res) => {
  res.json({ Message: ' udah ke hit mas' }).status(200);
});

module.exports = router;
