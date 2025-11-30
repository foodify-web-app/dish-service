import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },

    image: { type: String, required: true },
    category: { type: String, required: true },

    restaurantId: { type: String, required: true },

    stockStatus: { type: String, default: "in-stock" },
    veg: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
