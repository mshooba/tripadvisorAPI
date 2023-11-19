var express = require("express");
var app = express();
var characters = require("./data/characters.json");
var spells = require("./data/spells.json");

app.use("/api", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", function (req, res) {
  res.sendFile("public/index.html", { root: __dirname });
});

// Get all locations
app.get("/api/locationdetails", function (req, res) {
  res.json(locations);
});

// Get a specific location by ID
app.get("/api/locations/:locationId", function (req, res) {
  const locationId = parseInt(req.params.id);
  const location = locations.find((loc) => loc.id === locationId);
  if (!location) {
    return res.status(404).json({ error: "Location not found" });
  }
  res.json(location);
});

// Get all restaurants
app.get("/api/restaurants", function (req, res) {
  res.json(restaurants);
});

// Get a specific restaurant by ID
app.get("/api/restaurants/:id", function (req, res) {
  const restaurantId = parseInt(req.params.id);
  const restaurant = restaurants.find((rest) => rest.id === restaurantId);
  if (!restaurant) {
    return res.status(404).json({ error: "Restaurant not found" });
  }
  res.json(restaurant);
});

// Get a specific photo by ID
app.get("/api/restaurantphotos/:id", function (req, res) {
  const photoId = parseInt(req.params.id);
  const photo = photos.find((p) => p.id === photoId);
  if (!photo) {
    return res.status(404).json({ error: "Photo not found" });
  }
  res.json(photo);
});

// Get a specific review by ID
app.get("/api/reviews/:id", function (req, res) {
  const reviewId = parseInt(req.params.id);
  const review = reviews.find((r) => r.id === reviewId);
  if (!review) {
    return res.status(404).json({ error: "Review not found" });
  }
  res.json(review);
});



app.use(express.static("public"));

app.set("port", process.env.PORT || 8000);

console.log("Port:", app.get("port"));
app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"));
});

console.log('Current directory:', __dirname);
console.log('File path:', path.join(__dirname, 'data', 'characters.json'));

