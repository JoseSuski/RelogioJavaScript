const locations = document.querySelectorAll("section.times div")

const updateTimes = function () {
    locations.forEach(location => {
        const output = location.querySelector("output")
        const timezone = location.getAttribute("data-timezone")

        const now = luxon.DateTime.now().setZone(timezone)

        output.innerHTML = now.toFormat("HH:mm:ss D")

        const hour  = parseInt(now.toFormat("H"))

        if(hour >= 6 && hour <19){
            location.classList.add("day")
        } else {
            location.classList.add("night")
        }
    })
}

updateTimes()

setInterval(function () {
    updateTimes()
}, 1000)