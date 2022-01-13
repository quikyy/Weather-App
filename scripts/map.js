const temp_map = document.getElementById("temp_map")
function drawMap_Temp(y, x, container) {
  const map = new mapboxgl.Map({
    container: container,
    style: 'mapbox://styles/mapbox/light-v9',
    zoom: 3,
    center: [y, x]
  });

  map.on('load', function () {
    map.addLayer({
      "id": "simple-tiles",
      "type": "raster",
      "source": {
        "type": "raster",
        "tiles": ["https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=874718354841f0e0250b4b06a05a971e"],
        "tileSize": 256
      },
      "minzoom": 0,
      "maxzoom": 22
    });
  });
}

const prec_map = document.getElementById("prec_map")
function drawMap_Rain(y, x, container) {
  const map2 = new mapboxgl.Map({
    container: container,
    style: 'mapbox://styles/mapbox/light-v9',
    zoom: 3,
    center: [y, x]
  });

  map2.on('load', function () {
    map2.addLayer({
      "id": "simple-tiles",
      "type": "raster",
      "source": {
        "type": "raster",
        "tiles": ["https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=874718354841f0e0250b4b06a05a971e"],
        "tileSize": 256
      },
      "minzoom": 0,
      "maxzoom": 22
    });
  });
}

const clouds_map = document.getElementById("clouds_map")
function drawMap_Clouds(y, x, container) {
  const map3 = new mapboxgl.Map({
    container: container,
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 3,
    center: [y, x]
  });

  map3.on('load', function () {
    map3.addLayer({
      "id": "simple-tiles",
      "type": "raster",
      "source": {
        "type": "raster",
        "tiles": ["https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=874718354841f0e0250b4b06a05a971e"],
        "tileSize": 256
      },
      "minzoom": 0,
      "maxzoom": 22
    });
  });

}

const selector_container_spans = document.querySelectorAll(".selector_container span")
const activeSelector = "activeSelctor"
const all_maps = document.querySelectorAll(".all_maps main")
const activeMap = "activeMap"

selector_container_spans.forEach(elem => {
  elem.addEventListener("click", function (e) {
    if (elem.dataset.value == "temp_selector") {
      elem.classList.add(activeSelector)
      all_maps.forEach(map => {
        if(map.dataset.value == "temp_map"){
          map.classList.add(activeMap)
        }
        else{
          map.classList.remove(activeMap)
        }
      })

      


      selector_container_spans.forEach(elem => {
        if (elem.dataset.value != "temp_selector") {
          elem.classList.remove(activeSelector)
        }
      })
    }


    if (elem.dataset.value == "prec_selector") {
      elem.classList.add(activeSelector)
      all_maps.forEach(map => {
        if(map.dataset.value == "prec_map"){
          map.classList.add(activeMap)
        }
        else{
          map.classList.remove(activeMap)
        }
      })


      selector_container_spans.forEach(elem => {
        if (elem.dataset.value != "prec_selector") {
          elem.classList.remove(activeSelector)
        }
      })
    }

    if (elem.dataset.value == "clouds_selector") {
      elem.classList.add(activeSelector)

     all_maps.forEach(map => {
        if(map.dataset.value == "clouds_map"){
          map.classList.add(activeMap)
        }
        else{
          map.classList.remove(activeMap)
        }
      })

      selector_container_spans.forEach(elem => {
        if (elem.dataset.value != "clouds_selector") {
          elem.classList.remove(activeSelector)
        }
      })
    }


  })
})






function drawMap_Streets(y, x, container, zoom) {
  map = new mapboxgl.Map({
    container: container,
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: zoom,
    center: [y, x]
  });

  map.on('load', function () {
    map.addLayer({
      "id": "simple-tiles",
      "type": "raster",
      "source": {
        "type": "raster",
        "tiles": [""],
        "tileSize": 256
      },
      "minzoom": 0,
      "maxzoom": 22
    });
  });
}