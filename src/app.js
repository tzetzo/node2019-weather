const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const port = process.env.PORT || 3000;

//setup handlebars engine & views location
app.set("view engine", "hbs"); //https://expressjs.com/en/4x/api.html#app
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

//setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Tzvetan Marinov" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Tzvetan", name: "Tzvetan Marinov" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "Tzvetan Marinov"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({ forecast: forecastData, address: location });
      });
    }
  );
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({ error: "You must provide a search term" });
//   }
//   console.log(req.query);
//   res.send({ products: [] });
// });

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Tzvetan",
    error: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Tzvetan",
    error: "Page not found"
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
