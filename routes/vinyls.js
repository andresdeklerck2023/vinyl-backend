const router = require("express").Router();
const Vinyl = require("../models/Vinyl");

// GET
router.get("/", async (req, res) => {
  try {
    const vinyls = await Vinyl.find();
    res.json(vinyls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD
router.post("/", async (req, res) => {
  try {
    const vinyl = await Vinyl.create(req.body); 
    res.json(vinyl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DEL
router.delete("/:id", async (req, res) => {
  try {
    await Vinyl.findByIdAndDelete(req.params.id);
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Vinyl.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
