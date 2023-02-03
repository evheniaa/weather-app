function currentDate(date) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[now.getDay()];
  let hour = String(now.getHours()).padStart(2, "0");
  let minute = String(now.getMinutes()).padStart(2, "0");
  let currentD = `${day} ${hour}:${minute}`;
  return currentD;
}
let date = document.querySelector("#date");
date.innerHTML = currentDate();

function showLocation(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#cityInput");
  cityElement.innerHTML = cityInput.value;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showLocation);

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let displaytemp = document.querySelector("#temper");
  displaytemp.innerHTML = `${temperature}`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let condition = document.querySelector("#condition");
  condition.innerHTML = response.data.weather[0].main;
  let changeCity = document.querySelector("#city");
  changeCity.innerHTML = response.data.name;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "b5cba407c6dd9e5ec031b787447ac932";
  let city = document.querySelector("#cityInput").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentPosition(position) {
  let apiKey = "b5cba407c6dd9e5ec031b787447ac932";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function currPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

searchForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#button-current");
currentLocationButton.addEventListener("click", currPosition);

//https://codesandbox.io/s/billowing-river-g4zg15?file=/index.html