const today_WeatherData = async (lat, lon) => {
    try {
        const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
        const res = await fetch(api_url)
        const data = await res.json()
        return data;
    } catch (err) {
        alert(`Error: ${err} [hourlyWeekly]`)
    }
}

const hourly_WeatherData = async (lat, lon) => {
    try {
        const api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,daily&appid=${api_key}`
        const res = await fetch(api_url)
        const data = await res.json()
        return data;
    } catch (err) {
        alert(`Error: ${err} [hourly]`)
    }
}

const daily_WeatherData = async (lat, lon) => {
    try {
        const api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${api_key}`
        const res = await fetch(api_url)
        const data = await res.json()
        return data;
    } catch (err) {
        alert(`Error: ${err} [daily]`)
    }

}

const airPollution_Info = async (lat, lon) => {
    try {
        const api_url2 = `https://api.openweathermap.org/data/2.5/air_pollution?lat=0${lat}&lon=${lon}&appid=${api_key}`
        const res = await fetch(api_url2)
        const data = await res.json()
        return data;
    } catch (err) {
        alert(`Error: ${err} [aiqInfo]`)
    }
}


const get_UserSelectedLocation = async () => {
    const li_results = document.querySelectorAll(".results li")
    li_results.forEach(elem => {
        elem.remove();
    })
    try {
        searchedLocationArray.push(user_input.value)
        const api_url = `https://api.openweathermap.org/geo/1.0/direct?q=${user_input.value}&limit=5&appid=${api_key}`
        const res = await fetch(api_url)
        const data = await res.json()
        for (let i = 0; i < data.length; i++) {
            const {
                country,
                name,
            } = data[i]
            const result = document.createElement("li")
            result.dataset.lat = data[i].lat
            result.dataset.lon = data[i].lon
            result.dataset.name = data[i].name
            result.innerHTML = `${name}, ${country}`
            results.appendChild(result)

            const mapClick = document.createElement("button")
            mapClick.innerHTML = `Check on map`
            mapClick.classList.add("click_map")
            mapClick.dataset.value = "open-map-btn"
            result.appendChild(mapClick)
        }
        
        const result = [...document.querySelectorAll(".results li")]
        let lenght = result.length - 1
        const closeAll = document.createElement("button")
        closeAll.classList.add("closeAll")
        closeAll.innerHTML = `<i class="fas fa-arrow-up"></i>`
        closeAll.dataset.value = "close-all"
        result[lenght].appendChild(closeAll)
        result.forEach(elem => {
            elem.addEventListener("click", async function (e) {
                if (e.target.dataset.value == "open-map-btn") {
                    const x = e.target.parentNode.dataset.lat
                    const y = e.target.parentNode.dataset.lon
                    alert_map.classList.add("showMap")
                    drawMap_Streets(y, x, alert_map, 13)
                } else if (e.target.dataset.value == "close-all" || e.target.parentNode.dataset.value == "close-all") {
                    const li_results = document.querySelectorAll(".results li")
                    li_results.forEach(elem => {
                        elem.remove();
                    })
                    user_input.value = ""
                    return;
                } else {
                    lat_pos = e.target.dataset.lat
                    lon_pos = e.target.dataset.lon
                    selected_location = e.target.dataset.name
                    await clearFields()
                    await get_WeatherData()
                }

            })
        })



    } catch (err) {
        alert(`Error: ${err}`)
    }

}

const get_UserCurrentLocation = () => {
    return new Promise((res, rej) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, failure, {
                enableHighAccuracy: true
            })

            function success(position) {
                const {
                    latitude,
                    longitude
                } = position.coords;
                lat_pos = position.coords.latitude
                lon_pos = position.coords.longitude
                res()
            }

            function failure(err) {
                alert(`Error: ${err.message}`)
                rej();
            }
        } else {
            alert("There is no GPS at your device. Sorry.")
            rej();
        }
    })
}

