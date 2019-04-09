const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidHp2ZXRhbm1hcmlub3YiLCJhIjoiY2p0eWEweWN4MnJmNzRkbXM1bWloNTB1byJ9.ETsVVSqqb4cB1H79lk2MhA&limit=1`;

  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      return callback("Unable to connect to weather service");
    } else if (!body.features.length) {
      return callback("Unable to find location");
    }

    callback(undefined, {
      latitude: body.features[0].center[1],
      longitude: body.features[0].center[0],
      location: body.features[0].place_name
    });
  });
};

module.exports = geocode;
