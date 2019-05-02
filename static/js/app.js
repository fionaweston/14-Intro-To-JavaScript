// from data.js
var tableData = data;

// Get references to the tbody element, input field and button
var $tbody = document.querySelector('tbody');
var $dateInput = document.querySelector('#date');
var $cityInput = document.querySelector('#city');
var $stateInput = document.querySelector('#state');
var $shapeInput = document.querySelector('#shape');
var $countryInput = document.querySelector('#country');
var $filterButton = document.querySelector('#filter-btn');
var $resetButton = document.querySelector("#reset-btn");

// Add an event listener for the Filter Table button, call searchData function when clicked
$filterButton.addEventListener('click', searchData);
$resetButton.addEventListener('click', resetFilter);

function resetFilter() {
   // Clearing the input fields
   datetimeInput.value = "";
   cityInput.value = "";
   stateInput.value = "";
   shapeInput.value = "";
   countryInput.value = "";
}

function capitalizeWords(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// printData prints the tableData to the tbody in table format
function printData() {
    // initialize the tbody code on reload/search
    $tbody.innerHTML = '';
    // Loop through the current data table
    for (var i = 0; i < tableData.length; i++) {
        // Get get the current entry and its fields
        var entry = tableData[i];
        var fields = Object.keys(entry);
   
        // Create a new row in the tbody, set the index to be the current data table entry number
        var $row = $tbody.insertRow(i);
        for (var j = 0; j < fields.length; j++) {
            var field = fields[j];
            var $cell = $row.insertCell(j);

            // fill the cell with correctly formated data
            if (field == "state" || field == "country") { $cell.innerText = entry[field].toUpperCase(); }
            else if (field == "city") { $cell.innerText = capitalizeWords(entry[field]); }
            else if (field == "comments") { $cell.innerHTML = entry[field].toUpperCase(); }
            else { $cell.innerText = entry[field]; }
        }
    }
}

function searchData(event) {

    // Limit the amount of data printed to the search results
    event.preventDefault();

    // Format the user's search strings by removing leading and trailing whitespace, lowercase if string for easier match
    var filterDate = $dateInput.value.trim();
    var filterCity = $cityInput.value.trim().toLowerCase();
    var filterState = $stateInput.value.trim().toLowerCase();
    var filterShape = $shapeInput.value.trim().toLowerCase();
    var filterCountry = $countryInput.value.trim().toLowerCase();

    // Set tableData to an array of all matches of fields set
    tableData = data.filter(function(entry) {
        var retval = true;
        var reportDate = entry.datetime;
        var reportCity = entry.city;
        var reportState = entry.state;
        var reportShape = entry.shape;
        var reportCountry = entry.country;

        // If true, add the report to the tableData, otherwise don't add it to tableData
        if (filterDate != "" && reportDate != filterDate) retval = false;
        if (filterCity != "" && reportCity != filterCity) retval = false;
        if (filterState != "" && reportState != filterState) retval = false;
        if (filterShape != "" && reportShape != filterShape) retval = false;
        if (filterCountry != "" && reportCountry != filterCountry) retval = false;
        return retval;
    });

    printData();
}

// Print out the table for the first time on page load
printData();
