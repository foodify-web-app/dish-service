import foodModel from "../models/foodModel.js";

class FoodRepository {
    // Create a new food item
    async create(foodData) {
        try {
            const food = new foodModel(foodData);
            return await food.save();
        } catch (error) {
            throw new Error(`Error creating food item: ${error.message}`);
        }
    }

    // Create multiple food items
    async createMany(foodItemsArray) {
        try {
            return await foodModel.insertMany(foodItemsArray);
        } catch (error) {
            throw new Error(`Error creating food items: ${error.message}`);
        }
    }

    // Find food item by ID
    async findById(id) {
        try {
            return await foodModel.findById(id);
        } catch (error) {
            throw new Error(`Error finding food item: ${error.message}`);
        }
    }

    // Find all food items
    async findAll(filter = {}, options = {}) {
        try {
            const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;
            const skip = (page - 1) * limit;

            const items = await foodModel
                .find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            const total = await foodModel.countDocuments(filter);

            return {
                items,
                total,
                page,
                pages: Math.ceil(total / limit)
            };
        } catch (error) {
            throw new Error(`Error finding food items: ${error.message}`);
        }
    }

    // Find all food items for a specific restaurant
    async findByRestaurantId(restaurantId, options = {}) {
        try {
            return await this.findAll({ restaurantId }, options);
        } catch (error) {
            throw new Error(`Error finding food items by restaurant ID: ${error.message}`);
        }
    }

    // Find food items by category
    async findByCategory(category, options = {}) {
        try {
            return await this.findAll({ category }, options);
        } catch (error) {
            throw new Error(`Error finding food items by category: ${error.message}`);
        }
    }

    // Find food items by restaurant and category
    async findByRestaurantAndCategory(restaurantId, category, options = {}) {
        try {
            return await this.findAll({ restaurantId, category }, options);
        } catch (error) {
            throw new Error(`Error finding food items by restaurant and category: ${error.message}`);
        }
    }

    // Find food items by availability status
    async findByAvailability(isAvailable, filter = {}, options = {}) {
        try {
            return await this.findAll({ ...filter, isAvailable }, options);
        } catch (error) {
            throw new Error(`Error finding food items by availability: ${error.message}`);
        }
    }

    // Find in-stock items
    async findInStock(filter = {}, options = {}) {
        try {
            return await this.findByAvailability("in-stock", filter, options);
        } catch (error) {
            throw new Error(`Error finding in-stock food items: ${error.message}`);
        }
    }

    // Find out-of-stock items
    async findOutOfStock(filter = {}, options = {}) {
        try {
            return await this.findByAvailability("out-of-stock", filter, options);
        } catch (error) {
            throw new Error(`Error finding out-of-stock food items: ${error.message}`);
        }
    }

    // Find veg food items
    async findVeg(filter = {}, options = {}) {
        try {
            return await this.findAll({ ...filter, veg: true }, options);
        } catch (error) {
            throw new Error(`Error finding veg food items: ${error.message}`);
        }
    }

    // Find non-veg food items
    async findNonVeg(filter = {}, options = {}) {
        try {
            return await this.findAll({ ...filter, veg: false }, options);
        } catch (error) {
            throw new Error(`Error finding non-veg food items: ${error.message}`);
        }
    }

    // Search food items by name or description
    async search(searchQuery, filter = {}, options = {}) {
        try {
            const searchFilter = {
                ...filter,
                $or: [
                    { name: { $regex: searchQuery, $options: "i" } },
                    { description: { $regex: searchQuery, $options: "i" } }
                ]
            };
            return await this.findAll(searchFilter, options);
        } catch (error) {
            throw new Error(`Error searching food items: ${error.message}`);
        }
    }

    // Find food items by price range
    async findByPriceRange(minPrice, maxPrice, filter = {}, options = {}) {
        try {
            const priceFilter = {
                ...filter,
                price: { $gte: minPrice, $lte: maxPrice }
            };
            return await this.findAll(priceFilter, options);
        } catch (error) {
            throw new Error(`Error finding food items by price range: ${error.message}`);
        }
    }

    // Find food items by minimum rating
    async findByMinRating(minRating, filter = {}, options = {}) {
        try {
            return await this.findAll({ ...filter, rating: { $gte: minRating } }, options);
        } catch (error) {
            throw new Error(`Error finding food items by rating: ${error.message}`);
        }
    }

    // Update food item by ID
    async updateById(id, updateData) {
        try {
            return await foodModel.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw new Error(`Error updating food item: ${error.message}`);
        }
    }

    // Update availability status
    async updateAvailability(id, isAvailable) {
        try {
            return await this.updateById(id, { isAvailable });
        } catch (error) {
            throw new Error(`Error updating food availability: ${error.message}`);
        }
    }

    // Mark item as in-stock
    async markAsInStock(id) {
        try {
            return await this.updateAvailability(id, "in-stock");
        } catch (error) {
            throw new Error(`Error marking as in-stock: ${error.message}`);
        }
    }

