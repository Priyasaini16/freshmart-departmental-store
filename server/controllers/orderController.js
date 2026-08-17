import Order from "../models/Order.js";
import Product from "../models/Product.js";

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "No items in the order",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        message: "Shipping address is required",
      });
    }

    // Convert frontend product IDs into MongoDB ObjectIds
    const processedItems = [];

    for (const item of items) {
      const product = await Product.findOne({
        name: item.name,
      });

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.name}`,
        });
      }

      processedItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity || 1,
      });
    }

    const order = await Order.create({
      user: req.user.id,
      items: processedItems,
      shippingAddress,
      paymentMethod: paymentMethod || "COD",
      totalAmount,
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};


// @desc    Get logged-in user's orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("items.product", "name image price")
      .sort({ createdAt: -1 });

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error("Get My Orders Error:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};


// @desc    Get a single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name image price");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // User can only view their own order
    if (order.user._id.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to view this order",
      });
    }

    res.status(200).json({
      order,
    });
  } catch (error) {
    console.error("Get Order Error:", error);

    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};