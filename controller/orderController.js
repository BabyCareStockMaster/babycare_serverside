const {
  User,
  Warehouse,
  Product,
  OrderProduct,
  WarehouseStock,
  Order,
  sequelize,
} = require("../models");
const { sendMail } = require("../lib/nodemailer");
const { Op } = require("sequelize");
class OrderController {
  static createOrder = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const {
        user_id,
        warehouse_id,
        products,
        status,
        address,
        tracking_code,
      } = req.body;
      // validate User
      const user = await User.findOne({ where: { id: user_id } });
      if (!user) throw { name: "UsernotFound" };
      // validate Warehouse
      const warehouse = await Warehouse.findOne({
        where: { id: warehouse_id },
      });
      if (!warehouse) throw { name: "warehouseNotFound" };
      
      //create order
      const createOrder = await Order.create(
        {
          user_id,
          warehouse_id,
          total_price: 0,
          total_item: 0,
          status,
          address,
          tracking_code,
        },
        { transaction: t }
      );

      let totalPrice = 0;
      let totalItem = 0;

      for (let i = 0; i < products.length; i++) {
        const currentProduct = products[i];

        // validate Product
        const product = await Product.findByPk(currentProduct.id);
        if (!product) throw { name: "productNotFound" };

        //validate stock
        const stockExist = await WarehouseStock.findOne({
          where: {
            product_id: product.id,
            warehouse_id: warehouse.id,
          },
        });
        if (!stockExist || stockExist.stock < currentProduct.quantity) {
          throw { name: "stockNotFound" };
        }

        //validate quantity
        if (currentProduct.quantity <= 0) {
          throw { name: "invalidQuantity" };
        }
        //validate price
        if (currentProduct.price <= 0) {
          throw { name: "invalidPrice" };
        }

        //reduce stock
        await stockExist.decrement(
          "stock",
          { by: currentProduct.quantity },
          { transaction: t }
        );

        //create order product
        await OrderProduct.create(
          {
            order_id: createOrder.id,
            product_id: currentProduct.id,
            quantity: currentProduct.quantity,
            price: currentProduct.price,
          },
          { transaction: t }
        );
        totalPrice += currentProduct.price * currentProduct.quantity;
        totalItem += currentProduct.quantity;
      }

      //update order
      await createOrder.update(
        {
          total_price: totalPrice,
          total_item: totalItem,
        },
        { transaction: t }
      );

      //send email to user
      const subject = "Order Confirmation";
      const emailText = 
      `Halo ${user.first_name} ${user.last_name},
      This is Your order :
      Tracking Code: ${tracking_code}
      Address: ${address}
      Total Price: ${totalPrice}
      Total Item: ${totalItem}`;
      sendMail(subject, emailText);

      await t.commit();

      res.status(201).json(createOrder);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  };

  //get list all orders
  static getallOrders = async (req, res, next) => {
    try {
      const {
        page = 1,
        limit = 10,
        search,
        start_date,
        end_date,
        sort,
      } = req.query;
      const offset = (page - 1) * limit;
      let whereClause = {};

      // Apply search by ID or user
      if (search) {
        whereClause = {
          [Op.or]: [{ id: search }, { user_id: search }],
        };
      }

      // Apply date filtering
      if (start_date && end_date) {
        whereClause.createdAt = {
          [Op.between]: [start_date, end_date],
        };
      }

      // Apply sorting
      let orderClause = [];
      if (sort === "latest") orderClause = [["createdAt", "DESC"]];
      if (sort === "oldest") orderClause = [["createdAt", "ASC"]];

      const orders = await Order.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: offset,
        order: orderClause,
      });
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  //update status 
  static updateStatus = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const { status } = req.body;
      const order = await Order.findByPk(id);
      if (!order) throw { name: "notFound" };
      await order.update({ status }, { transaction: t });
      await t.commit();
      res.status(200).json({ message: "Successfully updated status" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  //delete order 
  static deleteOrder = async (req, res, next) => {
    const t = await sequelize.transaction();
    try{
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (!order) throw { name: "orderNotFound" };
      await order.destroy({ transaction: t });
      await t.commit();
      res.status(200).json({ message: "Successfully deleted order" });
    } catch {
      await t.rollback();
      next(error);
    }
  }
}


module.exports = OrderController;
