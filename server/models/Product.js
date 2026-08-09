import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
        type: String,
        required: true,
        trim: true,
        enum: [
          "Fresh Fruits",
          "Vegetables",
          "Dairy & Breakfast",
          "Bakery",
          "Atta, Rice & Dal",
          "Snacks & Drinks",
          "Personal Care",
          "Baby Care",
          "Home & Cleaning"
        ],
    },

    price: {
      type: Number,
      required: true,
    },

    oldPrice: {
      type: Number,
      default: null,
    },

    unit: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    stock: {
      type: String,
      default: "In Stock",
    },

    delivery: {
      type: String,
      default: "25 mins",
    },

    origin: {
      type: String,
      default: "",
    },

    tag: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;