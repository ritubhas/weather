
// Step 1: Define cities array
let cities = [
  {
    name: "Benbrook, TX",
    latitude: 32.6732,
    longitude: -97.4606,
  },
  {
    name: "Miami, FL",
    latitude: 25.758844,
    longitude: -80.188728
  },
  {
    name: "New York, NY",
    latitude: 40.731631,
    longitude: -74.005981,
  },
  {
    name: "Las Vegas, NV",
    latitude: 36.182547,
    longitude: -115.142056,
  },
  {
    name: "Grand Rapids, MI",
    latitude: 42.957836,
    longitude: -85.660092,
  },
  {
    name: "San Antonio, TX",
    latitude: 29.450993,
    longitude: -98.552896,
  },
  {
    name: "New Orleans, LA",
    latitude: 29.941305,
    longitude: -90.083081,
  },
  // Add more cities here
];


    // Step 2: Load dropdown list and attach event handler
    const cityDropdown = document.getElementById('cityDropdown');
    const weatherTable = document.getElementById('weatherTable');

    cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city.name;
      option.text = city.name;
      cityDropdown.appendChild(option);
    });

    cityDropdown.addEventListener('change', function() {
        const selectedCityName = this.value;
        const selectedCity = cities.find(city => city.name === selectedCityName);
        if (selectedCity) {
          const { latitude, longitude } = selectedCity;
          const stationLookupUrl = `https://api.weather.gov/points/${latitude},${longitude}`;
          fetch(stationLookupUrl)
            .then(response => response.json())
            .then(data => {
              const forecastUrl = data.properties.forecast;
              getWeather(forecastUrl);
            })
            .catch(error => console.error(error));
        }
      });

    function getWeather(forecastUrl) {
      fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
          const forecastArray = data.properties.periods;
          displayWeather(forecastArray);
        })
        .catch(error => console.error(error));
    }

    function displayWeather(forecastArray) {
        const weatherTableBody = document.querySelector('#weatherTable tbody');
        weatherTableBody.innerHTML = ''; // Clear previous table rows
      
        forecastArray.forEach(forecast => {
          const row = weatherTableBody.insertRow();
          row.insertCell().textContent = forecast.name;
          row.insertCell().textContent = `Temperature ${forecast.temperature} ${forecast.temperatureUnit}`;
          row.insertCell().textContent = `Winds ${forecast.windDirection || 'N'} ${forecast.windSpeed || 'Unknown'}`;
          row.insertCell().textContent = forecast.shortForecast;
        });
      }
      



