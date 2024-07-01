function getWeather() {
    const apiKey = '9d33630a5cce4194a6b140510230808';
    const city = document.getElementById('city').value;

    if (city === '') {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city
    }&aqi=no`;
    const forecastWeatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city
    }&days=3&aqi=no&alerts=no`;

    fetch(currentWeatherUrl)
        .then((response) => response.json())
        .then((data) => {
            const currentWeather = data.current;
            const location = data.location;
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
function 