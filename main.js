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


  const cityDropdown = document.getElementById("cityDropdown")
  const weatherTable = document.getElementById("weatherTable")

  cities.forEach(city=>{
    const option = document.createElement("option")
    console.log(option)
    option.value = city.name
    option.text = city.name
    cityDropdown.appendChild(option)
  })

  cityDropdown.addEventListener("change", function(){
    const selectedCityName = this.value
    const selectedCity = cities.find(city=>city.name===selectedCityName)
    console.log("Here is the selected city name:",selectedCityName)
    console.log("Here is the selected city data:",selectedCity)
    if(selectedCity){
      const {latitude, longitude} = selectedCity
      console.log("here is the long:" ,latitude)
      console.log("here is the long:", longitude)
      const stationLookupUrl = `https://api.weather.gov/points/${latitude},${longitude}`.
      fetch(stationLookupUrl)
      .then(response=>response.json())
      .then(data=>{
        console.log("Here is my data in main.js @ line 69:", data)
        const forecastUrl = data.properties.forecast
        getWeather(forecastUrl)
      }).catch(error=>console.error(error))

    }
  })

