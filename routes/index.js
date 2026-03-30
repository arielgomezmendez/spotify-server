const express = require("express");

// Import routes
const spotifyToken = require("./spotifyToken.router");

const routerApi = (app) => {
    const router = express.Router();

    app.use("/api",router);

    router.use("/spotify-token", spotifyToken);
}

module.exports = routerApi;