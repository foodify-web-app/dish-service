// import mongoose from "mongoose";

// const foodSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     image: { type: String, required: true },
//     category: { type: String, required: true },
//     restaurantId: { type: String, required: true }
// })

// const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

// export default foodModel;


import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },

    image: { type: String, required: true },
    category: { type: String, required: true },

    restaurantId: { type: String, required: true },

    // Additional UI fields
    isAvailable: { type: Boolean, default: true },
    veg: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },

    tags: [{ type: String }]
  },
  { timestamps: true }
);

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
