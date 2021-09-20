
var KEY = '29c3f9c1b0532de1b3b3eb5de13be899';
var textInput = $('#search-box');
var fiveDayEl = $(".days");
var currentDate = moment().format('M/D/YYYY');

var cities = {};

var createCityList = function(city) {
    var liEl = $("<li>").addClass("list-group-item").text(city);
    $(".history").append(liEl);
};

var loadCities = function () {
    cities = JSON.parse(localStorage.getItem("cities-list"));

    if (!cities) {
        cities = {
            city: []
        };
    }
    $('.history').html('');
    for (var i=0;i<cities.city.length;i++) {
        createCityList(cities.city[i]);
    }
}

var saveCity = function() {
  localStorage.setItem("cities-list", JSON.stringify(cities));
};

// create daily element
var dailyElement = function(cityName, weatherIcon, cityTemp, windSpeed, cityHumidity) {
    $('#city-date').html(`<h2>${cityName} (${currentDate})</h2>`);
    $('#daily-icon').html(`<h2><img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="weather icon" /></h2>`);
    $('#city-temp').html(`<p>Temp: ${cityTemp} F</p>`);
    $('#city-wind').html(`<p>Wind: ${windSpeed} MPH</p>`);
    $('#city-humidity').html(`<p>Humidity: ${cityHumidity} %</p>`);
};

// create 5 day Element 
var fiveDayElement = function(data) {
    fiveDayEl.html("");
    var index = 3;
    for (var i=0;i<5;i++) {
        var card = $("<div>").addClass("col card text-white bg-dark m-2");

        card.append(
            $("<div>").html(`<h5>${data.list[index].dt_txt}</h5>`)
        );
        card.append(
            $("<div>").html(`<img src="http://openweathermap.org/img/wn/${data.list[index].weather[0].icon}.png" alt="weather icon" />`)
        );
        card.append(
            $("<div>").html(`<p>Temp: ${data.list[index].main.temp} F</p>`)
        );
        card.append(
            $("<div>").html(`<p>Wind: ${data.list[index].wind.speed} MPH</p>`)
        );
        card.append(
            $("<div>").html(`<p>Humidity: ${data.list[index].main.humidity} %</p>`)
        );
        fiveDayEl.append(card);
        index+=8;
    }
};

// button click that triggers the api calls for the daily and 5 day
$('#search-button').on('click', function() {
    var cityName = textInput.val();

    // get the daily weather attributes
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${KEY}`).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        var cityName = data.name;
        var weatherIcon = data.weather[0].icon;
        var weather = data.main.temp;
        var windSpeed = data.wind.speed;
        var cityHumidity = data.main.humidity;

        dailyElement(cityName, weatherIcon, weather, windSpeed, cityHumidity);
    });
    
    // get the 5 day weather forecast 
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${KEY}`).then(function(response) {
        return response.json();
    }).then(function(data) {
        fiveDayElement(data);
    });

    cities.city.push(cityName);
    saveCity();
    loadCities();
    textInput.val("");
});

loadCities();