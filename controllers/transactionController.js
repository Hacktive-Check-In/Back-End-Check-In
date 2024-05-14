const {
  TransactionHeader,
  TransactionDetail,
  Restaurant,
  User,
  Item,
  sequelize,
} = require('../models');
const midtransClient = require('midtrans-client');
class transactionController {
  static async createTransaction(req, res, next) {
    const t = await sequelize.transaction(); // Start a transaction

    try {
      const data = req.body;
      const UserId = req.user.id;
      const { RestaurantId, reservationDate, totalPrice, items } = data;

      const newTransactionHeader = await TransactionHeader.create(
        {
          UserId,
          RestaurantId,
          reservationDate,
          totalPrice,
          status: 'pending',
        },
        { transaction: t }
      );

      const TransactionHeaderId = newTransactionHeader.id;
      const transactionDetails = items.map((item) => ({
        TransactionHeaderId,
        ItemId: item.ItemId,
        qty: item.qty,
        subTotal: item.subTotal,
      }));

      const newTransactionDetails = await TransactionDetail.bulkCreate(
        transactionDetails,
        { transaction: t }
      );

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let orderIdGenerate = TransactionHeaderId;

      let parameter = {
        transaction_details: {
          order_id: orderIdGenerate,
          gross_amount: newTransactionHeader.totalPrice,
        },
        credit_card: {
          secure: true,
        },
        item_details: [
          {
            id: orderIdGenerate,
            price: newTransactionHeader.totalPrice,
            quantity: 1,
            name: 'payment',
          },
        ],
      };
      const dataTransaction = await snap.createTransaction(parameter);
      const { redirect_url, token } = dataTransaction;
      await t.commit();
      res.status(201).json({
        transactionHeader: newTransactionHeader,
        transactionDetails: newTransactionDetails,
        redirect_url,
        token,
      });
    } catch (error) {
      await t.rollback();
      console.log('Error creating transaction:', error);
      next(error);
    }
  }

  static async successTransaction(req, res, next) {
    try {
      const data = req.body;
      console.log(data);
      if (
        data.transaction_status == 'settlement' ||
        data.transaction_status == 'capture'
      ) {
        const headerId = data.order_id;
        await TransactionHeader.update(
          { status: 'success' },
          {
            where: {
              id: headerId,
            },
          }
        );
      } else {
        const headerId = data.order_id;
        await TransactionHeader.update(
          { status: 'failed' },
          {
            where: {
              id: headerId,
            },
          }
        );
      }
      res.status(200).json({
        message: 'midtrans transaction process finish',
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getTransactionHeaderData(req, res, next) {
    try {
      const userId = req.user.id;
      const dataTransaction = await TransactionHeader.findAll({
        where: {
          UserId: userId,
          status: 'success',
        },
        include: [
          {
            model: Restaurant,
            attributes: ['name', 'location', 'description', 'rating', 'imgUrl'],
          },
        ],
      });
      res.status(200).json(dataTransaction);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getTransactionDetail(req, res, next) {
    try {
      const transactionHeaderId = req.params.id;
      const dataTransaction = await TransactionHeader.findOne({
        where: { id: transactionHeaderId },
        include: [
          {
            model: Restaurant,
            attributes: ['name', 'location', 'description', 'rating', 'imgUrl'],
          },
          {
            model: User,
            attributes: ['name', 'phoneNumber'],
          },
          {
            model: TransactionDetail,
            attributes: ['qty', 'subTotal'],
            include: [
              {
                model: Item,
                attributes: ['name', 'description', 'price'],
              },
            ],
          },
        ],
      });
      res.status(200).json(dataTransaction);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = transactionController;
