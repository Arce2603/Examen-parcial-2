//https://restcountries.eu/rest/v2/name/

function fetchCountry(country) {
    let url = "https://restcountries.eu/rest/v2/name/" + country +"?fullText=true";
    let settings = {
        method: "GET"
    }

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
        })
        .then(responseJSON => {
            console.log(responseJSON);
            if (responseJSON)
                displayResults(responseJSON);
            else {
                let result = document.getElementsByClassName('js-search-results');
                result[0].innerHTML = 'Pais no existe';}
        });
}

function displayResults(responseJSON) {
    let result = document.getElementsByClassName('js-search-results');
    result[0].innerHTML = '';
    let flag = responseJSON[0].flag;
    result[0].innerHTML += `<h2>${responseJSON[0].name}</h2>
            <div id="capital">Capital: ${responseJSON[0].capital}</div >
            <img src="${flag}" alt="bandera" id ="flag"/>
            <div id="poblacion">Poblacion: ${responseJSON[0].population} </div>
            <div id="region">Region: ${responseJSON[0].region} </div>
            <div id="ZH">Zona horaria: ${responseJSON[0].timezones} </div>
            <div id="paisesCol"> Colinda con: ${responseJSON[0].borders} </div>
`;
}
function watchForm() {
    let form = document.getElementsByClassName('js-search-form');
    
    form[0].addEventListener('submit', function (e) {
        e.preventDefault();
        let country = document.getElementById('query').value;
        if (country !== '')
            fetchCountry(country);
    });
}

function init() {
    watchForm();
}

init();