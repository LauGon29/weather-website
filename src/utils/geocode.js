const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibGF1Z29uIiwiYSI6ImNrdWx5eTcxNzE2dmgyb3A4cHZvamU3bnYifQ.fVw-x5dS-Izc9DERHZomzw&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geolocation service.', undefined);
        } else if (!body.features.length) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const { features } = body
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            });
        }
    });
};

module.exports = geocode;