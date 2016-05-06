
var faker = require('faker');
var fs = require('fs');
var conversionType = '';
var numberofRows = 10;
var updateFrequency = 1;
/*

User must pass in paramaters conversion type and number of rows to generate

    Conversion Types
    1. Image
    2. Immunization
    3. Problem
    4. Allergy

*/


process.argv.forEach(function(val, index, array) {
    if (array.length < 4) {
        console.log('Error: Please pass the correct parameters using \'node index.js [conversiontype] [numberOfRows]\'');
    }
    if (index === 2) {
        conversionType = val;
    }
    if (index === 3) {
        numberofRows = val;
    }
    /*
        set up update frequency to the user based on data size
    */

    //if between 1 and 100, send a status to user every 10 rows
})
console.log('number of rows passed: ' + numberofRows);
if (numberofRows >= 1 && numberofRows <= 100) {
    updateFrequency = 10;
}
//if between 101 and 1000, send a status to user every 100 rows
if (numberofRows >= 101 && numberofRows <= 1000) {
    updateFrequency = 100;
}
//if between 1001 and 10000, send a status to user every 500 rows
if (numberofRows >= 1001 && numberofRows <= 10000) {
    updateFrequency = 500;
}
//if greater than 10001, send a status to user every 2000 rows
if (numberofRows >= 10001) {
    updateFrequency = 2000;
}
console.log(updateFrequency);

function generateImageGenData() {
    var imageHeader = '';

}

function generateImmunizationGenData() {
    var immunizationHeader = '';
}

function generateProblemGenData() {
    var problemHeader = '';

}

function generateAllergyGenData() {
    var allergyHeader = '';

}