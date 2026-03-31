const express = require("express");

const router = express.Router();

let expiresAt = null;
let token = null;
let data;

router.get("/", async (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const base64 = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  if (Date.now() > expiresAt) {
    console.log("Rquest for new token");

    //Get spotify token
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${base64}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      });

      data = await response.json();
      token = data.access_token;
      expiresIn = data.expires_in;
      //Get the expiration time of token
      expiresAt = Date.now() + (expiresIn - 60) * 1000;

      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error geting Spotfy token" });
    }
  } else {
    console.log("Token works");
    res.json(data);
  }
});

module.exports = router;
