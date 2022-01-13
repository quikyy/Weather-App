let isClicked = false;
let startX;
let x;

hourly_weather.addEventListener("touchstart", (e) => {
    isClicked = true;
    let rect = e.target.getBoundingClientRect();
    startX = (e.touches[0].clientX - window.pageXOffset - rect.left)
    startX = startX - slider.offsetLeft
}, false)

hourly_weather.addEventListener("touchmove", (e) => {
    let rect = e.target.getBoundingClientRect();
    if (!isClicked) return
    e.preventDefault();
    x = (e.touches[0].clientX - window.pageXOffset - rect.left)
    slider.style.left = `${x - startX}px`
    checkPosition()

}, false)

hourly_weather.addEventListener("touchend", (e) => {
    isClicked = false;
})

function checkPosition() {
    let outer = hourly_weather.getBoundingClientRect()
    let inner = slider.getBoundingClientRect()
    if (parseInt(slider.style.left) > 0) {
        slider.style.left = "0px"
    }
    else if(inner.right < outer.right){
        slider.style.left = `-${inner.width - outer.width}px`
    }
}