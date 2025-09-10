const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());



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
