const temp = document.getElementById('temp');
const cityName = document.getElementById('city');
const humidity = document.getElementById('humidity');
const windspeed = document.getElementById('windspeed');
const searchinput = document.getElementById('searchinput');
const serchbox = document.getElementById('serchbox');
const body_img = document.getElementById('body_img');
const body_data = document.getElementById('body_data');
const deatil = document.getElementById('deatil');
const loadingSpinner = document.getElementById('loading-spinner');

async function checkWeather(city) {
    const apiKey = 'f27b269d54e4fa1e72993364a80fa8bd';
    loadingSpinner.style.display = 'block';
    body_data.style.display = 'none';
    deatil.style.display = 'none';

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        temp.innerHTML = Math.floor(data.main.temp) + '°C';
        cityName.innerHTML = data.name;
        humidity.innerHTML = data.main.humidity + "%";
        windspeed.innerHTML = data.wind.speed + 'km/h';

        if (data.weather[0].main === "Clouds") {
            body_img.src = 'cloud.png';
        } else if (data.weather[0].main === 'Clear') {
            body_img.src = 'image/clear.png';
        } else if (data.weather[0].main === 'Rain') {
            body_img.src = 'image/rain.png';
        } else if (data.weather[0].main === 'Drizzle') {
            body_img.src = 'image/drizzle.png';
        } else if (data.weather[0].main === 'Mist') {
            body_img.src = 'image/mist.png';
        } else if (data.weather[0].main === 'Haze') {
            body_img.src = 'image/haze.png';
        }

        body_data.style.display = 'flex';
        deatil.style.display = 'flex';
    } catch (error) {
        errorMessage.textContent = 'City Not Found.';
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 2000)
    } finally {
        loadingSpinner.style.display = 'none';
    }
}

serchbox.addEventListener('click', () => {
    const cityIn = searchinput.value;
    
    if (cityIn) checkWeather(cityIn);
});

searchinput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cityIn = searchinput.value;
        if(!cityIn) throw new alert("City not Found.")
        if (cityIn) checkWeather(cityIn);
    }
});