const get_WeatherData = async () => {
    isLoading()
    const today_Data = await today_WeatherData(lat_pos, lon_pos)
    const hourly_Data = await hourly_WeatherData(lat_pos, lon_pos);
    const daily_Data = await daily_WeatherData(lat_pos, lon_pos);
    const aiq_data = await airPollution_Info(lat_pos, lon_pos)
    // top
    if(selected_location == ""){
        city_name.innerHTML = today_Data.name;
    }
    else {
        city_name.innerHTML = selected_location;
    }
    
    lastData_update.innerHTML = `${timeSinceLastUpdate(today_Data.dt)}`;
    // left
    current_temp_real.innerHTML = tempCutter(today_Data.main.temp)
    current_temp_feels.innerHTML = `Feels like: ${tempCutter(today_Data.main.feels_like)}`
    highest_temp.innerHTML = `Highest: ${tempCutter(today_Data.main.temp_max)}`
    lowest_temp.innerHTML = `Lowest: ${tempCutter(today_Data.main.temp_min)}`
    // right
    weather_icon.src = weatherIcon(today_Data.weather[0].id, today_Data.timezone)
    weather_type.innerText = today_Data.weather[0].description.toUpperCase(1);
    humidity_html.innerText = `Humidity: ${today_Data.main.humidity}%`;
    pressure_html.innerText = `Pressure: ${today_Data.main.pressure} hPa`

    // hourly_slider
    for (let i = min_hours_forecast; i < max_hours_forecast; i++) {
        const hourly_cointainer = document.createElement("div")
        hourly_cointainer.classList.add("hourly_cointainer")
        hourly_cointainer.setAttribute("id", "hourly")
        slider.appendChild(hourly_cointainer)
        const hour = document.createElement("div");
        hour.classList.add("hour")
        if (i == 0) {
            hour.innerText = `Now`

        } else if (hourlyTimeUTC(hour, hourly_Data.timezone_offset) == 0) {
            hour.innerText = `24`
        } else {
            hour.innerText = `${hourlyTimeUTC(hourly_Data.hourly[i].dt, hourly_Data.timezone_offset)}`
        }
        hourly_cointainer.appendChild(hour)
        const mins = document.createElement("span")
        mins.innerText = ":00"
        mins.classList.add("mins")
        hour.appendChild(mins)
        const weather_icon_hourly = document.createElement("img")
        weather_icon_hourly.src = hourlyWeatherIcon(hourly_Data.hourly[i].weather[0].id, parseInt(hour.innerText))
        hourly_cointainer.appendChild(weather_icon_hourly)

        const pop_html = document.createElement("div")
        pop_html.classList.add("pop")
        pop_html.innerHTML = popConventer(hourly_Data.hourly[i].pop)
        hourly_cointainer.appendChild(pop_html)

        const temp_html = document.createElement("div")
        temp_html.classList.add("temp")
        temp_html.innerHTML = tempCutter(hourly_Data.hourly[i].temp)
        hourly_cointainer.appendChild(temp_html)
    }

    // daily  slider
    for (let i = min_days_forecast; i < max_days_forecast; i++) {
        const daily_cointainer = document.createElement("div")
        daily_cointainer.classList.add("daily_cointainer")
        daily_weather.appendChild(daily_cointainer)

        const daily_day = document.createElement("span")
        daily_day.classList.add("daily_day")
        if (i == 0) {
            daily_day.innerHTML = `Today`
        } else {
            daily_day.innerHTML = `${dailyDay_Month(daily_Data.daily[i].dt)}`
        }

        daily_cointainer.appendChild(daily_day)

        const daily_icon = document.createElement("img")
        daily_icon.classList.add("daily_icon")
        daily_icon.src = dailyWeatherIcon(daily_Data.daily[i].weather[0].id)
        daily_cointainer.appendChild(daily_icon)

        const daily_temp = document.createElement("span")
        daily_temp.classList.add("daily_temp")
        let average = Math.round((daily_Data.daily[i].temp.max + daily_Data.daily[i].temp.min) / 2)
        daily_temp.innerHTML = tempCutter(average)
        daily_cointainer.appendChild(daily_temp)

    }

    // tiles
    sunrise.innerHTML = `${rise_setUTC(today_Data.timezone, today_Data.sys.sunrise)}`
    sunset.innerHTML = `${rise_setUTC(today_Data.timezone, today_Data.sys.sunset)}`
    wind_speed.innerHTML = `${(today_Data.wind.speed * 3.6).toFixed(1)} km/h`
    wind_deg.innerHTML = `${today_Data.wind.deg}°`
    wind_arrow.style.transform = `rotate(${today_Data.wind.deg}deg)`
    aiqIndexChecker(aiq_data.list[0].main.aqi)

    // maps
    drawMap_Temp(lon_pos, lat_pos, temp_map)
    drawMap_Rain(lon_pos, lat_pos, prec_map)
    drawMap_Clouds(lon_pos, lat_pos, clouds_map)
    isLoaded()
}



const load_UserCurrentLocationData = async () => {
    await get_UserCurrentLocation()
    await get_WeatherData()
    window.scrollTo(0, 0);
}
const load_UserSelectedLocationData = async () => {
    await get_UserSelectedLocation();
    window.scrollTo(0, 0);
}
window.addEventListener("load", load_UserCurrentLocationData)
search_button.addEventListener("click", load_UserSelectedLocationData)
user_input.addEventListener("touchstart", search_bar_background_focus)
user_input.addEventListener("input", function () {
    if (user_input.value.length == 0) {
        const li_results = document.querySelectorAll(".results li")
        li_results.forEach(elem => {
            elem.remove();
        })
    }
})

exit_button.addEventListener("click", function () {
    alert_map.classList.remove("showMap")
})