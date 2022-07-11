let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
document.querySelector("#current-hour").innerHTML = `${hours}:${minutes}`;
document.querySelector("#current-day").innerHTML = day;

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#temp-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  function changeDegrees(event) {
    document.querySelector("#temp").innerHTML = Math.round(
      32 + (9 * temperature) / 5
    );
  }
  let fah = document.querySelector("#fah");
  fah.addEventListener("click", changeDegrees);

  function changeToCel(event) {
    document.querySelector("#temp").innerHTML = temperature;
  }
  let cel = document.querySelector("#cel");
  cel.addEventListener("click", changeToCel);
  getForecast(response.data.coord);
}
function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `          
            <div class="col-2">
              <li class="weekday">${day}</li>
              <br />
              <li>
                <img
                  src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
                  alt="cloudy"
                  class="sky-img"
                  id="icon"
                />
              </li>
              <li class="temp-forecast">
                <span class="max-temp-forecast">28ºC </span>
                <span class="min-temp-forecast">18ºC</span>
              </li>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "7f01d534b63c11ad57094798c3cbb299";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#current-location");
button.addEventListener("click", showCurrentLocation);

searchCity("Madrid");
