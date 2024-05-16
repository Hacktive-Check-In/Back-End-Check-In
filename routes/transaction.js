const transactionController = require('../controllers/transactionController');
const Authentication = require('../middlewares/authentication');
const router = require('express').Router();

router.get('/', Authentication, transactionController.getTransactionHeaderData);
router.post('/', Authentication, transactionController.createTransaction);
router.post('/midtrans/result', transactionController.successTransaction);
router.get('/:id', Authentication, transactionController.getTransactionDetail);
module.exports = router;
