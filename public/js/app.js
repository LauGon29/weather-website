console.log('Client side jabascript file is loaded');

const weatherForm = document.querySelector('form');
const searchLocation = document.getElementById('searchLocation');
const messageOne = document.getElementById('messageOne');
const messageTwo = document.getElementById('messageTwo');

const getForecastData = (locationName) => {
    return fetch(`http://localhost:3000/weather?address=${locationName}`).then((res) => {
        res.json().then((data) => {
            const { error, location, forecastData } = data;

            if (error) {
                return messageOne.textContent = error;
            }

            messageOne.textContent = `Location: ${ location }`;
            messageTwo.textContent = forecastData;

        }).catch((error) => {
            console.log(`Error: ${error}`);
        })
    });
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const locationName = searchLocation.value;

    if (!locationName.length) {
       return messageOne.textContent = 'You must provide a address to search...';
    }

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    getForecastData(locationName);
})