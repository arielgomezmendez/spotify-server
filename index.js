require("dotenv").config();

const express = require("express");
const routerApi = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173", // frontend in local
      "https://metal-bands-app-prtz.vercel.app" // frontend in production(Vercel)
    ],
  }),
);

app.get("/", (req, res) => {
  res.send("Hello world");
});

routerApi(app);

app.listen(port, () => {
  console.log("My port: ", port);
});
