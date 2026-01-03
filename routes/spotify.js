const express = require("express");
const axios = require("axios");
const router = express.Router();

// GET /spotify/token
router.get("/token", async (req, res) => {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({ error: "Spotify Client ID/Secret not set in .env" });
    }

    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          "Authorization": "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json({ access_token: tokenResponse.data.access_token });
  } catch (err) {
    console.error("Spotify token error:", err.response?.data || err.message);
    res.status(500).json({ error: "Could not get Spotify token" });
  }
});

module.exports = router;
