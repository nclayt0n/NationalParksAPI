let apiKey = 'SGf8R6mcluw65MTCedySw9Yj1Hi09JhBOOlRni7N';
let names = [];
let descriptions = [];
let urls = [];
let address = [];


function displayProps(response) {
    console.log(response);
    for (let i = 0; i < response.data.length; i++) {
        address.push(response.data[i].addresses[i]);
        names.push(response.data[i].fullName);
        descriptions.push(response.data[i].description);
        urls.push(response.data[i].url);
        $(`#parkInfo`).append(`<section class="parks" id=parkInfo${i}></section>`);
        $(`#parkInfo${i}`).html(`<ul class="parkInfo">${names[i]}</ul><li>${descriptions[i]}</li><br><li>Visit<a href="${urls[i]}" target="_blank">${urls[i]} </a>for more information!</li>`);
    }

}


function fetching(searchURL) {
    fetch(searchURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayProps(responseJson))
        .catch(err => {
            $('#errorDisplay').text(`Something went wrong: ${err.message}`);
        });
}

function getState() {
    $('#enter').click(event => {
        $('.parks').remove();
        const stateSearch = $('#stateSearch').val();
        const maxResults = $('#resultAmt').val();
        const searchURL = `https://developer.nps.gov/api/v1/parks?stateCode=${stateSearch}&limit=${maxResults}&fields=addresses&api_key=${apiKey}`;
        fetching(searchURL);

    });
}



$(getState);