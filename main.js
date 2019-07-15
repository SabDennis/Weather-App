// variables
const dateElement = document.querySelector('.date-element');
const notificationElement = document.querySelector('.notification');
const temperatureValueElement = document.querySelector('.temp-value p');
const weatherDescriptionElement = document.querySelector('.description p');
const userLocationElement = document.querySelector('.location p');
const apiKey = '16e8195cb83e5e7fdd40ff8c909328b7';

// date element
const currentDate = new Date();
const options = {
    month: "long",
    weekday: "long",
    day: "numeric"
};

dateElement.innerHTML = currentDate.toLocaleDateString('en-US', options);

// weather object
const weatherObj = {};

// check geolocation 
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        notificationElement.classList.add('active');
        notificationElement.innerHTML = `Geolocation works`;
        getWeather(lat, lon);
    })

} else {

};

// get weather
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => {
            let data = response.json();
            console.log(data);
            return data;
        })
        .then(data => {
            weatherObj.temperature = Math.floor(data.main.temp - 273);
            weatherObj.description = data.weather[0].description;
            weatherObj.city = data.name;
            weatherObj.country = data.sys.country;
            weatherObj.icon = data.weather[0].icon;
        })
        .then(() => {
            dislayWeather();
        })
        .catch(error => console.error(error));
};

// display weather 
function dislayWeather() {
    temperatureValueElement.innerHTML = `${weatherObj.temperature}°<span>C</span>`;
    weatherDescriptionElement.innerHTML = `${weatherObj.description}`;
    userLocationElement.innerHTML = `${weatherObj.city}, ${weatherObj.country}`;
    document.querySelector('.icon img').src = `http://openweathermap.org/img/wn/${weatherObj.icon}@2x.png`;
}

console.log(weatherObj);