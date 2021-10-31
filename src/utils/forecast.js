const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1bc8ef9dbc90874fdafd3c42a5d008ec&query=${latitude},${longitude}`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            console.log('Unable to connect to weather service!');
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback(body.error.info, undefined);
        } else {
            const data = body.current;
            console.log(data);
            callback(undefined, `It is currently ${data.temperature} degress out. It feels like ${data.feelslike} degress out. Wind direction: ${data.wind_dir}`);
        }
    });
};

module.exports = forecast;