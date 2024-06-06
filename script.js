const apiKey = "d3f42ed7e67ff02295795721cd1f487a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to check weather
async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (response.status === 404) {
      document.querySelector(".error p").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      // Fetching info from API and updating HTML
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
      document.querySelector(".wind").innerHTML = data.wind.speed + " kph";
      document.querySelector("#status").innerHTML = data.weather[0].main;

      switch (data.weather[0].main) {
        case "Clouds":
          weatherIcon.src = "images/cloudy-weather.png";
          document.body.style.backgroundImage = "url('images/cloudy-bg.jpg')";
          break;
        case "Clear":
          weatherIcon.src = "images/clear-weather.png";
          document.body.style.backgroundImage = "url('images/clear-bg.jpg')";
          break;
        case "Rain":
          weatherIcon.src = "images/rainy-weather.png";
          document.body.style.backgroundImage = "url('images/rainy-bg.jpg')";
          break;
        case "Drizzle":
          weatherIcon.src = "images/drizzle-weather.png";
          document.body.style.backgroundImage = "url('images/drizzle-bg.jpg')";
          break;
        case "Mist":
          weatherIcon.src = "images/mist-weather.png";
          document.body.style.backgroundImage = "url('images/mist-bg.jpg')";
          break;
        case "Dust":
          weatherIcon.src = "images/dust.png";
          document.body.style.backgroundImage = "url('images/dust-bg.jpg')";
          break;
        default:
          weatherIcon.src = "images/clear-weather.png"; // Default icon
          document.body.style.backgroundImage = "url('images/main-bg.jpg')";
          break;
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error p").style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

checkWeather(); 
