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
          weatherIcon.src = "image/cloudy-weather.png";
          document.body.style.backgroundImage = "url('image/cloudy-background.jpg')";
          break;
        case "Clear":
          weatherIcon.src = "image/clear-weather.png";
          document.body.style.backgroundImage = "url('image/clear-background.jpg')";
          break;
        case "Rain":
          weatherIcon.src = "image/rainy-weather.png";
          document.body.style.backgroundImage = "url('image/rainy-background.jpg')";
          break;
        case "Drizzle":
          weatherIcon.src = "image/drizzle-weather.png";
          document.body.style.backgroundImage = "url('image/drizzle-background.jpg')";
          break;
        case "Mist":
          weatherIcon.src = "image/mist-weather.png";
          document.body.style.backgroundImage = "url('image/mist-background.jpg')";
          break;
        default:
          weatherIcon.src = "image/default-weather.png"; // Default icon
          document.body.style.backgroundImage = "url('image/default-background.jpg')";
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
