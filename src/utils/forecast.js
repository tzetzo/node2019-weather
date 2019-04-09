const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/18942ef5c255df443880a7890ed5a39b/${latitude},${longitude}`;

  request({ url, json: true }, (err, { body } = {}) => {
    //err is used when no internet is available
    if (err) {
      return callback("Unable to connect to weather service");
    } else if (body.error) {
      return callback("Unable to find location");
    }

    callback(
      undefined,
      `It is currently ${body.currently.temperature} degrees out. There is a ${
        body.currently.precipProbability
      }% chance of rain.`
    );
  });
};

module.exports = forecast;
