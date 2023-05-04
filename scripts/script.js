function getLocation() {
    fetchWeatherData('London');
    
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(handlePosition, handlePositionError);
    // } else {
    //   console.error('Geolocation is not supported by this browser.');
    // }
  }
  
//   function handlePosition(position) {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;
//     fetchWeatherData(null, latitude, longitude);
//   }
  
//   function handlePositionError(error) {
//     console.error('Error getting location:', error);
//   }
  
  async function fetchWeatherData(location, lat = null, lon = null) {
    const apiKey = '2bd731d81cf3eb044c30ca8e6ecda9b7';
    const apiUrl = lat && lon
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      : `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    // Update HTML elements with new data
    document.getElementById('temp').textContent = `${data.main.temp.toFixed(1)}°C`;
    document.getElementById('location').textContent = data.name;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = `${(data.wind.speed * 2.237).toFixed(1)} mph`; // Convert m/s to mph
  
    // Update the weather icon
    const weatherCondition = data.weather[0].main;
    const weatherIconSrc = getWeatherIcon(weatherCondition);
    document.getElementById('weatherIcon').src = weatherIconSrc;
  }
  
  function getWeatherIcon(condition) {
    const basePath = 'images/';
  
    switch (condition) {
      case 'Clear':
        return basePath + 'day.svg';
      case 'Clouds':
        return basePath + 'cloudy-day-1.svg';
      case 'Rain':
        return basePath + 'rainy-7.svg';
      case 'Snow':
        return basePath + 'snowy-6.svg';
      case 'Thunderstorm':
        return basePath + 'thunder.svg';
      default:
        return basePath + 'cloudy-day-1.svg';
    }
  }
  
  function handleSearch() {
    const searchBar = document.querySelector('.searchBar');
    const location = searchBar.value;
  
    if (location) {
      fetchWeatherData(location);
      searchBar.value = '';
    }
  }
  
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }
  