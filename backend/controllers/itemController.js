const Item = require("../models/Item");


// ======================
// create item handle
// ======================
exports.createItem = async (req, res) => {
    try {
        const { name, description, price, category, image, stock } = req.body;
        if (!name || price == null) return res.status(400).json({ message: "Name and price required"});

        const item = await Item.create({ name, description, price, category, image, stock });
        return res.status(201).json(item);
        
    } catch (error) {
        console.error("Error item creation.", error);
        return res.status(500).json({ message: "Server Error."});
    }
};

// ======================
// get items handle
// ======================
exports.getItems = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, search, sort, page = 1, limit = 20 } = req.query;
        const filter = {};
        if (category) {
            const cats = category.split(",").map(cat => cat.trim());
            filter.category = { $in: cats };
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);

        }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $option: "i" }},
                { description: { $regex: search, $option: "i" }}
            ];
        }
        let query = Item.find(filter);

        // sorting
        if (sort === "price_asc") query = query.sort({ price: 1 });
        else if (sort === "price_desc") query = query.sort({ price: -1 });
        else if (sort === "newest") query = query.sort({ createdAt: -1 });

        const skip = (Number(page) - 1) * Number(limit);
        const total = await Item.countDocuments(filter);

        const items = await query.skip(skip).limit(Number(limit));

        return res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });

    } catch (error) {
        console.error("Error get item.", error);
        return res.status(500).json({ message: "Server error"});
    }
}

// ======================
// get item by id handle
// ======================
exports.getItemById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({ message: "Id not found."});
        }
        
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: "Item not found."});
        }
        return res.status(200).json(item);

    } catch (error) {
        console.error("Error item get by id.", error);
        return res.status(500).json({ message: "Server error"});
    }
};

// ======================
// update item by id handle
// ======================
exports.updateItem = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({ message: "Id not found."});
        };
        const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found."});
        }

        return res.status(200).json(updatedItem);
    } catch (error) {
        console.error("Error update item.", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// ======================
// delete item by id handle
// ======================
exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({ message: "Id not found."});
        };
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found."});
        }
        
        return res.status(200).json({message: "Item deleted."});
    } catch (error) {
        console.error("Error delete item.", error);
        return res.status(500).json({ message: "Server error" });
    }
};

