

function timeSinceLastUpdate(value) {
    let actualDate = new Date();
    actualDate = Math.floor(actualDate.getTime() / 1000);
    let time = actualDate - value;
    let minutes = Math.floor(time / 60)
    if (minutes > 0) {
        return `Last update: ${minutes} mins ago`;
    } else {
        return `Last update: just now`
    }
}

function weatherIcon(weather_id, timezone) {
    let date;
    date = new Date().getUTCHours()
    if (timezone > 0) {
        date = Math.floor(date + (timezone / 3600))
        if (date > 24) {
            date = date % 24
        }
    } else if (timezone < 0) {
        timezone = timezone * (-1)
        date = Math.floor(date - (timezone / 3600))
        if (date > 24) {
            date = date % 24
        }
    }
    if (date > 5 && date < 18) {
        if (weather_id > 800) {
            return `animated/cloudy-day-1.svg`
        } else if (weather_id == 800) {
            return `animated/day.svg`
        } else if (weather_id > 700 && weather_id < 782) {
            return `animated/cloudy.svg`
        } else if (weather_id > 599 && weather_id < 623) {
            return `animated/snowy-6.svg`
        } else if (weather_id > 299 && weather_id < 501) {
            return `animated/rainy-5.svg`
        } else if (weather_id => 502 && weather_id < 532) {
            return `animated/rainy-7.svg`
        } else if (weather_id > 199 && weather_id < 233) {
            return `animated/thunder.svg`
        }

    } else {
        if (weather_id > 800) {
            return `animated/cloudy-night-3.svg`
        } else if (weather_id == 800) {
            return `animated/night.svg`
        } else if (weather_id > 700 && weather_id < 782) {
            return `animated/cloudy.svg`
        } else if (weather_id > 599 && weather_id < 623) {
            return `animated/snowy-6.svg`
        } else if (weather_id > 299 && weather_id < 501) {
            return `animated/rainy-5.svg`
        } else if (weather_id => 502 && weather_id < 532) {
            return `animated/rainy-7.svg`
        } else if (weather_id > 199 && weather_id < 233) {
            return `animated/thunder.svg`
        }
    }
}


function tempCutter(temp){
    return `${Math.round(temp.toFixed(0))} °C`;
}

// Hourly
function hourlyTimeUTC(dt, timezone) {
    if (timezone > 0) {
        let date = new Date(dt * 1000).getUTCHours()
        timezone = timezone / 3600
        date = date + timezone
        if (date > 24) {
            return date = date % 24
        } else {
            return date
        }
    } else if (timezone < 0) {
        let date = new Date(dt * 1000).getUTCHours()
        timezone = timezone * (-1)
        date = Math.floor(date - (timezone / 3600))
        date = 24 + date
        if (date <= 24) {
            return date;
        } else if (date > 24) {
            return date = (24 - date) * -1
        }
    } else {
        return new Date(dt * 1000).getUTCHours()
    }
}
function hourlyWeatherIcon(weather_id, xyz) {
    if (xyz > 5 && xyz < 18) {
        if (weather_id > 800) {
            return `static/cloudy-day-1.svg`
        } else if (weather_id == 800) {
            return `static/day.svg`
        } else if (weather_id > 700 && weather_id < 782) {
            return `static/cloudy.svg`
        } else if (weather_id > 599 && weather_id < 623) {
            return `static/snowy-6.svg`
        } else if (weather_id > 299 && weather_id < 501) {
            return `static/rainy-5.svg`
        } else if (weather_id => 502 && weather_id < 532) {
            return `static/rainy-7.svg`
        } else if (weather_id > 199 && weather_id < 233) {
            return `static/thunder.svg`
        }

    } else {
        if (weather_id > 800) {
            return `static/cloudy-night-3.svg`
        } else if (weather_id == 800) {
            return `static/night.svg`
        } else if (weather_id > 700 && weather_id < 782) {
            return `static/cloudy.svg`
        } else if (weather_id > 599 && weather_id < 623) {
            return `static/snowy-6.svg`
        } else if (weather_id > 299 && weather_id < 501) {
            return `static/rainy-5.svg`
        } else if (weather_id => 502 && weather_id < 532) {
            return `static/rainy-7.svg`
        } else if (weather_id > 199 && weather_id < 233) {
            return `static/thunder.svg`
        }
    }
}
function popConventer(value) {
    return `${Math.round(value * 100)}%`
}

