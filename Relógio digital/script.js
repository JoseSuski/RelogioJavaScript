const locations = document.querySelectorAll("section.times div")

const updateTimes = function () {
    locations.forEach(location => {
        const output = location.querySelector("output")
        const timezone = location.getAttribute("data-timezone")

        const now = luxon.DateTime.now().setZone(timezone)

        output.innerHTML = now.toFormat("HH:mm:ss D")

        const hour = parseInt(now.toFormat("H"))

        if (hour >= 6 && hour < 19) {
            location.classList.add("day")
        } else {
            location.classList.add("night")
        }
    })
}

const continentSelect = document.getElementById('continentSelect');
const regionSelect = document.getElementById('regionSelect');
const addButton = document.getElementById('btnAdd');
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close');
const confirmButton = document.getElementById('confirmButton');
const timesSection = document.querySelector('.times');

const timezones = {
    'São Paulo': 'America/Sao_Paulo',
    'Londres': 'Europe/London',
    'Nova Iorque': 'America/New_York',
    'Brisbane': 'Australia/Brisbane',
    'Moscou': 'Europe/Moscow',
    'Madri': 'Europe/Madrid',
    // Adicione outros fusos horários aqui
};

const regionsByContinent = {
    America: ['São Paulo', 'Nova Iorque'],
    Europe: ['Londres', 'Moscou', 'Madri'],
    // Adicione outras regiões para cada continente aqui
};

function populateRegionSelect(regions) {
    regionSelect.innerHTML = '<option value="" selected disabled>Selecione uma região</option>';
    if (regions && regions.length > 0) {
        regions.forEach(function (region) {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionSelect.appendChild(option);
        });
        regionSelect.disabled = false;
    } else {
        regionSelect.disabled = true;
    }
}


function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function addTimezone() {
    const selectedContinent = continentSelect.value;
    const selectedRegion = regionSelect.value;
    if (selectedContinent && selectedRegion) {
        const selectedTimezone = timezones[selectedRegion];
        const newTimezoneDiv = document.createElement('div');
        newTimezoneDiv.setAttribute('data-timezone', selectedTimezone);
        newTimezoneDiv.innerHTML = `
      <h2>${selectedRegion}</h2>
      <output>00:00:00</output>
    `;
        timesSection.appendChild(newTimezoneDiv);
        closeModal();
        continentSelect.value = '';
        regionSelect.value = '';
        regionSelect.disabled = true;
    }
}

function initializeApp() {
    continentSelect.addEventListener('change', function () {
        const selectedContinent = this.value;
        if (selectedContinent) {
            const regions = regionsByContinent[selectedContinent];
            populateRegionSelect(regions);
        } else {
            populateRegionSelect([]);
        }
    });

    addButton.addEventListener('click', openModal);

    closeButton.addEventListener('click', closeModal);

    confirmButton.addEventListener('click', addTimezone);
}

initializeApp();



updateTimes()

setInterval(function () {
    updateTimes()
}, 1000)