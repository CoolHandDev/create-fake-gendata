
var faker = require('faker');
var fs = require('fs');
var conversionType = '';
var numberofRows = 10;

/*

User must pass in paramaters conversion type and number of rows to generate

    Conversion Types
    1. Image
    2. Immunization
    3. Problem
    4. Allergy

*/


process.argv.forEach(function(val, index, array) {
    if(array.length < 4) {
        console.log('Error: Please pass the correct parameters using \'node index.js [conversiontype] [numberOfRows]\'');
    }



})



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