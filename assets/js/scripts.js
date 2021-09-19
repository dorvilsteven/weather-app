
var KEY = '29c3f9c1b0532de1b3b3eb5de13be899';
var textInput = $('#search-box');
var currentDate = moment().format('M/D/YYYY');

// create daily element
var dailyElement = function(cityName, weatherIcon, cityTemp, windSpeed, cityHumidity) {
    $('#city-date').html(`<h2>${cityName} (${currentDate})</h2>`);
    $('#daily-icon').html(`<h2><img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="weather icon" /></h2>`);
    $('#city-temp').html(`<p>Temp: ${cityTemp} F</p>`);
    $('#city-wind').html(`<p>Wind: ${windSpeed} MPH</p>`);
    $('#city-humidity').html(`<p>Humidity: ${cityHumidity} %</p>`);
};



// create 5 day Element 





$('#search-button').on('click', function() {
    var city = textInput.val();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${KEY}`).then(function(response) {
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

});