// Daily
function dailyDay_Month(value) {
    let newDate = new Date(value * 1000)
    let day = newDate.getDay();
    let date = newDate.getDate();
    let month = newDate.getMonth();
    if (date < 10) {
        date = `0${date}`
    }
    if (month < 10) {
        month = `0${month+1}`
    }
    return `${daysInWeek[day]}, ${date}/${month}`
}


function dailyWeatherIcon(weather_id) {
        if (weather_id > 800) {
            return `animated/cloudy-day-1.svg`
        } else if (weather_id == 800) {
            return `animated/day.svg`
        } else if (weather_id > 700 && weather_id < 782) {
            return `animated/cloudy.svg`
        } else if (weather_id > 599 && weather_id < 623) {
            return `animated/snowy-6.svg`
        } else if (weather_id > 299 && weather_id < 501) {
            return `animated/rainy-5.svg`
        } else if (weather_id => 502 && weather_id < 532) {
            return `animated/rainy-7.svg`
        } else if (weather_id > 199 && weather_id < 233) {
            return `animated/thunder.svg`
        }
}

// Tiles
function rise_setUTC(timezone, time) {
    if (timezone > 0) {
        let date = new Date(time * 1000)
        let hours = date.getUTCHours();
        let mins = date.getUTCMinutes();
        if (mins < 10) {
            mins = `0${mins}`
        }
        timezone = timezone / 3600
        hours = hours + timezone
        if (date > 24) {
            hours = hours % 24
            return `${hours}:${mins}`
        } else {
            return `${hours}:${mins}`
        }
    } else if (timezone < 0) {
        let date = new Date(time * 1000)
        let hours = date.getUTCHours();
        let mins = date.getUTCMinutes();
        timezone = timezone * (-1)
        hours = Math.floor(hours - (timezone / 3600))
        hours = 24 + hours
        if (hours <= 24) {
            return `${hours}:${mins}`
        } else if (hours > 24) {
            hours = (24 - hours) * -1
            return `${hours}:${mins}`
        }
    } else {
        let date = new Date(time * 1000)
        let hours = date.getUTCHours();
        let mins = date.getUTCMinutes();
        return `${hours}:${mins}`
    }
}
function aiqIndexChecker(aiq) {
    if (aiq == 1) {
        aiq_index.innerHTML = "1 (Good)"
        aiq_dot.style.left = "5%"
        aiq_info.innerText = "Air quality is satisfactory, and air pollution poses little or no risk."
    } else if (aiq == 2) {
        aiq_index.innerHTML = "2 (Moderate)"
        aiq_dot.style.left = "20%"
        aiq_info.innerText = "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution."
    } else if (aiq == 3) {
        aiq_index.innerHTML = "3 (Unhealthy for Sensitive Groups)"
        aiq_dot.style.left = "50%"
        aiq_info.innerText = "Members of sensitive groups may experience health effects. The general public is less likely to be affected."
    } else if (aiq == 4) {
        aiq_index.innerHTML = "4 (Unhealthy)"
        aiq_dot.style.left = "70%"
        aiq_info.innerText = "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects."
    } else if (aiq == 5) {
        aiq_index.innerHTML = "5 (Very Unhealthy)"
        aiq_dot.style.left = "95%"
        aiq_info.innerText = "Health alert: The risk of health effects is increased for everyone."
    }
}


    


