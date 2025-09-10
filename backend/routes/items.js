const express = require("express");
const router = express.Router();
const itemControllers = require("../controllers/itemController");
const authMiddleware = require("../middleware/auth");

// ======================
// items routes
// ======================

// public listing with filter
router.get("/", itemControllers.getItems);
router.get("/:id", itemControllers.getItemById);

// protected routes for create/update/delete
router.post("/", authMiddleware, itemControllers.createItem);
router.put("/:id", authMiddleware, itemControllers.updateItem);
router.delete("/:id", authMiddleware, itemControllers.deleteItem);

module.exports = router;
