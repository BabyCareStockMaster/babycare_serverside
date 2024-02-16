const { Order, User, OrderProduct, Product, sequelize, WarehouseStock, Warehouse } = require('../models');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 1; // Changed the default limit to 1




// CUMA CONTROLLER CREATE ORDER YANG SUDAH SELESAI, YANG LAINNYA BELUM
// CUMA CONTROLLER CREATE ORDER YANG SUDAH SELESAI, YANG LAINNYA BELUM
// CUMA CONTROLLER CREATE ORDER YANG SUDAH SELESAI, YANG LAINNYA BELUM
class OrderController {

  static async create(req, res, next) {
    const { name, user_id, warehouse_id, order_products, status, total_item, address, tracking_code } = req.body;
  
    const t = await sequelize.transaction();
  
    try {
      // Check if the logged-in user matches the provided user_id
      if (user_id !== req.user.id) {
        throw { name: "Unauthorized", message: "You are not authorized to create orders for other users." };
      }
      
      const createdOrder = await Order.create(
        { name, user_id, warehouse_id, status, total_item, address, tracking_code },
        { transaction: t }
      );
  
      let orderProductArray = [];
      let totalPrice = 0;
  
      for (let i = 0; i < order_products.length; i++) {
        const currentProduct = order_products[i];
  
        const warehouseStock = await WarehouseStock.findOne({
          where: {
            product_id: currentProduct.product_id,
            warehouse_id,
          },
          transaction: t,
        });
  
        if (!warehouseStock) {
          throw { name: "emptyStock" };
        }
  
        if (warehouseStock.stock < currentProduct.quantity) {
          throw { name: "insufficient" };
        }
  
        const updatedQuantity = warehouseStock.stock - currentProduct.quantity;
        await warehouseStock.update({ stock: updatedQuantity }, { transaction: t });
  
        const createdOP = await OrderProduct.create(
          {
            product_id: currentProduct.product_id,
            order_id: createdOrder.id,
            price: currentProduct.price,
            quantity: currentProduct.quantity,
          },
          { transaction: t }
        );
  
        totalPrice += currentProduct.price * currentProduct.quantity;
        orderProductArray.push(createdOP);
      }
  
      await createdOrder.update({ total_price: totalPrice }, { transaction: t });
  
      await t.commit();
  
      res.status(201).json({ ...(createdOrder.dataValues), order_products: orderProductArray });

    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
  
  // BARU SAMPAI CREATE YANG FIX, GETALL SAMPE KEBAWAHNYA BELUM FIX
  // BARU SAMPAI CREATE YANG FIX, GETALL SAMPE KEBAWAHNYA BELUM FIX
  // BARU SAMPAI CREATE YANG FIX, GETALL SAMPE KEBAWAHNYA BELUM FIX
  // BARU SAMPAI CREATE YANG FIX, GETALL SAMPE KEBAWAHNYA BELUM FIX

  
  static async getAll(req, res, next) {
    try {
      const { page, limit } = req.query;
      const { count, rows: data } = await Order.findAndCountAll(filtering(req.query, req.user.id));
      const currentPage = page ? +page : DEFAULT_PAGE;
      const totalPages = limit ? Math.ceil(count / limit) : Math.ceil(count / DEFAULT_LIMIT);
      const result = {
        totalData: count,
        data,
        totalPages,
        currentPage
      }
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  
  static getById = async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const userId = req.user.id;
  
      // Check ownership before fetching the order
      const order = await Order.findOne({
        where: {
          id: orderId,
          user_id: userId // Ensure the order belongs to the logged-in user
        },
        include: [
          { model: Product, through: { attributes: ['price', 'quantity'] } },
          Warehouse,
          User,
          OrderProduct
        ]
      });
  
      if (!order) {
        throw { name: "NotFound", message: "Order not found or you are not authorized to access this order." };
      }
  
      res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  };
  

  static update = async (req, res, next) => {
    const { name, warehouse_id, order_products, status, total_item, address, tracking_code } = req.body;
    const t = await sequelize.transaction();
  
    try {
      const orderId = req.params.id;
      const userId = req.user.id;
  
      // Check ownership before updating the order
      const order = await Order.findOne({
        where: {
          id: orderId,
          user_id: userId // Ensure the order belongs to the logged-in user
        },
        include: [OrderProduct]
      });
  
      if (!order) {
        throw { name: "NotFound", message: "Order not found or you are not authorized to update this order." };
      }
  
      // Update order details
      await order.update(
        {
          name: name,
          warehouse_id: warehouse_id,
          status: status,
          total_item: total_item,
          address: address,
          tracking_code: tracking_code
        },
        { transaction: t }
      );
  
      let orderProductArray = [];
      let totalPrice = 0;
  
      for (let i = 0; i < order_products.length; i++) {
        const currentProduct = order_products[i];
  
        const product = await Product.findByPk(currentProduct.product_id, { transaction: t });
  
        if (!product || product.price !== currentProduct.price) {
          throw { name: "productPriceError" };
        }
  
        const warehouseStock = await WarehouseStock.findOne({
          where: {
            product_id: currentProduct.product_id,
            warehouse_id: warehouse_id,
          },
          transaction: t,
        });
  
        if (!warehouseStock) {
          throw { name: "emptyStock" };
        }
  
        if (warehouseStock.quantity < currentProduct.quantity) {
          throw { name: "insufficient" };
        }
  
        const updatedQuantity = warehouseStock.quantity - currentProduct.quantity;
        await warehouseStock.update({ quantity: updatedQuantity }, { transaction: t });
  
        const updatedOP = await OrderProduct.update(
          {
            price: currentProduct.price,
            quantity: currentProduct.quantity,
          },
          {
            where: {
              product_id: currentProduct.product_id,
              order_id: orderId,
            },
            returning: true,
            transaction: t,
          }
        );
  
        totalPrice += currentProduct.price * currentProduct.quantity;
        orderProductArray.push(updatedOP[1][0]);
      }
  
      await order.update(
        {
          total_price: totalPrice,
        },
        { transaction: t }
      );
  
      await t.commit();
  
      const updatedData = await Order.findByPk(orderId, {
        include: [
          {
            model: OrderProduct,
            attributes: ["product_id", "price", "quantity"],
          },
        ],
      });
  
      res.status(200).json({
        previous: {
          name: order.name,
          warehouse_id: order.warehouse_id,
          total_price: order.total_price,
        },
        current: {
          ...(updatedData.dataValues),
          order_products: orderProductArray,
        },
        dataUpdated: 1,
      });

    } catch (err) {
      await t.rollback();
      next(err);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const userId = req.user.id;
  
      // Check ownership before deleting the order
      const order = await Order.findOne({
        where: {
          id: orderId,
          user_id: userId // Ensure the order belongs to the logged-in user
        }
      });
  
      if (!order) {
        throw { name: "NotFound", message: "Order not found or you are not authorized to delete this order." };
      }
  
      await Order.destroy({ where: { id: orderId } });
      res.status(200).json({ message: `${order.name} deleted` });
      
    } catch (err) {
      next(err);
    }
  };
}

function filtering(query, user) {
  const { user_id, warehouse_id, page = 1, limit = DEFAULT_LIMIT, sort } = query;
  const offset = (page - 1) * limit;

  const joinBuild = [
    { model: User, 
      where: user_id ? { id: +user_id } : {}, 
      required: user_id ? true : false },
    { 
      model: Warehouse, 
      where: warehouse_id ? { id: +warehouse_id } : {}, 
      required: warehouse_id ? true : false 
    },    
  ];

  const filter = {
    include: joinBuild,
    where: { user_id: user },
    limit: parseInt(limit),
    offset: parseInt(offset),
    distinct: true,
    order: sort ? [[sort.split(':')[0], sort.split(':')[1] || 'ASC']] : []
  };

  return filter;
}

module.exports = OrderController;
