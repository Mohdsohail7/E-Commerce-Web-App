const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const cartControllers = require("../controllers/cartController");

// ======================
// cart routes
// ======================

// all cart endpoints are protected and persist per-user
router.get("/",authMiddleware, cartControllers.getCart);
router.post("/", authMiddleware, cartControllers.addToCart);
router.put("/", authMiddleware, cartControllers.updateCartItem);
router.delete("/:itemId", authMiddleware, cartControllers.removeFromCart);
router.delete("/", authMiddleware, cartControllers.clearCart);

module.exports = router;