const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


dotenv.config();

const app = express();

// middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "https://e-commerce-web-app-1zry.vercel.app",
    credentials: true
}));
app.use(express.json());


// routes
const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/items");
const cartRoutes = require("./routes/cart");

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/cart", cartRoutes);


// default route
app.get("/", (req, res) => {
    res.json({ message: "E-Commerce-backend web app is running..."});
});

const port = process.env.PORT || 4000;
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port: ${port}`);
    })
})
