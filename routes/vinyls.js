const router = require("express").Router();
const Vinyl = require("../models/Vinyl");

// Haal alle vinyls
router.get("/", async (req, res) => {
  try {
    const vinyls = await Vinyl.find(); // nu correct
    res.json(vinyls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Voeg vinyl toe
router.post("/", async (req, res) => {
  try {
    const vinyl = await Vinyl.create(req.body); // nu correct
    res.json(vinyl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verwijder vinyl
router.delete("/:id", async (req, res) => {
  try {
    await Vinyl.findByIdAndDelete(req.params.id);
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update vinyl
router.put("/:id", async (req, res) => {
  try {
    const updated = await Vinyl.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
