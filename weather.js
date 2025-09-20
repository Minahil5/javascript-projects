const apikey = "cc4c09cfd67e311c947e84298f28ecec";


const weatherDataE1 = document.getElementById("weather-data");
const cityInputE1 = document.getElementById("city-input");
const formE1 = document.querySelector("form");

formE1.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputE1.value.trim();
  if (cityValue !== "") {
    getWeatherData(cityValue);
  }
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const details = [
      `Feels Like: ${Math.round(data.main.feels_like)}℃`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed: ${data.wind.speed} m/s`,
    ];

    weatherDataE1.querySelector(".icon").innerHTML =
      `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon">`;

    weatherDataE1.querySelector(".temperature").textContent = `${temperature}℃`;
    weatherDataE1.querySelector(".description").textContent = description;
    weatherDataE1.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataE1.querySelector(".icon").innerHTML = "";
    weatherDataE1.querySelector(".temperature").textContent = "";
    weatherDataE1.querySelector(".description").textContent =
      "❌ City not found. Try again.";
    weatherDataE1.querySelector(".details").innerHTML = "";
  }
}
