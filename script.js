let weather = {
  apiKey: "bb83ad8b68988ad08acd4143be070663",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { country } = data.sys;
    const { icon, description } = data.weather[0];
    const { temp, humidity, pressure, temp_min, temp_max, separator, feels_like } = data.main;
    const { speed } = data.wind;
    const { all } = data.clouds;
    document.querySelector(".city").innerText = "Weather in 『" + name + " , " + country + "』";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
      document.querySelector(".separator").innerText =
      "------------------------EXTRA INFO--------------------------";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
      document.querySelector(".pressure").innerText =
      " || Pressure: " + pressure + " Pa";
      document.querySelector(".pressure").style.display = "inline";
      document.querySelector(".wind").style.display = "inline";
      
      document.querySelector(".temp_min").innerText =
      "Min temp: " + temp_min + "°C";
      document.querySelector(".cloudiness").innerText =
      "Cloudiness: " + all + "%";
      document.querySelector(".temp_max").innerText =
      " || Max temp: " + temp_max + "°C";
      document.querySelector(".feels_like").innerText =
      " || Feels like: " + feels_like + "°C";
      document.querySelector(".temp_min").style.display = "inline";
      document.querySelector(".temp_max").style.display = "inline";
      document.querySelector(".humidity").style.display = "inline";
      document.querySelector(".feels_like").style.display = "inline";

    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Kolkata");
