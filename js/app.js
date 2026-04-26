$(document).ready(function () {

  const apiKey = "133b82daad144479a49221438262404";

  let currentCity = "Buenos Aires";

  // 🔍 Buscar con botón
  $("#searchBtn").click(function () {
    searchCity();
  });

  // ⌨️ Buscar con ENTER
  $("#cityInput").keypress(function (e) {
    if (e.which === 13) {
      searchCity();
    }
  });

  function searchCity() {
    const city = $("#cityInput").val().trim();
    if (city !== "") {
      getWeather(city);
    }
  }

  // 🌍 Geolocalización automática
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCoords(lat, lon);
    });
  }

  // 🌡️ CLIMA POR CIUDAD
  function getWeather(city) {

    showLoader();

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=es`;

    $.ajax({
      url: url,
      method: "GET",
      success: function (data) {

        currentCity = data.location.name;

        displayWeather(data);

        getForecast(currentCity);
      },
      error: function () {
        showError();
      }
    });
  }

  // 🌍 CLIMA POR COORDENADAS
  function getWeatherByCoords(lat, lon) {

    showLoader();

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&lang=es`;

    $.ajax({
      url: url,
      method: "GET",
      success: function (data) {

        currentCity = data.location.name;

        displayWeather(data);

        getForecast(currentCity);
      }
    });
  }

  // 📊 MOSTRAR CLIMA ACTUAL
  function displayWeather(data) {

    hideLoader();
    hideError();

    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;

    $("#cityName").text(data.location.name);
    $("#temperature").text(`${data.current.temp_c}°C`);
    $("#description").text(condition);

    $("#weatherIcon").attr("src", "https:" + icon);

    $("#emoji").text(getWeatherEmoji(condition));

    $(".weather-card").removeClass("hidden");

    changeBackground(condition);

    if (icon.includes("night")) {
      $("body").css("background", "linear-gradient(to right, #141e30, #243b55)");
    }
  }

    function getForecast(city) {

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&lang=es`;

    $.ajax({
      url: url,
      method: "GET",
      success: function (data) {

        const days = data.forecast.forecastday;

        const today = days[0];

        $("#tempMax").text(`⬆️ Máx: ${today.day.maxtemp_c}°C`);
        $("#tempMin").text(`⬇️ Mín: ${today.day.mintemp_c}°C`);

        renderForecast(days);
      }
    });
  }

  function formatDate(dateString) {

    const parts = dateString.split("-");
    const date = new Date(parts[0], parts[1] - 1, parts[2]);

    const options = {
      weekday: "long",
      day: "numeric",
      month: "long"
    };

    let formatted = date.toLocaleDateString("es-AR", options);

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  function renderForecast(days) {

    $("#forecastContainer").empty();

    days.forEach(day => {

      const date = formatDate(day.date);
      const min = day.day.mintemp_c;
      const max = day.day.maxtemp_c;
      const text = day.day.condition.text;
      const icon = "https:" + day.day.condition.icon;

      $("#forecastContainer").append(`
        <div class="forecast-card">
          <p style="color:yellow;text-transform:capitalize;">${date}</p>
          <img src="${icon}" width="50">
          <p>${getWeatherEmoji(text)}</p>

          <p style="font-size: 14px;font-weight:bold;color:gray">
            ⬆️ ${max}°C
          </p>
          <p style="font-size: 14px; font-weight:bold;color:gray">
            ⬇️ ${min}°C
          </p>
        </div>
      `);
    });

    $(".forecast").removeClass("hidden");
  }

  function getWeatherEmoji(condition) {

    const c = condition.toLowerCase();

    if (c.includes("sun") || c.includes("clear")) return "☀️";
    if (c.includes("cloud")) return "☁️";
    if (c.includes("rain")) return "🌧️";
    if (c.includes("snow")) return "❄️";
    if (c.includes("storm") || c.includes("thunder")) return "⛈️";

    return "";
  }

  function showError() {
    hideLoader();
    $("#errorMsg").removeClass("hidden");
  }

  function hideError() {
    $("#errorMsg").addClass("hidden");
  }

  function showLoader() {
    $(".loader").removeClass("hidden");
    $(".weather-card").addClass("hidden");
    $(".forecast").addClass("hidden");
    $("#errorMsg").addClass("hidden");
  }

  function hideLoader() {
    $(".loader").addClass("hidden");
  }

  function changeBackground(weather) {

    $(".rain").addClass("hidden");

    const w = weather.toLowerCase();

    if (w.includes("sun") || w.includes("clear")) {
      $("body").css("background", "linear-gradient(to right, #fceabb, #f8b500)");
    } 
    else if (w.includes("cloud")) {
      $("body").css("background", "linear-gradient(to right, #bdc3c7, #2c3e50)");
    } 
    else if (w.includes("rain")) {
      $("body").css("background", "linear-gradient(to right, #4b79a1, #283e51)");
      $(".rain").removeClass("hidden");
    } 
    else {
      $("body").css("background", "linear-gradient(to right, #4facfe, #00f2fe)");
    }
  }

    // ⭐ FAVORITOS
  $("#saveCity").click(function () {

    if (!currentCity) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.includes(currentCity)) {
      favorites.push(currentCity);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      renderFavorites();
    }
  });

  // 📌 RENDER FAVORITOS (MEJORADO con data-city)
  function renderFavorites() {

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    $("#favoritesList").empty();

    favorites.forEach(city => {
      $("#favoritesList").append(`
        <li data-city="${city}">
          ${city} <span class="delete-fav">❌</span>
        </li>
      `);
    });
  }

  // 🔁 CLICK EN FAVORITO (usa data-city)
  $(document).on("click", "#favoritesList li", function () {
    const city = $(this).data("city");
    getWeather(city);
  });

  // ❌ ELIMINAR FAVORITO (ARREGLADO)
  $(document).on("click", ".delete-fav", function (e) {

    e.stopPropagation(); // evita que se active el click del li

    const city = $(this).parent().data("city");

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(fav => fav !== city);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    renderFavorites();
  });

  renderFavorites();

  // 🌸 TEMPORADAS
  function getSeason() {

    const month = new Date().getMonth() + 1;

    if (month >= 12 || month <= 2) return "summer";
    if (month >= 3 && month <= 5) return "autumn";
    if (month >= 6 && month <= 8) return "winter";
    return "spring";
  }

  function renderSeason() {

    const layer = $("#seasonLayer");
    layer.empty();

    const season = getSeason();

    let icons = [];
    let className = "";

    if (season === "autumn") {
      icons = ["🍂", "🍁"];
      className = "leaf";
    }

    if (season === "winter") {
      icons = ["❄️"];
      className = "snow";
    }

    if (season === "spring") {
      icons = ["🌸", "🌼", "🪻", "🏵️"];
      className = "flower";
    }

    if (season === "summer") {
      icons = ["☀️"];
      className = "sun-dot";
    }

    for (let i = 0; i < 25; i++) {

      const icon = icons[Math.floor(Math.random() * icons.length)];

      const el = $("<div></div>")
        .addClass(className)
        .text(icon)
        .css({
          left: Math.random() * 100 + "vw",
          animationDuration: (5 + Math.random() * 5) + "s",
          fontSize: (10 + Math.random() * 20) + "px",
          opacity: Math.random()
        });

      layer.append(el);
    }
  }

  renderSeason();

});
