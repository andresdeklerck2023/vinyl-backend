require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const vinylRoutes = require("./routes/vinyls");
const discogsRoutes = require("./routes/discogs");
const spotifyRoutes = require("./routes/spotify"); // ✅ import Spotify route


const app = express();

// Middleware
app.use(cors({
  origin: "*",
}));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/vinyls", vinylRoutes);
app.use("/discogs", discogsRoutes);
app.use("/spotify", spotifyRoutes);

// MongoDB connectie
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
