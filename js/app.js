const url = "https://api.openweathermap.org/data/2.5/weather";
const appId = "a20cca282f35b96f384a5385a3120a48";

// checking for geolocation, calling form submit event and getting current date // 

$(document).ready(function() {
    navigator.geolocation ?
    ($(".spinner").show(),
        navigator.geolocation.getCurrentPosition(function(position){
        defaultWeather(position)})
    ) : null

    $("#form").submit(function(event, appId) {
        $(".spinner").show()
        search(event, appId)
    })
});

// API calls //

const defaultWeather = (position) => {
    $(".spinner").show()

    let lat = position.coords.latitude
    let lon = position.coords.longitude

    let request
    request = $.ajax({
        url: `${url}`,
        type: "GET",
        data: { appid: `${appId}`,
                lat: `${lat}`,
                lon: `${lon}`,
                units: "metric"
            }
    })

    request.done(function(response){
        renderWeather(response)
    })

    request.fail(function (){
        defaultError()
    })
}

// render geolocation call //

const renderWeather = (response) => {
    $(".spinner").hide()

    let cityName = response.name
    cityName = `${cityName}, ${response.sys.country}`
    let imgUrl = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
    let cityTemp = response.main.temp
    let cityWeather = response.weather[0].description
    let cityHumidity = response.main.humidity
    let cityWind = response.wind.speed

    $("#city-name").removeClass("error")
    $("#city-name").addClass("city-name")
    $("#city-name").text(`El clima en ${cityName}`)
    $("#weather-img").removeClass("img-error")
    $("#weather-img").addClass("weather-img")
    $("#weather-img").attr("src", imgUrl)
    $("#weather-img").attr("alt", cityWeather)
    $("#city-temp").text(`${cityTemp} C°`)
    $("#city-weather").text(cityWeather)
    $("#city-humidity").text(`Humedad: ${cityHumidity}%`)
    $("#city-wind").text(`Viento: ${cityWind} Km/h`)

    currentDate()
}

// geolocation call error //

const defaultError = () => {
    $(".spinner").hide()
    $("#city-name").removeClass("city-name")
    $("#city-name").addClass("error")
    $("#city-name").text(
    "¡Ups! Lo sentimos mucho, ha ocurrido un problema al conectarnos con el servidor. Intenta refrescar la página.")
    $("#weather-img").removeClass("weather-img")
    $("#weather-img").addClass("img-error")
    $("#weather-img").attr("src", "./images/error.svg")
    $("#weather-img").attr("alt", "error al cargar")
    $("#city-temp").text("")
    $("#city-weather").text("")
    $("#city-humidity").text("")
    $("#city-wind").text("")
    $("#date").text("")
    $("#current-date").text("")
}

// search call //

const search = (event) => {
    $(".spinner").show()
    
    let request
    event.preventDefault()

    $("#city-name").text("")
    $("#weather-img").attr("src", "")
    $("#weather-img").attr("alt", "")
    $("#city-temp").text("")
    $("#city-weather").text("")
    $("#city-humidity").text("")
    $("#city-wind").text("")
    $("#date").text("")
    $("#current-date").text("")

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
    $(".spinner").hide()

    let cityName = response.name
    cityName = `${cityName}, ${response.sys.country}`
    let imgUrl = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
    let cityTemp = response.main.temp
    let cityWeather = response.weather[0].description
    let cityHumidity = response.main.humidity
    let cityWind = response.wind.speed

    $("#city-name").removeClass("error")
    $("#city-name").addClass("city-name")
    $("#city-name").text(`El clima en ${cityName}`)
    $("#weather-img").removeClass("img-error")
    $("#weather-img").addClass("weather-img")
    $("#weather-img").attr("src", imgUrl)
    $("#weather-img").attr("alt", cityWeather)
    $("#city-temp").text(`${cityTemp} C°`)
    $("#city-weather").text(cityWeather)
    $("#city-humidity").text(`Humedad: ${cityHumidity}%`)
    $("#city-wind").text(`Viento: ${cityWind} Km/h`)

    currentDate()
}

// search error //

const searchError = () => {
    $(".spinner").hide()
    $("#city-name").removeClass("city-name")
    $("#city-name").addClass("error")
    $("#city-name").text("Por favor vuelve a intentarlo !Los datos ingresados son incorrectos!")
    $("#weather-img").removeClass("weather-img")
    $("#weather-img").addClass("img-error")
    $("#weather-img").attr("src", "./images/error.svg")
    $("#weather-img").attr("alt", "error al cargar")
    $("#city-temp").text("")
    $("#city-weather").text("")
    $("#city-humidity").text("")
    $("#city-wind").text("")
    $("#date").text("")
    $("#current-date").text("")
}

// get current date //

const currentDate = () => {
    let current = $.now()
    let maxDate = new Date(current)
    let currentDate = maxDate.getDate()
    let currentMonth = maxDate.getMonth() + 1
    let currentYear = maxDate.getFullYear()

    $("#date").text("")
    $("#current-date").text("")
    
    renderDate(currentDate, currentMonth, currentYear)
}

// render current date //

const renderDate = (date, month, year) => {
    $("#date").text("")
    $("#current-date").text("")
    $("#date").text("Fecha:")
    $("#current-date").text(`${date}/${month}/${year}`)
}