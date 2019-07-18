// Variables
const dateElement = document.querySelector('.date-element');
const notificationElement = document.querySelector('.notification');
const temperatureValueElement = document.querySelector('.temp-value p');
const weatherDescriptionElement = document.querySelector('.description p');
const userLocationElement = document.querySelector('.location p');
const kelvin = 273.15;

// Weather object
const weatherObj = {
    celsius: true
};

// OpenWeather API key
const apiKey = '16e8195cb83e5e7fdd40ff8c909328b7';

// Date
const currentDate = new Date();
const options = { month: "long", weekday: "long", day: "numeric" };

// Display date 
dateElement.innerHTML = currentDate.toLocaleDateString('en-US', options);

// Checking geolocation 
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        notificationElement.classList.add('active');
        notificationElement.innerHTML = `Geolocation works`;
        getWeather(lat, lon);
    });
} else {
    console.error('Upgrade your browser. This Browser is NOT supported geolocation');
};

// Getting weather
function getWeather(lat, lon) {
    let api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(api_url)
        .then(response => {
            let data = response.json();
            console.log(data);
            return data;
        })
        .then(data => {
            weatherObj.temperature = (data.main.temp - kelvin).toFixed(1);
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

// Display weather 
function dislayWeather() {
    temperatureValueElement.innerHTML = `${weatherObj.temperature}°<span>C</span>`;
    weatherDescriptionElement.innerHTML = `${weatherObj.description}`;
    userLocationElement.innerHTML = `${weatherObj.city}, ${weatherObj.country}`;
    document.querySelector('.icon img').src = `http://openweathermap.org/img/wn/${weatherObj.icon}@2x.png`;
};

// Convert Celsius to Fahrenheit
temperatureValueElement.addEventListener('click', () => {
    if (weatherObj.temperature === undefined) return false;
    if (weatherObj.celsius) {
        let fahrenheit = (weatherObj.temperature * 1.8 + 32).toFixed(1);
        temperatureValueElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weatherObj.celsius = false;
    } else {
        temperatureValueElement.innerHTML = `${weatherObj.temperature}°<span>C</span>`;
        weatherObj.celsius = true;
    };
});

console.log(weatherObj);