const express = require("express");

// Import routes
const spotifyToken = require("./spotifyToken.router");
const deezerSearch = require("./deezerSearch.router");

const routerApi = (app) => {
    const router = express.Router();

    app.use("/api",router);

    router.use("/spotify-token", spotifyToken);
    router.use("/deezer-search", deezerSearch);
}

module.exports = routerApi;
