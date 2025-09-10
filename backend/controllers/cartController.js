const Cart = require("../models/Cart");
const Item = require("../models/Item");


// ======================
// get cart handle
// ======================
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.item");
        if (!cart) return res.json({ items: [], total: 0 });

        const total = cart.items.reduce((acc, it) => acc + (it.priceAtAdd || it.item.price) * it.quantity, 0);
        return res.json({ items: cart.items, total });
    } catch (error) {
        console.error("Error get cart item.", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// ======================
// add to cart handle
// ======================
exports.addToCart = async (req, res) => {
    try {
        const { itemId, quantity = 1 } = req.body;
        if (!itemId) return res.status(400).json({ message: "itemId required."});

        const item = await Item.findById(itemId);
        if(!item) return res.status(404).json({ message: "Item not found."});

        const qty = Number(quantity);
        if (qty < 1) return res.status(400).json({ message: "Quantity must be at least 1."});

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        const existingIndex = cart.items.findIndex(i => i.item.toString() === itemId);
        if (existingIndex > -1) {
            cart.items[existingIndex].quantity += qty;
        } else {
            cart.items.push({ item: item._id, quantity: qty, priceAtAdd: item.price });
        }
        cart.updatedAt = Date.now();
        await cart.save();

        const populated = await cart.populate("items.item");
        return res.json(populated.items);

    } catch (error) {
        console.error("Error Add to cart item.", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// ======================
// update cart handle
// ======================
exports.updateCartItem = async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        if (!itemId) return res.status(400).json({ message: "itemId required."});

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ message: "Cart not found."});

        const idx = cart.items.findIndex(i => i.item.toString() === itemId);
        if (idx === -1) return res.status(404).json({ message: "Item not in cart." });

        if (quantity <= 0) {
            // remove
            cart.items.splice(idx, 1);
        } else {
            cart.items[idx].quantity = Number(quantity);
        }
        cart.updatedAt = Date.now();
        await cart.save();

        const populated = await cart.populate("items.item");
        return res.json(populated.items);
    } catch (error) {
        console.error("Error update cart item.", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// ======================
// remove cart handle
// ======================
exports.removeFromCart = async (req, res ) => {
    try {
        const { itemId } = req.params;
        if (!itemId) return res.status(400).json({ message: "itemId is missing."});
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ message: "Cart not found." });

        cart.items = cart.items.filter(i => i.item.toString() !== itemId);
        cart.updatedAt = Date.now();
        await cart.save();

        const populated = await cart.populate("items.item");
        return res.json(populated.items);

    } catch (error) {
        console.error("Error remove cart item.", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// ======================
// clear cart handle
// ======================
exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (cart) {
            cart.items = [];
            cart.updatedAt = Date.now();
            await cart.save();
        }
        return res.json({ message: "Cart cleared."});
    } catch (error) {
        console.error("Error clear cart item.", error);
        return res.status(500).json({ message: "Server error" });
    }
}