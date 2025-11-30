import cloudinary from "../config/cloudinary.js";
import foodRepository from "../repositories/foodRepository.js";

// add food
const createDish = async (req, res) => {
  try {
    const imageUrl = req.file?.path; // Cloudinary uploads using multer-storage-cloudinary
    const food = {
      image: imageUrl,
      veg: req.body.veg === "false" ? false : true,
      ...req.body,
    };
    const newDish = await foodRepository.create(food);
    return res.json({ success: true, message: "Dish Added Successfully", data: newDish });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error Adding Dish" });
  }
};


//All food list
const getAllDish = async (req, res) => {
  try {
    const allDishes = await foodRepository.findAll();
    res.json({ success: true, data: allDishes });
  } catch (error) {
    res.json({ success: false, message: `Error fetching dishes ${error.message}` });
  }
};

//food by id

const getDishById = async (req, res) => {
  try {
    const food = await foodRepository.findById(req.params.id);
    res.json({ success: true, data: food });
  } catch (error) {
    res.json({ success: false, message: `Error fetching dish ${error.message}` });
  }
};

//food by id
const getAllDishByRestaurantId = async (req, res) => {
  try {
    const food = await foodRepository.findByRestaurantId(req.params.id);
    res.json({ success: true, data: food });
  } catch (error) {
    res.json({ success: false, message: `Error fetching dishes by restaurant ${error.message}` });
  }
};

// remove food item
const deleteDish = async (req, res) => {
  try {
    const food = await foodRepository.findById(req.params.id);
    await cloudinary.uploader.destroy(food.image)
    await foodRepository.deleteById(req.params.id);
    res.json({ success: true, message: "Dish Removed" });
  } catch (error) {
    res.json({ success: false, message: `Error removing dish ${error.message}` });
  }
};

// Update restaurant
const updateDish = async (req, res) => {
  try {
    const imageURL = req.file?.path;
    let formData = req.body;
    if (imageURL != null) {
      formData = {
        ...formData,
        image: imageURL,
      }
    }

    const dish = await foodRepository.updateById(
      req.params.id,
      formData,
    );
    if (!dish) {
      return res.json({ success: false, message: "Dish not found" });
    }
    res.json({ success: true, message: "Dish updated", data: dish });
  } catch (error) {
    res.json({ success: false, message: `Error updating dish ${error.message}` });
  }
};

export { createDish, getAllDish, deleteDish, getDishById, getAllDishByRestaurantId, updateDish };
