require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "../public")));

// your API calls

// example API call
app.get("/apod", async (req, res) => {
  try {
    let image = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ image });
  } catch (err) {
    console.log("error:", err);
  }
});

app.get("/rovers", async (req, res) => {
  try {
    let roverData = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send({ roverData });
  } catch (err) {
    console.log("error:", err);
  }
});

app.get("/rovers/:rover_name", async (req, res) => {
  const { rover_name } = req.params;
  try {
    let data = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover_name}/latest_photos?api_key=${process.env.API_KEY}`
    ).then((res) => res.json());
    res.send(data);
  } catch (err) {
    console.log("error:", err);
  }
});

// app.get('/rovers/:rover_name/:max_sol/latest_photos', async (req,res) => {
//     const {rover_name} = req.params;
//     const {max_sol} = req.params;
//     try {
//         const latestPhotosResponse = await fetch (`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover_name}/photos?sol=${max_sol}&api_key=${process.env.API_KEY}`);
//         const latestPhotos = await latestPhotosResponse.json();
//         res.send(latestPhotos);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({error: 'Unable to retrieve latest photos'});
//     }
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
