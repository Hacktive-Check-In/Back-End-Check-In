const { Op } = require('sequelize');
const { Restaurant, Item } = require('../models');

class restaurantController {
  static async getRestaurant(req, res, next) {
    try {
      let searchTarget = req.query.search;
      const paramsQuerySQL = {};
      if (searchTarget) {
        paramsQuerySQL.where = {
          name: { [Op.iLike]: `%${searchTarget}%` },
        };
      }
      let restaurant = await Restaurant.findAll(paramsQuerySQL);
      res.status(200).json(restaurant);
    } catch (error) {
      next(error);
    }
  }
  static async getRestaurantItem(req, res, next) {
    try {
      let restaurantId = req.params.id;
      let restaurant = await Restaurant.findAll({
        include: {
          model: Item,
        },
        order: [['id', 'ASC']],
        where: {
          id: restaurantId,
        },
      });
      res.status(200).json(restaurant);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = restaurantController;
