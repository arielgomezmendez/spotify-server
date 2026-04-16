const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch("https://api.deezer.com/search?q=nevermore");
    const data = await response.json();
    res.json(data)
  } catch (error) {
    console.error("Error fetching the data from Deezer");
    throw new error;
    
  }
});

module.exports = router;
