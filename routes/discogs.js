// backend/routes/discogs.js
const router = require("express").Router();
const axios = require("axios");

/**
 * Search endpoint: zoekt op titel+artist en geeft belangrijkste fields terug,
 * incl. release id en public url (uri).
 */
router.get("/search", async (req, res) => {
  const { title, artist } = req.query;

  if (!title || !artist) {
    return res.status(400).json({ error: "title en artist vereist" });
  }

  try {
    const token = process.env.DISCOGS_TOKEN;
    const query = `${artist} ${title}`; // <— BELANGRIJK

    const response = await axios.get("https://api.discogs.com/database/search", {
      params: { 
        q: query,
        type: "release" 
      },
      headers: { 
        Authorization: `Discogs token=${token}`,
        "User-Agent": "VinylApp/1.0" 
      },
    });

    const first = response.data.results?.[0];
    if (!first) return res.json({ message: "no match" });

    // ✅ HIER TOEVOEGEN
    console.log("Discogs result:", {
      title: first.title,
      id: first.id,
      uri: first.uri,
      image: first.cover_image
    });

    res.json({
      title: first.title,
      year: first.year,
      image: first.cover_image,
      releaseId: first.id,  
      uri: first.uri,
      resource_url: first.resource_url
    });

  } catch (err) {
    console.error("Discogs search error:", err.message || err);
    res.status(500).json({ error: "Discogs search error" });
  }
});


/**
 * Tracklist endpoint: haalt release details op (inclusief tracklist)
 * request: GET /discogs/tracklist?releaseId=12345
 */
router.get("/tracklist", async (req, res) => {
  const { releaseId } = req.query;
  if (!releaseId) return res.status(400).json({ error: "releaseId is required" });

  try {
    const token = process.env.DISCOGS_TOKEN;
    // release endpoint returns tracklist
    const url = `https://api.discogs.com/releases/${releaseId}`;
    const response = await axios.get(url, {
      headers: { Authorization: `Discogs token=${token}` },
    });

    // response.data.tracklist is een array met { position, title, duration }
    res.json({
      tracklist: response.data.tracklist || [],
      title: response.data.title || "",
      year: response.data.year || ""
    });
  } catch (err) {
    console.error("Discogs tracklist error:", err.message || err.response?.data || err);
    res.status(500).json({ error: "Could not fetch tracklist" });
  }
});

module.exports = router;
