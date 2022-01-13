const clearFields = async () => {
    return new Promise((res) => {
        slider.innerText = ""
        const li_results = document.querySelectorAll(".results li")
        li_results.forEach(elem => {
            elem.remove();
        })
        const allDailyContainers = document.querySelectorAll(".daily_cointainer")
        allDailyContainers.forEach(elem => {
            elem.remove();
        })
        user_input.value = ""
        res()
    })
}

const isLoading = () => {
    loading.classList.add(loadingOn)
}

const isLoaded = () => {
    loading.classList.remove(loadingOn)
}