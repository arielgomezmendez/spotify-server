const express = require("express");

const router = express.Router();

const bands = require("../data/bands");
const { generateBandOptions } = require("../utils/utils");

const normalizeText = (text) => text.toLowerCase().trim();

router.get("/", async (req, res) => {
  try {
    const randomBand = bands[Math.floor(Math.random() * bands.length)]; //Get a random band name.
    const bandOptions = generateBandOptions(randomBand); // Get the possibles bands name to select.

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
    // Filter the bands name to get the expected name.
    const expectedBand = normalizeText(randomBand);
    const tracks = data.data
      .filter((track) => {
        const hasPreview = !!track.preview;
        const artistName = normalizeText(track?.artist?.name || "");

        return hasPreview && artistName === expectedBand;
      })
      .map((track) => ({
        id: track.id,
        title: track.title,
        preview: track.preview,
        artistName: track.artist.name,
        duration: track.duration,
      }));
    res.status(200).json({
      correctBand: randomBand,
      expectedBand,
      bandOptions,
      tracks,
    });
  } catch (error) {
    console.error("Error fetching the data from Deezer: ", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;
