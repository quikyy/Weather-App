const api_key = `3745a67d7481e398883544ebcdfaee54`
mapboxgl.accessToken = `pk.eyJ1Ijoic3ppbWlkdWIiLCJhIjoiY2t4cDc5NGgyMjUwcDJycWs4aDRwdWhiYyJ9.Fe7yERGA3W4MHNHL8VCd0A`

const loading = document.getElementById("loading")
const loadingOn = "loadingOn"
const searched_info = document.querySelector(".searched_info")
const results = document.querySelector(".results")
const alert_map = document.querySelector(".alert_map")
const exit_button = document.querySelector(".exit_button")
const search_bar = document.querySelector(".search_bar")
const user_input = document.querySelector(".user_input")
const search_button = document.querySelector(".search_button")
const search_button_i = document.querySelector(".search_button i")

const city_name = document.querySelector(".city_info")
const lastData_update = document.querySelector(".last_update")
const current_temp_real = document.getElementById("current_temp")
const current_temp_feels = document.getElementById("feels")
const highest_temp = document.getElementById("highest")
const lowest_temp = document.getElementById("lowest")
const weather_icon = document.getElementById("svg_icon")
const weather_type = document.getElementById("weather_type")
const humidity_html = document.getElementById("humidity")
const pressure_html = document.getElementById("pressure")
const hourly_weather = document.querySelector(".hourly_weather")
const daily_weather = document.querySelector(".daily_weather")
const slider = document.querySelector(".slider")

const tiles = document.querySelectorAll("tile")
const sunrise = document.querySelector(".sunrise")
const sunset = document.querySelector(".sunset")
const wind_speed = document.getElementById("wind_speed")
const wind_deg = document.getElementById("wind_deg")
const wind_arrow = document.querySelector(".arrow i")
const aiq_index = document.querySelector(".aiq_index")
const aiq_dot = document.querySelector(".dot")
const aiq_info = document.querySelector(".aiq_info")


let lat_pos
let lon_pos;

let selected_location = ""

let searchedLocationArray = []

const min_hours_forecast = 1;
const max_hours_forecast = 23;

const min_days_forecast = 0;
const max_days_forecast = 7;
const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];