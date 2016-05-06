/*
    This generate a pipe delimited flat file containing fake clinical data
 */


var faker = require('faker');
var fs = require('fs');
var conversionType = '';
var numberofRows = 10;
var updateFrequency = 1;
var delimiter = '|';

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
    console.log('Update frequency: ' + updateFrequency);
    console.log('Conversion type: ' + conversionType);

if (conversionType.toLowerCase() === 'allergy') {
    console.log(generateAllergyGenData());
}


/*
    Generate the discrete data sets for each clinical type

 */
    function generateImageGenData() {
        var imageHeader = '';

    }

    function generateImmunizationGenData() {
        var immunizationHeader = '';
    }

    function generateProblemGenData() {
        var problemHeader = '';

    }

    //Generate allergy data
        function generateAllergyGenData() {
            var allergyFields = [
                                    'src_patient_id', 'src_patient_lastname'
                                    , 'src_patient_firstname', 'src_patient_middlename'
                                    , 'src_provider_id', 'src_provider_dea_nbr'
                                    , 'src_provider_lastname', 'src_provider_firstname'
                                    , 'src_provider_middlename', 'src_location_id'
                                    , 'src_location_name', 'encounter_datetime'
                                    , 'src_allergy_id', 'src_allergy_desc'
                                    , 'src_severity', 'date_onset'
                                    , 'date_resolved', 'rxn_desc'
                                    , 'allergy_comment'
                                ];

            var allergyHeader = '';

            buildAllergyHeader();

            function buildAllergyHeader() {

                allergyFields.forEach(function(currentValue, index, array) {
                    if (index === 0) {
                        allergyHeader += currentValue
                    }
                    allergyHeader += delimiter + currentValue;
                });
            }

            return allergyHeader;

        }