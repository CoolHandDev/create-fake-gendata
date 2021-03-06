/*
    This generates a pipe delimited flat file containing fake clinical data
 */


var faker = require('faker');
var fs = require('fs');
//var uuid = require('node-uuid');
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
    5. Vitals

*/
    process.argv.forEach(function(val, index, array) {
        if (array.length < 4) {
            console.log('Error: Please pass the correct parameters using \'node generateFakeGenData.js [conversiontype] [numberOfRows]\'');
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

if (conversionType.toLowerCase() === 'image') {
    console.log(generateImageGenData());
}

if (conversionType.toLowerCase() === 'immunization') {
    console.log(generateImmunizationGenData());
}

if (conversionType.toLowerCase() === 'vitals') {
    console.log(generateVitalsGenData());
}



/*
    Generate the discrete data sets for each clinical type
 */

    //Image
    function generateImageGenData() {
        var imageFields = [
            'src_patient_id', 'src_patient_lastname'
            , 'src_patient_firstname', 'src_patient_middlename'
            , 'src_provider_id', 'src_provider_dea_nbr'
            , 'src_provider_lastname', 'src_provider_firstname'
            , 'src_provider_middlename', 'src_location_id'
            , 'src_location_name', 'encounter_datetime'
            , 'src_doc_type', 'document_description'
            , 'pages_in_file_count', 'logical_group_id'
            , 'page_sequence_nbr', 'batch_name'
            , 'file_path', 'scan_date'
        ];

        var imageHeader = '';
        var imageStream = fs.createWriteStream(faker.random.uuid() + '_ncs_convImg_GENImage.txt')

        buildImageHeader();
        //TODO: hard code for now. Implement config later so we can determine how to fake data based on fields
        function buildImageDataRow() {
            var imageDataString = '';
            imageFields.forEach(function(currentValue, index, array) {
                if (currentValue === 'src_patient_id') {
                    imageDataString += faker.random.uuid();
                }
                if (currentValue === 'src_patient_lastname') {
                    imageDataString += delimiter + faker.name.lastName();
                }
                if (currentValue === 'src_patient_firstname') {
                    imageDataString += delimiter + faker.name.firstName();
                }
                if (currentValue === 'src_patient_middlename') {
                    imageDataString += delimiter + faker.name.lastName();
                }
                if (currentValue === 'src_provider_id') {
                    imageDataString += delimiter + faker.random.uuid();
                }
                if (currentValue === 'src_provider_dea_nbr') {
                    imageDataString += delimiter + faker.random.number();
                }
                if (currentValue === 'src_provider_lastname') {
                    imageDataString += delimiter + faker.name.lastName();
                }
                if (currentValue === 'src_provider_firstname') {
                    imageDataString += delimiter + faker.name.firstName();
                }
                if (currentValue === 'src_provider_middlename') {
                    imageDataString += delimiter + faker.name.lastName();
                }
                if (currentValue === 'src_location_id') {
                    imageDataString += delimiter + faker.random.uuid();
                }
                if (currentValue === 'src_location_name') {
                    imageDataString += delimiter + faker.company.companyName();
                }
                if (currentValue === 'encounter_datetime') {
                    imageDataString += delimiter + (faker.date.past().getMonth() + 1) + '/' + (faker.date.past().getDate()) + '/' + (faker.date.past().getFullYear());
                }
                if (currentValue === 'src_doc_type') {
                    imageDataString += delimiter + faker.random.word();
                }
                if (currentValue === 'document_description') {
                    imageDataString += delimiter + faker.random.words();
                }
                if (currentValue === 'pages_in_file_count') {
                    if(faker.random.number() % 2 === 0){
                        imageDataString += delimiter + '1';
                    } else if (faker.random.number() % 3 === 0) {
                        imageDataString += delimiter + '4';
                    } else {
                        imageDataString += delimiter + '2';
                    }
                }
                if (currentValue === 'logical_group_id') {
                    imageDataString += delimiter + '0';
                }
                if (currentValue === 'page_sequence_nbr') {
                    imageDataString += delimiter + '0';
                }
                if (currentValue === 'batch_name') {
                    imageDataString += delimiter + faker.random.word();
                }
                if (currentValue === 'file_path') {
                    imageDataString += delimiter + 'c:\\image_path\\' + faker.random.word();
                }
                if (currentValue === 'scan_date') {
                    imageDataString += delimiter + (faker.date.past().getMonth() + 1) + '/' + (faker.date.past().getDate()) + '/' + (faker.date.past().getFullYear());
                }
            });
            imageDataString += '\r\n';
            return imageDataString;
        };

        imageStream.once('open', function(fd) {
            imageStream.write(imageHeader);
            imageStream.write('\r\n'); //new line before first line of data
            for(var i = 0; i < numberofRows; i++) {
                imageStream.write(buildImageDataRow());

                if (i % updateFrequency === 0) {
                    console.log(new Date() + ': # of rows written: ' + i);
                }
            }
            console.log(new Date() + ': # of rows written: ' + i);

            imageStream.end();
        });



        function buildImageHeader() {

            imageFields.forEach(function(currentValue, index, array) {
                if (index === 0) {
                    imageHeader = currentValue
                } else {
                    imageHeader += delimiter + currentValue;
                }
            });
        }

        return imageHeader;

    }

    //Immunization
    function generateImmunizationGenData() {
        var immunizationFields = [
            'src_patient_id', 'src_patient_lastname'
            , 'src_patient_firstname', 'src_patient_middlename'
            , 'src_provider_id', 'src_provider_dea_nbr'
            , 'src_provider_lastname', 'src_provider_firstname'
            , 'src_provider_middlename', 'src_location_id'
            , 'src_location_name', 'encounter_datetime'
            , 'administer_date', 'cvx_code'
            , 'cpt4_code', 'vaccine_desc'
            , 'lot_num', 'expiration_date'
            , 'manufacturer_name', 'manufacturer_nbr'
            , 'strength', 'units'
            , 'dose', 'route'
            , 'side', 'site'
            , 'brand_name', 'vaccine_comment'
            , 'src_administered_by'
        ];

        var immunizationHeader = '';
        var immunizationStream = fs.createWriteStream(faker.random.uuid() + '_ncs_convImm_GENImmunization.txt')

        buildImmunizationHeader();
        //TODO: hard code for now. Implement config later so we can determine how to fake data based on fields
        function buildImmunizationDataRow() {
            var immunizationDataString = '';
            immunizationFields.forEach(function(currentValue, index, array) {
                if (currentValue === 'src_patient_id') {
                    immunizationDataString += faker.random.uuid();
                }
                if (currentValue === 'src_patient_lastname') {
                    immunizationDataString += delimiter + faker.name.lastName();
                }
                if (currentValue === 'src_patient_firstname') {
                    immunizationDataString += delimiter + faker.name.firstName();
                }
                if (currentValue === 'src_patient_middlename') {
                    immunizationDataString += delimiter + faker.name.lastName();
                }
                if (currentValue === 'src_provider_id') {
                    immunizationDataString += delimiter + faker.random.uuid();
                }
                if (currentValue === 'src_provider_dea_nbr') {
                    immunizationDataString += delimiter + faker.random.number();
                }
                if (currentValue === 'src_provider_lastname') {
                    immunizationDataString += delimiter + faker.name.lastName();
                }
                if (currentValue === 'src_provider_firstname') {
                    immunizationDataString += delimiter + faker.name.firstName();
                }
                if (currentValue === 'src_provider_middlename') {
                    immunizationDataString += delimiter + faker.name.lastName();
                }
                if (currentValue === 'src_location_id') {
                    immunizationDataString += delimiter + faker.random.uuid();
                }
                if (currentValue === 'src_location_name') {
                    immunizationDataString += delimiter + faker.company.companyName();
                }
                if (currentValue === 'encounter_datetime') {
                    immunizationDataString += delimiter + (faker.date.past().getMonth() + 1) + '/' + (faker.date.past().getDate()) + '/' + (faker.date.past().getFullYear());
                }
                if (currentValue === 'administer_date') {
                    immunizationDataString += delimiter + (faker.date.past().getMonth() + 1) + '/' + (faker.date.past().getDate()) + '/' + (faker.date.past().getFullYear());
                }
                if (currentValue === 'cvx_code') {
                    if(faker.random.number() % 2 === 0){
                        immunizationDataString += delimiter + '123';
                    } else if (faker.random.number() % 3 === 0) {
                        immunizationDataString += delimiter + '05';
                    } else if (faker.random.number() % 7 === 0) {
                        immunizationDataString += delimiter + '07';
                    }
                    else {
                        immunizationDataString += delimiter + '89';
                    }
                }
                if (currentValue === 'cpt4_code') {
                    if(faker.random.number() % 2 === 0){
                        immunizationDataString += delimiter + '90656';
                    } else if (faker.random.number() % 3 === 0) {
                        immunizationDataString += delimiter + '90705';
                    } else if (faker.random.number() % 7 === 0) {
                        immunizationDataString += delimiter + '90704';
                    }
                    else {
                        immunizationDataString += delimiter + '90713';
                    }
                }
                if (currentValue === 'vaccine_desc') {
                    if(faker.random.number() % 2 === 0){
                        immunizationDataString += delimiter + 'Influenza, seasonal, injectable, preservative free';
                    } else if (faker.random.number() % 3 === 0) {
                        immunizationDataString += delimiter + 'measles';
                    } else if (faker.random.number() % 7 === 0) {
                        immunizationDataString += delimiter + 'mumps';
                    }
                    else {
                        immunizationDataString += delimiter + 'IPV';
                    }
                }
                if (currentValue === 'lot_num') {
                    immunizationDataString += delimiter + faker.random.number();
                }
                if (currentValue === 'expiration_date') {
                    immunizationDataString += delimiter + (faker.date.past().getMonth() + 1) + '/' + (faker.date.past().getDate()) + '/' + (faker.date.past().getFullYear());
                }
                if (currentValue === 'manufacturer_name') {
                    immunizationDataString += delimiter + faker.company.companyName();
                }
                if (currentValue === 'manufacturer_nbr') {
                    immunizationDataString += delimiter + faker.random.number();
                }
                if (currentValue === 'strength') {
                    immunizationDataString += delimiter + faker.random.number() / 1000;
                }
                if (currentValue === 'units') {
                    immunizationDataString += delimiter + faker.random.number() / 1000;
                }
                if (currentValue === 'dose') {
                    immunizationDataString += delimiter + faker.random.number() / 1000;
                }
                if (currentValue === 'route') {
                    immunizationDataString += delimiter + 'intramuscular';
                }
                if (currentValue === 'side') {
                    immunizationDataString += delimiter + 'left';
                }
                if (currentValue === 'site') {
                    immunizationDataString += delimiter + 'arm';
                }
                if (currentValue === 'brand_name') {
                    immunizationDataString += delimiter + faker.company.companyName();
                }
                if (currentValue === 'vaccine_comment') {
                    immunizationDataString += delimiter + faker.lorem.paragraphs().replace(/[\n\r]/g, '');
                }
                if (currentValue === 'src_administered_by') {
                    immunizationDataString += delimiter + faker.name.lastName();
                }
            });
            immunizationDataString += '\r\n';
            return immunizationDataString;
        };

        immunizationStream.once('open', function(fd) {
            immunizationStream.write(immunizationHeader);
            immunizationStream.write('\r\n'); //new line before first line of data
            for(var i = 0; i < numberofRows; i++) {
                immunizationStream.write(buildImmunizationDataRow());

                if (i % updateFrequency === 0) {
                    console.log(new Date() + ': # of rows written: ' + i);
                }
            }
            console.log(new Date() + ': # of rows written: ' + i);

            immunizationStream.end();
        });

        function buildImmunizationHeader() {

            immunizationFields.forEach(function(currentValue, index, array) {
                if (index === 0) {
                    immunizationHeader = currentValue
                } else {
                    immunizationHeader += delimiter + currentValue;
                }
            });
        }

        return immunizationHeader;
    }

    //Problem and Chronic Problem
    function generateProblemGenData() {
        var problemHeader = '';

    }

    //Allergy
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
        //var uniqId = uuid.v4();
        var allergyStream = fs.createWriteStream(faker.random.uuid() + '_ncs_convAlg_GENallergy.txt')

        buildAllergyHeader();
        //TODO: hard code for now. Implement config later so we can determine how to fake data based on fields
        function buildAllergyDataRow() {
            var allergyDataString = '';
            allergyFields.forEach(function(currentValue, index, array) {
                if (currentValue === 'src_patient_id') {
                    allergyDataString += faker.random.uuid();
                }
                if (currentValue === 'src_patient_lastname') {
                    allergyDataString += delimiter + faker.name.lastName();
                }
                if (currentValue === 'src_patient_firstname') {
                    allergyDataString += delimiter + faker.name.firstName();
                }
                if (currentValue === 'src_patient_middlename') {
                    allergyDataString += delimiter + faker.name.lastName();
                }
                if (currentValue === 'src_provider_id') {
                    allergyDataString += delimiter + faker.random.uuid();
                }
                if (currentValue === 'src_provider_dea_nbr') {
                    allergyDataString += delimiter + faker.random.number();
                }
                if (currentValue === 'src_provider_lastname') {
                    allergyDataString += delimiter + faker.name.lastName();
                }
                if (currentValue === 'src_provider_firstname') {
                    allergyDataString += delimiter + faker.name.firstName();
                }
                if (currentValue === 'src_provider_middlename') {
                    allergyDataString += delimiter + faker.name.lastName();
                }
                if (currentValue === 'src_location_id') {
                    allergyDataString += delimiter + faker.random.uuid();
                }
                if (currentValue === 'src_location_name') {
                    allergyDataString += delimiter + faker.company.companyName();
                }
                if (currentValue === 'encounter_datetime') {
                    allergyDataString += delimiter + (faker.date.past().getMonth() + 1) + '/' + (faker.date.past().getDate()) + '/' + (faker.date.past().getFullYear());
                }
                if (currentValue === 'src_allergy_id') {
                    allergyDataString += delimiter + faker.random.uuid();
                }
                if (currentValue === 'src_allergy_desc') {
                    allergyDataString += delimiter + 'allergy_' + faker.lorem.word();
                }
                if (currentValue === 'src_severity') {
                    if(faker.random.number() % 2 === 0){
                        allergyDataString += delimiter + 'moderate';
                    } else if (faker.random.number() % 3 === 0) {
                        allergyDataString += delimiter + 'light';
                    } else {
                        allergyDataString += delimiter + 'severe';
                    }
                }
                if (currentValue === 'date_onset') {
                    allergyDataString += delimiter + (faker.date.past().getMonth() + 1) + '/' + (faker.date.past().getDate()) + '/' + (faker.date.past().getFullYear());
                }
                if (currentValue === 'date_resolved') {
                    allergyDataString += delimiter + (faker.date.past().getMonth() + 1) + '/' + (faker.date.past().getDate()) + '/' + (faker.date.past().getFullYear());
                }
                if (currentValue === 'rxn_desc') {
                    allergyDataString += delimiter + faker.lorem.sentence();
                }
                if (currentValue === 'allergy_comment') {
                    allergyDataString += delimiter + faker.lorem.paragraph();
                }
            });
            allergyDataString += '\r\n';
            return allergyDataString;
        };

        allergyStream.once('open', function(fd) {
            allergyStream.write(allergyHeader);
            allergyStream.write('\r\n'); //new line before first line of data
            for(var i = 0; i < numberofRows; i++) {
                allergyStream.write(buildAllergyDataRow());

                if (i % updateFrequency === 0) {
                    console.log(new Date() + ': # of rows written: ' + i);
                }
            }
            console.log(new Date() + ': # of rows written: ' + i);

            allergyStream.end();
        });



        function buildAllergyHeader() {

            allergyFields.forEach(function(currentValue, index, array) {
                if (index === 0) {
                    allergyHeader = currentValue
                } else {
                    allergyHeader += delimiter + currentValue;
                }
            });
        }

        return allergyHeader;

    }

    //Vitals
    function generateVitalsGenData() {
        var vitalsFields = [
            'src_patient_id', 'src_patient_lastname'
            , 'src_patient_firstname', 'src_patient_middlename'
            , 'src_provider_id', 'src_provider_dea_nbr'
            , 'src_provider_lastname', 'src_provider_firstname'
            , 'src_provider_middlename', 'src_location_id'
            , 'src_location_name', 'encounter_datetime'
            , 'vitals_datetime', 'vitals_comments'
            , 'temp_deg_F', 'temp_deg_C'
            , 'temp_site', 'temp_comment'
            , 'pulse_rate', 'pulse_pattern'
            , 'pulse_site', 'pulse_method'
            , 'pulse_ox_rest', 'pulse_ox_amb'
            , 'pulse_ox_timing', 'pulse_comment'
            , 'resp_rate', 'resp_pattern'
            , 'resp_comment', 'height_in'
            , 'height_ft', 'height_cm'
            , 'height_m', 'height_comment'
            , 'weight_oz', 'weight_gm'
            , 'weight_kg', 'weight_lb'
            , 'weight_comment', 'bmi_calc'
            , 'bp_site', 'bp_body_position'
            , 'bp_systolic', 'bp_diastolic'
            , 'bp_cuff_size', 'bp_comment'
            , 'head_circ_in', 'head_circ_cm'
            , 'peakFlow', 'peakFlowComments'
        ];

        var vitalsHeader = '';
        //var uniqId = uuid.v4();
        var vitalsStream = fs.createWriteStream(faker.random.uuid() + '_ncs_convVtl_GENVitals.txt')

        buildVitalsHeader();
        //TODO: hard code for now. Implement config later so we can determine how to fake data based on fields
        function buildVitalsDataRow() {
            var vitalsDataString = '';
            vitalsFields.forEach(function(currentValue, index, array) {
                if (currentValue === 'src_patient_id') {
                    vitalsDataString += faker.random.uuid();
                }
                if (currentValue === 'src_patient_lastname') {
                    vitalsDataString += delimiter + faker.name.lastName();
                }
                if (currentValue === 'src_patient_firstname') {
                    vitalsDataString += delimiter + faker.name.firstName();
                }
                if (currentValue === 'src_patient_middlename') {
                    vitalsDataString += delimiter + faker.name.lastName();
                }
                if (currentValue === 'src_provider_id') {
                    vitalsDataString += delimiter + faker.random.uuid();
                }
                if (currentValue === 'src_provider_dea_nbr') {
                    vitalsDataString += delimiter + faker.random.number();
                }
                if (currentValue === 'src_provider_lastname') {
                    vitalsDataString += delimiter + faker.name.lastName();
                }
                if (currentValue === 'src_provider_firstname') {
                    vitalsDataString += delimiter + faker.name.firstName();
                }
                if (currentValue === 'src_provider_middlename') {
                    vitalsDataString += delimiter + faker.name.lastName();
                }
                if (currentValue === 'src_location_id') {
                    vitalsDataString += delimiter + faker.random.uuid();
                }
                if (currentValue === 'src_location_name') {
                    vitalsDataString += delimiter + faker.company.companyName();
                }
                if (currentValue === 'encounter_datetime') {
                    vitalsDataString += delimiter + (faker.date.past().getMonth() + 1) + '/' + (faker.date.past().getDate()) + '/' + (faker.date.past().getFullYear());
                }
                if (currentValue === 'vitals_datetime') {
                    vitalsDataString += delimiter + (faker.date.past().getMonth() + 1) + '/' + (faker.date.past().getDate()) + '/' + (faker.date.past().getFullYear());
                }
                if (currentValue === 'vitals_comments') {
                    vitalsDataString += delimiter + faker.lorem.sentence()
                }
                if (currentValue === 'temp_deg_F') {
                    vitalsDataString += delimiter + faker.random.number() / 1000;
                }
                if (currentValue === 'temp_deg_C') {
                    vitalsDataString += delimiter + faker.random.number() / 1000;
                }
                if (currentValue === 'temp_site') {
                    vitalsDataString += delimiter + 'forehead';
                }
                if (currentValue === 'temp_comment') {
                    vitalsDataString += delimiter + faker.lorem.sentence();
                }
                if (currentValue === 'pulse_rate') {
                    vitalsDataString += delimiter + faker.random.number() / 1000;
                }
                if (currentValue === 'pulse_pattern') {
                    vitalsDataString += delimiter + 'regular';
                }
                if (currentValue === 'pulse_site') {
                    vitalsDataString += delimiter + 'wrist';
                }
                if (currentValue === 'pulse_method') {
                    vitalsDataString += delimiter + 'manual';
                }
                if (currentValue === 'pulse_ox_rest') {
                    vitalsDataString += delimiter + '70';
                }
                if (currentValue === 'pulse_ox_amb') {
                    vitalsDataString += delimiter + '100';
                }
                if (currentValue === 'pulse_ox_timing') {
                    vitalsDataString += delimiter + '10 seconds';
                }
                if (currentValue === 'pulse_comment') {
                    vitalsDataString += delimiter + faker.lorem.sentence();
                }
                if (currentValue === 'resp_rate') {
                    vitalsDataString += delimiter + faker.random.number() / 1000;
                }
                if (currentValue === 'resp_pattern') {
                    vitalsDataString += delimiter + 'regular';
                }
                if (currentValue === 'resp_comment') {
                    vitalsDataString += delimiter + faker.lorem.sentence();
                }
                if (currentValue === 'height_in') {
                    vitalsDataString += delimiter + faker.random.number() / 1000;
                }
                if (currentValue === 'height_ft') {
                    vitalsDataString += delimiter + faker.random.number() / 1000;
                }
                if (currentValue === 'height_cm') {
                    vitalsDataString += delimiter + faker.random.number() / 1000;
                }
                if (currentValue === 'height_m') {
                    vitalsDataString += delimiter + faker.random.number() / 1000;
                }
                if (currentValue === 'height_comment') {
                    vitalsDataString += delimiter + faker.lorem.sentence();
                }
                if (currentValue === 'weight_oz') {
                    vitalsDataString += delimiter + faker.random.number() / 1000;
                }
                if (currentValue === 'weight_gm') {
                    vitalsDataString += delimiter + faker.random.number() / 1000;
                }
                if (currentValue === 'weight_kg') {
                    vitalsDataString += delimiter + faker.random.number() / 1000;
                }
                if (currentValue === 'weight_lb') {
                    vitalsDataString += delimiter + faker.random.number() / 1000;
                }
                if (currentValue === 'weight_comment') {
                    vitalsDataString += delimiter + faker.lorem.sentence() / 1000;
                }
                if (currentValue === 'bmi_calc') {
                    vitalsDataString += delimiter + Math.floor(Math.random() * (30 - 20 + 1)) + 20;
                }
                if (currentValue === 'bmi_site') {
                    vitalsDataString += delimiter + 'stomach';
                }
                if (currentValue === 'bp_site') {
                    vitalsDataString += delimiter + 'left arm';
                }
                if (currentValue === 'bp_body_position') {
                    vitalsDataString += delimiter + 'sitting';
                }
                if (currentValue === 'bp_systolic') {
                    vitalsDataString += delimiter + Math.floor(Math.random() * (140 - 100 + 1)) + 100;
                }
                if (currentValue === 'bp_diastolic') {
                    vitalsDataString += delimiter + Math.floor(Math.random() * (115 - 70 + 1)) + 115;
                }
                if (currentValue === 'bp_cuff_size') {
                    vitalsDataString += delimiter + Math.floor(Math.random() * (10 - 6 + 1)) + 10;
                }
                if (currentValue === 'bp_comment') {
                    vitalsDataString += delimiter + faker.lorem.sentence();
                }
                if (currentValue === 'head_circ_in') {
                    vitalsDataString += delimiter + Math.floor(Math.random() * (15 - 6 + 1)) + 15;
                }
                if (currentValue === 'head_circ_cm') {
                    vitalsDataString += delimiter + Math.floor(Math.random() * (30 - 15 + 1)) + 30;
                }
                if (currentValue === 'peakFlow') {
                    vitalsDataString += delimiter + faker.random.number();
                }
                if (currentValue === 'peakFlowComments') {
                    vitalsDataString += delimiter + faker.lorem.sentence();
                }
            });
            vitalsDataString += '\r\n';
            return vitalsDataString;
        };

        vitalsStream.once('open', function(fd) {
            vitalsStream.write(vitalsHeader);
            vitalsStream.write('\r\n'); //new line before first line of data
            for(var i = 0; i < numberofRows; i++) {
                vitalsStream.write(buildVitalsDataRow());

                if (i % updateFrequency === 0) {
                    console.log(new Date() + ': # of rows written: ' + i);
                }
            }
            console.log(new Date() + ': # of rows written: ' + i);

            vitalsStream.end();
        });



        function buildVitalsHeader() {

            vitalsFields.forEach(function(currentValue, index, array) {
                if (index === 0) {
                    vitalsHeader = currentValue
                } else {
                    vitalsHeader += delimiter + currentValue;
                }
            });
        }

        return vitalsHeader;

    }