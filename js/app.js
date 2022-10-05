const url = "https://api.openweathermap.org/data/2.5/weather";
const appId = "a20cca282f35b96f384a5385a3120a48";

// checking for geolocation and calling form submit event // 

$(document).ready(function() {
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(function(position){
    defaultWeather(position)}) : null

    $("#form").submit(function(event, appId) { 
        search(event, appId)
    })
});

// API calls //

const defaultWeather = (position) => {
    let lat = position.coords.latitude
    let lon = position.coords.longitude

    let request
    request = $.ajax({
        url: `${url}`,
        type: "GET",
        data: { appid: `${appId}`,
                lat: `${lat}`,
                lon: `${lon}`,
                units: "metric",
            }
    })

    request.done(function(response){
        renderWeather(response)
    })

    request.fail(function (){
        defaultError()
    })
}

const renderWeather = (response) => {
    let cityName = response.name
    cityName = `${cityName}, ${response.sys.country}`
    let imgUrl = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
    let cityTemp = response.main.temp
    let cityWeather = response.weather[0].main

    $("#city-name").text(cityName)
    $("#weather-img").attr("src", imgUrl)
    $("#weather-img").attr("alt", cityWeather)
    $("#city-temp").text(`${cityTemp} C°`)
    $("#city-weather").text(cityWeather)
}

const search = (event) => {
    let request
    event.preventDefault()
    $("#city-name").text("")
    $("#weather-img").attr("src", "")
    $("#weather-img").attr("alt", "")
    $("#city-temp").text("")
    $("#city-weather").text("")

    request = $.ajax({
        url: `${url}`,
        type: "GET",
        data: { q: $("#city-input").val(), 
                appid: `${appId}`,
                units: "metric"
            }
    })

    request.done(function(response){
        renderResult(response)
    })

    request.fail(function (){
        searchError()
    })
}

// render search result //

const renderResult = (response) => {
    let cityName = response.name
    cityName = `${cityName}, ${response.sys.country}`
    let imgUrl = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
    let cityTemp = response.main.temp
    let cityWeather = response.weather[0].main

    $("#city-name").text(cityName)
    $("#weather-img").attr("src", imgUrl)
    $("#weather-img").attr("alt", cityWeather)
    $("#city-temp").text(`${cityTemp} C°`)
    $("#city-weather").text(cityWeather)
}

// search error //

const searchError = () => {
    $("#city-name").text("Por favor vuelve a intentarlo, los datos ingresados son incorrectos!")
    $("#weather-img").attr("src", "") // "src", "./images/wrong-input.svg"
    $("#city-temp").text("")
    $("#city-weather").text("")
}