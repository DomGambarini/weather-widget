function getWeather() {
    const apiKey = '9d33630a5cce4194a6b140510230808';
    const city = document.getElementById('city').value;

    if (city === '') {
        alert('Please enter a location');
        return;
    }

    const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    const dailyWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=yes&alerts=yes
`;


    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(dailyWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            displayDailyWeather(data.forecast.forecastday);
        })
        .catch(error => {
            console.error('Error fetching daily weather data:', error);
            alert('Error fetching daily weather data. Please try again.');
        });
}

// Display weather function
function displayWeather(data) {
    const weatherIcon = document.getElementById('weather-icon');
    const tempDivInfo = document.getElementById('temperature-div');
    const weatherDescriptionDiv = document.getElementById('weather-description');
    const dailyForecastDiv = document.getElementById('daily-forecast');


    // Clear previous weather data
    weatherDescriptionDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
    dailyForecastDiv.innerHTML = '';
    weatherIcon.style.display = 'none';

    if (data.cod === '404') {
        weatherDescriptionDiv.innerHTML = `<p>${data.message}</p>`;
    } else {

        const cityName = data.location.name;
        const temperature = data.current.temp_c;
        const description = data.current.condition.text;
        const iconUrl = data.current.condition.icon;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `<p>${description}</p><p>${cityName}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherDescriptionDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

// Display daily weather function
function displayDailyWeather(data) {
    const dailyForecastDiv = document.getElementById('daily-forecast');

    dailyForecastDiv.innerHTML = '';


    data.forEach(day => {
        const date = new Date(day.date);
        const dayOfWeek = date.toLocaleString('en-us', {
            weekday: 'long'
        });
        const maxTemp = day.day.maxtemp_c;
        const minTemp = day.day.mintemp_c;
        const description = day.day.condition.text;
        const iconUrl = day.day.condition.icon;

        const dailyForecastHTML = `
            <div class="daily-item">
                <span>${dayOfWeek}</span>
                <img src="${iconUrl}" alt="${description}">
                <span>Max: ${maxTemp}°C</span>
                <span>Min: ${minTemp}°C</span>
            </div>
        `;

        dailyForecastDiv.innerHTML += dailyForecastHTML;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}