    // Mark item as out-of-stock
    async markAsOutOfStock(id) {
        try {
            return await this.updateAvailability(id, "out-of-stock");
        } catch (error) {
            throw new Error(`Error marking as out-of-stock: ${error.message}`);
        }
    }

    // Update rating
    async updateRating(id, rating) {
        try {
            return await this.updateById(id, { rating });
        } catch (error) {
            throw new Error(`Error updating food rating: ${error.message}`);
        }
    }

    // Update price
    async updatePrice(id, price) {
        try {
            return await this.updateById(id, { price });
        } catch (error) {
            throw new Error(`Error updating food price: ${error.message}`);
        }
    }

    // Delete food item by ID
    async deleteById(id) {
        try {
            return await foodModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error deleting food item: ${error.message}`);
        }
    }

    // Delete all food items for a restaurant
    async deleteByRestaurantId(restaurantId) {
        try {
            return await foodModel.deleteMany({ restaurantId });
        } catch (error) {
            throw new Error(`Error deleting food items by restaurant: ${error.message}`);
        }
    }

    // Get all unique categories
    async getCategories() {
        try {
            return await foodModel.distinct("category");
        } catch (error) {
            throw new Error(`Error getting categories: ${error.message}`);
        }
    }

    // Get categories for a specific restaurant
    async getCategoriesByRestaurant(restaurantId) {
        try {
            return await foodModel.distinct("category", { restaurantId });
        } catch (error) {
            throw new Error(`Error getting restaurant categories: ${error.message}`);
        }
    }

    // Get statistics for a restaurant
    async getRestaurantStats(restaurantId) {
        try {
            const total = await foodModel.countDocuments({ restaurantId });
            const inStock = await foodModel.countDocuments({ restaurantId, isAvailable: "in-stock" });
            const outOfStock = await foodModel.countDocuments({ restaurantId, isAvailable: "out-of-stock" });
            const veg = await foodModel.countDocuments({ restaurantId, veg: true });
            const nonVeg = await foodModel.countDocuments({ restaurantId, veg: false });

            const avgRating = await foodModel.aggregate([
                { $match: { restaurantId } },
                { $group: { _id: null, avgRating: { $avg: "$rating" } } }
            ]);

            const priceRange = await foodModel.aggregate([
                { $match: { restaurantId } },
                {
                    $group: {
                        _id: null,
                        minPrice: { $min: "$price" },
                        maxPrice: { $max: "$price" },
                        avgPrice: { $avg: "$price" }
                    }
                }
            ]);

            return {
                total,
                inStock,
                outOfStock,
                veg,
                nonVeg,
                avgRating: avgRating.length > 0 ? avgRating[0].avgRating : 0,
                priceRange: priceRange.length > 0 ? priceRange[0] : { minPrice: 0, maxPrice: 0, avgPrice: 0 }
            };
        } catch (error) {
            throw new Error(`Error getting restaurant stats: ${error.message}`);
        }
    }

    // Get top rated food items
    async getTopRated(limit = 10, filter = {}) {
        try {
            return await foodModel
                .find(filter)
                .sort({ rating: -1 })
                .limit(limit);
        } catch (error) {
            throw new Error(`Error getting top rated items: ${error.message}`);
        }
    }

    // Count food items by restaurant
    async countByRestaurantId(restaurantId) {
        try {
            return await foodModel.countDocuments({ restaurantId });
        } catch (error) {
            throw new Error(`Error counting food items: ${error.message}`);
        }
    }

    // Bulk update availability for restaurant
    async bulkUpdateAvailability(restaurantId, isAvailable) {
        try {
            return await foodModel.updateMany(
                { restaurantId },
                { isAvailable },
                { runValidators: true }
            );
        } catch (error) {
            throw new Error(`Error bulk updating availability: ${error.message}`);
        }
    }

    // Get items by multiple filters (advanced search)
    async advancedSearch(filters = {}, options = {}) {
        try {
            const {
                restaurantId,
                category,
                veg,
                minPrice,
                maxPrice,
                minRating,
                isAvailable,
                searchQuery
            } = filters;

            let query = {};

            if (restaurantId) query.restaurantId = restaurantId;
            if (category) query.category = category;
            if (veg !== undefined) query.veg = veg;
            if (isAvailable) query.isAvailable = isAvailable;
            if (minRating) query.rating = { $gte: minRating };

            if (minPrice !== undefined || maxPrice !== undefined) {
                query.price = {};
                if (minPrice !== undefined) query.price.$gte = minPrice;
                if (maxPrice !== undefined) query.price.$lte = maxPrice;
            }

            if (searchQuery) {
                query.$or = [
                    { name: { $regex: searchQuery, $options: "i" } },
                    { description: { $regex: searchQuery, $options: "i" } }
                ];
            }

            return await this.findAll(query, options);
        } catch (error) {
            throw new Error(`Error in advanced search: ${error.message}`);
        }
    }
}

export default new FoodRepository();