const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const MONGO_URI =
  "mongodb://admin:admin%40123@ac-uq0pn5r-shard-00-00.00wdo3o.mongodb.net:27017,ac-uq0pn5r-shard-00-01.00wdo3o.mongodb.net:27017,ac-uq0pn5r-shard-00-02.00wdo3o.mongodb.net:27017/BloomHair?ssl=true&replicaSet=atlas-pew0e3-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String,
  quantity: {
    type: Number,
    default: 1,
  },
  ingredients: [
    {
      name: String,
      image: String,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

async function startServer() {
  try {
    console.log("Trying to connect to MongoDB...");

    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log("MongoDB connected successfully ✅");

    app.get("/", (req, res) => {
      res.send("Server is running and MongoDB is connected 🚀");
    });

    app.post("/register", async (req, res) => {
      try {
        const { name, email, phoneNumber, password } = req.body;

        const oldUser = await User.findOne({ email });
        if (oldUser) {
          return res.json({ message: "Email already exists ❌" });
        }

        const role = email === "admin@gmail.com" ? "admin" : "user";

        const user = new User({
          name,
          email,
          phoneNumber,
          password,
          role,
        });

        await user.save();

        res.json({
          message: "User registered successfully ✅",
          user,
        });
      } catch (error) {
        console.log("REGISTER ERROR:", error);
        res.status(500).json({
          message: "Server error ❌",
          error: error.message,
        });
      }
    });

    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });

        if (user) {
          res.json({ message: "Login successful ✅", user });
        } else {
          res.json({ message: "Invalid email or password ❌" });
        }
      } catch (error) {
        console.log("LOGIN ERROR:", error);
        res.status(500).json({
          message: "Server error ❌",
          error: error.message,
        });
      }
    });

    app.get("/users", async (req, res) => {
      try {
        const users = await User.find();
        res.json(users);
      } catch (error) {
        console.log("USERS ERROR:", error);
        res.status(500).json({
          message: "Error fetching users ❌",
          error: error.message,
        });
      }
    });

    app.post("/add-product", async (req, res) => {
      try {
        const {
          name,
          price,
          description,
          image,
          category,
          quantity,
          ingredients,
        } = req.body;

        const product = new Product({
          name,
          price,
          description,
          image,
          category,
          quantity,
          ingredients,
        });

        await product.save();

        res.json({
          message: "Product added successfully ✅",
          product,
        });
      } catch (error) {
        console.log("ADD PRODUCT ERROR:", error);
        res.status(500).json({
          message: "Error adding product ❌",
          error: error.message,
        });
      }
    });

    app.get("/products", async (req, res) => {
      try {
        const products = await Product.find();
        res.json(products);
      } catch (error) {
        console.log("PRODUCTS ERROR:", error);
        res.status(500).json({
          message: "Error fetching products ❌",
          error: error.message,
        });
      }
    });

    app.get("/products/:id", async (req, res) => {
      try {
        const product = await Product.findById(req.params.id);
        res.json(product);
      } catch (error) {
        console.log("PRODUCT BY ID ERROR:", error);
        res.status(500).json({
          message: "Error fetching product ❌",
          error: error.message,
        });
      }
    });
    app.put("/update-user/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { name, email, phoneNumber } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
          id,
          { name, email, phoneNumber },
          { new: true }
        );

        res.json({
          message: "Profile updated successfully ✅",
          user: updatedUser,
        });
      } catch (error) {
        res.status(500).json({
          message: "Error updating profile ❌",
          error: error.message,
        });
      }
    });

    app.put("/update-product/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const {
          name,
          price,
          description,
          image,
          category,
          quantity,
          ingredients,
        } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
          id,
          {
            name,
            price,
            description,
            image,
            category,
            quantity,
            ingredients,
          },
          { new: true }
        );

        res.json({
          message: "Product updated successfully ✅",
          product: updatedProduct,
        });
      } catch (error) {
        console.log("UPDATE PRODUCT ERROR:", error);
        res.status(500).json({
          message: "Error updating product ❌",
          error: error.message,
        });
      }
    });

    app.delete("/delete-product/:id", async (req, res) => {
      try {
        const { id } = req.params;

        await Product.findByIdAndDelete(id);

        res.json({
          message: "Product deleted successfully ✅",
        });
      } catch (error) {
        console.log("DELETE PRODUCT ERROR:", error);
        res.status(500).json({
          message: "Error deleting product ❌",
          error: error.message,
        });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("MongoDB connection error ❌");
    console.log(error);
  }
}

startServer();