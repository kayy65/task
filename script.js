$(document).ready(function () {
    // Initialize DataTable on page load
    const dataTable = $('#myDataTable').DataTable({
        columns: [
            { title: 'Country Code', data: 'countryCode' },
            { title: 'FCL', data: 'fcl' },
            { title: 'FCode', data: 'fcode' },
            { title: 'GeoNameID', data: 'geonameId' },
            { title: 'Latitude', data: 'lat' },
            { title: 'Longitude', data: 'lng' },
            { title: 'City Name', data: 'name' },
            { title: 'TopNymName', data: 'toponymName' }
            // Add more columns as needed
        ]
    });

    // Fetch countries and populate the select dropdown
    function fetchCountries() {
        return fetch('libs/php/countries.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                let country_city = data;

                let country_options = "<option default> Select country</option>";
                country_city.map(function (country) {
                    country_options += `<option value='${country.code}'> ${country.name}</option>`;
                });

                $("#selCountry").html(country_options);
            })
            .catch(error => {
                console.error(error);
            });
    }

    // Fetch countries on page load
    fetchCountries();

    // Handle button click
    $('#btnRun').click(function () {
        console.log('button clicked');

        $.ajax({
            url: "libs/php/getCountryInfo.php",
            type: 'POST',
            dataType: 'json',
            data: {
                country: $('#selCountry').val(),
                lang: $('#selLanguage').val(),
                cities: $('#selCities').val(),
            },
            success: function (result) {
                console.log({ result });

                const geonames = result.data.geonames;

                // Clear the DataTable and add new data
                dataTable.clear().rows.add(geonames).draw();

                // Rest of your code...
            },
            error: function (err) {
                console.log({ err });
            }
        });
    });
});
