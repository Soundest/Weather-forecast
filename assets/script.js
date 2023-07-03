function handleFormSubmit(event) {
    event.preventDefault();
  
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();
  
    cityInput.value = '';
  
    fetchWeatherData(city);
  }
  

  function fetchWeatherData(city) {
    const apiKey = '7ab15fde54a0413ab7c80036230307';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`; 
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        updateCurrentWeather(data.current);
        updateForecast(data.forecast);
        addToSearchHistory(city);
      })
      .catch(error => {
        console.log('Error fetching weather data:', error);
      });
  }
  
  function updateCurrentWeather(currentData) {
    // Update the city name, date, weather icon, temperature, humidity, and wind speed
  
    // Example code:
    const cityNameElement = document.getElementById('city-name');
    const dateElement = document.getElementById('date');
    const weatherIconElement = document.getElementById('weather-icon');
    const temperatureElement = document.getElementById('temperature');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');
  
    // Example usage:
    cityNameElement.textContent = currentData.location.name;
    dateElement.textContent = getCurrentDate();
    weatherIconElement.innerHTML = `<img src="${currentData.condition.icon}" alt="${currentData.condition.text}">`;
    temperatureElement.textContent = `${currentData.temp_c}°C`;
    humidityElement.textContent = `Humidity: ${currentData.humidity}%`;
    windSpeedElement.textContent = `Wind Speed: ${currentData.wind_kph} km/h`;
  }
  
  function updateForecast(forecastData) {
    const forecastElement = document.getElementById('forecast');
    forecastElement.innerHTML = '';
  
    for (let i = 0; i < 5; i++) {
      const forecastDayElement = document.createElement('div');
      forecastDayElement.classList.add('forecast-day');
  
      const forecastDayData = forecastData.forecastday[i];
  
      const dateElement = document.createElement('div');
      dateElement.classList.add('date');
      dateElement.textContent = forecastDayData.date;
      forecastDayElement.appendChild(dateElement);
  
      const weatherIconElement = document.createElement('div');
      weatherIconElement.classList.add('weather-icon');
      weatherIconElement.innerHTML = `<img src="${forecastDayData.day.condition.icon}" alt="${forecastDayData.day.condition.text}">`;
      forecastDayElement.appendChild(weatherIconElement);
  
      const temperatureElement = document.createElement('div');
      temperatureElement.classList.add('temperature');
      temperatureElement.textContent = `Temperature: ${forecastDayData.day.avgtemp_c}°C`;
      forecastDayElement.appendChild(temperatureElement);
  
      const windSpeedElement = document.createElement('div');
      windSpeedElement.classList.add('wind-speed');
      windSpeedElement.textContent = `Wind Speed: ${forecastDayData.day.maxwind_kph} km/h`;
      forecastDayElement.appendChild(windSpeedElement);
  
      const humidityElement = document.createElement('div');
      humidityElement.classList.add('humidity');
      humidityElement.textContent = `Humidity: ${forecastDayData.day.avghumidity}%`;
      forecastDayElement.appendChild(humidityElement);
  
      forecastElement.appendChild(forecastDayElement);
    }
  }
  
  
  function addToSearchHistory(city) {
    // Add the city to the search history list
  
    // Example code:
    const historyListElement = document.getElementById('history-list');
    const listItemElement = document.createElement('li');
    listItemElement.textContent = city;
  
    historyListElement.appendChild(listItemElement);
  
    listItemElement.addEventListener('click', function() {
      fetchWeatherData(city);
    });
  }
  
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', handleFormSubmit);
  
  function getCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString(undefined, options);
  }