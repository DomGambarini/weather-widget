function getWeather() {
    const apiKey = '9d33630a5cce4194a6b140510230808';
    const city = document.getElementById('city').value;

    if (city === '') {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city
}&aqi=no`;

    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            displayWeather(data);
        })
        .catch(error => {
            console.log('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
    });
}

// Display weather function
function displayWeather(data) {
    const weatherIcon = document.getElementById('weather-icon');
    const tempDivInfo = document.getElementById('temperature-div');
    const weatherDescription = document.getElementById('weather-description');

    // Clear previous weather data
    weatherDescription.innerHTML = '';
    tempDivInfo.innerHTML = '';
    weatherIcon.style.display = 'none';

    if (data.cod === '404') {
        weatherDescription.innerHTML = `<p>${data.message}</p>`;
    } else {

        const cityName = data.location.name;
        const temperature = data.current.temp_c;
        const description = data.current.condition.text;
        const iconUrl = data.current.condition.icon;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `<p>${description}</p><p>${cityName}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherDescription.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}