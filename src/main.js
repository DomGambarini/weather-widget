function getWeather() {
    const apiKey = '9d33630a5cce4194a6b140510230808';
    const city = document.getElementById('city').value;

    if (city === '') {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city
}&aqi=no`;
    const forecastWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city
}&aqi=no&alerts=no`;

    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            displayWeather(data);
        })
        .catch(error => {
            console.log('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
    });

    fetch(forecastWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.log('Error fetching hourly forecast weather data:', error);
            alert('Error fetching hourly forecast weather data. Please try again.');
    });
}

// Display weather function
function displayWeather(data) {
    const weatherIcon = document.getElementById('weather-icon');
    const tempDivInfo = document.getElementById('temperature-div');
    const weatherDescription = document.getElementById('weather-description');
    const displayHourlyForecast = document.getElementById('hourly-forecast');

    // Clear previous weather data
    weatherDescription.innerHTML = '';
    tempDivInfo.innerHTML = '';
    displayHourlyForecast.innerHTML = '';

    // weatherIcon.src = data.current.condition.icon;
    // temperature.innerHTML = `${data.current.temp - 273.5}°C`;
    // weatherDescription.innerHTML = data.current.condition.text;

    if (data.cod === '404') {
        weatherDescription.innerHTML = `<p>${data.message}</p>`;
    } else {

        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const iconUrl = `https://www.weatherapi.com//img/wn/${icon}.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const descriptionHTML = `<p>${description}</p>` `<p>${cityName}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherDescription.innerHTML = descriptionHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}


function displayHourlyForecast(hourlydata) {
    const hourlyForecast = document.getElementById('hourly-forecast');
    const next24Hours = hourlydata.slice(0, 8);

    next24Hours.forEach(item => {
        const date = new Date(hour.dt * 1000);
        const hours = date.getHours();
        const icon = hour.weather[0].icon;
        const temp = Math.round(hour.main.temp - 273.15);

        const iconUrl = `https://www.weatherapi.com//img/wn/${icon}.png`;
        const html = `
            <div class="hourly-forecast-item">
                <p>${hours}:00</p>
                <img src="${iconUrl}" alt="weather icon">
                <p>${temp}°C</p>
            </div>
        `;

        hourlyForecast.innerHTML += html;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}