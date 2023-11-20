var express = require("express");
var app = express();
var path = require("path");

var locationDetailsPath = path.join(__dirname, "data", "locationdetails.json");
var restaurantPhotosPath = path.join(__dirname, "data", "restaurantphotos.json");
var reviewsPath = path.join(__dirname, "data", "reviews.json");
var restaurantsPath = path.join(__dirname, "data", "restaurants.json");

var locationDetails = require(locationDetailsPath);
var restaurantPhotos = require(restaurantPhotosPath);
var reviews = require(reviewsPath);
var restaurants = require(restaurantsPath);

app.use("/api", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile("public/index.html", { root: __dirname });
});

// Get all location details
app.get("/api/locationdetails", function (req, res) {
  res.json(locationDetails);
});

// Get a specific location detail by ID
app.get("/api/locationdetails/:locationId", function (req, res) {
  const locationId = parseInt(req.params.locationId);
  const location = locationDetails.find((loc) => loc.id === locationId);
  if (!location) {
    return res.status(404).json({ error: "Location not found" });
  }
  res.json(location);
});

// Get all restaurants
app.get("/api/restaurants", function (req, res) {
  res.json(restaurants);
});

// Get all restaurant photos
app.get("/api/restaurantphotos", function (req, res) {
  res.json(restaurantPhotos);
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

// Get restaurant photos with optional locationId query parameter
app.get("/api/restaurantphotos/:locationId", function (req, res) {
  const locationId = parseInt(req.params.locationId);
  if (!isNaN(locationId)) {
    // Filter photos by locationId
    const filteredPhotos = restaurantPhotos.filter((p) => p.locationId === locationId);
    res.json(filteredPhotos);
  } else {
    // Return all photos if locationId is not a valid integer
    res.json(restaurantPhotos);
  }
});


// Get all reviews
app.get("/api/reviews", function (req, res) {
  res.json(reviews);
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

app.set("port", process.env.PORT || 8080);

console.log("Port:", app.get("port"));
app.listen(app.get("port"), function () {
  console.log("Node app is running on port", app.get("port"));
});
