const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection (local)
mongoose.connect("mongodb://127.0.0.1:27017/foodgramDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
    name: String,
    phone: String
});

const User = mongoose.model("User", userSchema);

// API Route
app.post("/signin", async (req, res) => {
    const { name, phone } = req.body;
    try {
        const newUser = new User({ name, phone });
        await newUser.save();
        console.log("✔ User saved:", newUser);
        res.status(200).json({ message: "User signed in successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
