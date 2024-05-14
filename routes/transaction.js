const transactionController = require('../controllers/transactionController');
const Authentication = require('../middlewares/authentication');
const router = require('express').Router();

router.get('/', Authentication, transactionController.getTransactionHeaderData);
router.post('/', Authentication, transactionController.createTransaction);
router.get('/:id', Authentication, transactionController.getTransactionDetail);
router.post('/midtrans/result', transactionController.successTransaction);
module.exports = router;
