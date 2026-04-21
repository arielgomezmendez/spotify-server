const express = require("express");

const router = express.Router();

const bands = require("../data/bands");

router.get("/", async (req, res) => {
  try {
    const randomBand = bands[Math.floor(Math.random() * bands.length)];
    const response = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(randomBand)}`,
    );

    //Handle status
    if (!response.ok) {
      return res.status(502).json({ error: "Error calling Deezer API" });
    }
    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      return res.status(500).json({ error: "Invalid response from Deezer" });
    }
    //Filter the tracks with preview prop and get a new clean array of tracks.
    const tracks = data.data
      .filter((track) => track.preview)
      .map((track) => ({
        id: track?.id,
        title: track?.title,
        preview: track?.preview || null,
        artistName: track?.artist?.name,
        duration: track?.duration,
      }));

    res.status(200).json(tracks);
  } catch (error) {
    console.error("Error fetching the data from Deezer");
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;
