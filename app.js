// Express JS Server Initialization functions.

const express = require("express");
const app = express();

app.get("/", function (req, res) {
    run(res);
});

app.listen(8080, function () {
    console.log("Visit http://localhost:8080");
});

//------------------------------------------------------------------
//   Functions START
/**
 * Calculates BMI Index value for given weight and height of Gender
 * @param {number} height 
 * @param {number} weight 
 * @param {number} isHeightCM 
 * @returns number
 */


/**
 * Calculation of range, category, risk factors for given BMI input
 * @param {number} bmi 
 * @returns Object
 */
 function fetchBMIStatistics(bmiIndex)
{
    bmiStatsData = {range: "", category: "", risk: ""};
    if (bmiIndex <= 18.4){
        bmiStatsData.range = "18.4 and Below";
        bmiStatsData.category = "Underweight";
        bmiStatsData.risk = "Malnutrition Risk";
    }
    else if (bmiIndex >= 18.5 && bmiIndex <= 24.9){
        bmiStatsData.range = "18.5 - 24.9";
        bmiStatsData.category = "Normal Weight";
        bmiStatsData.risk = "Low Risk";
    }
    else if (bmiIndex >= 25 && bmiIndex <= 29.9){
        bmiStatsData.range = "25 - 29.9";
        bmiStatsData.category = "Overweight";
        bmiStatsData.risk = "Enhanced Risk";
    }
    else if (bmiIndex >= 30 && bmiIndex <= 34.9){
        bmiStatsData.range = "30 - 34.9";
        bmiStatsData.category = "Moderately Obese";
        bmiStatsData.risk = "Medium Risk";
    }
    else if (bmiIndex >= 35 && bmiIndex <= 39.9){
        bmiStatsData.range = "35 - 39.9";
        bmiStatsData.category = "Severely Obese";
        bmiStatsData.risk = "High Risk";
    }
    else
    {
        bmiStatsData.range = "40 and above";
        bmiStatsData.category = "Very Severely Obese";
        bmiStatsData.risk = "Very High Risk";
    }
    return bmiStatsData;
}

// Functions END

function calculateBMIData(height, weight, isHeightCM = false)
{
    if(isHeightCM)
        height = height / 100;
    return (weight / (height * height)).toFixed(1);
}


//------------------------------------------------------------------
// Output Rendering Utility Functions

/**
 * Prints the label and value with a line break.
 * @param {response} res 
 * @param {string} label 
 * @param {*} value 
 */
function writeToDataResponse(res, label, value)
{
    res.write(label + ": " + value + "<br/>");
}

/**
 
 * @param {response} res 
 */
function drawLineToResponseData(res)
{
    res.write("<hr/>");
}

// Sample Data Excecution
/**
 * Runs the BMI calculations on sample JSON data
 * @param {response} res 
 */
function run(res)
{
    sampleJSONData = [
        {
            "Gender": "Male",
            "HeightCm": 171,
            "WeightKg": 96
        },
        {
            "Gender": "Male",
            "HeightCm": 161,
            "WeightKg": 85
        },
        {
            "Gender": "Male",
            "HeightCm": 180,
            "WeightKg": 77
        },
        {
            "Gender": "Female",
            "HeightCm": 166,
            "WeightKg": 62
        },
        {
            "Gender": "Female",
            "HeightCm": 150,
            "WeightKg": 70
        },
        {
            "Gender": "Female",
            "HeightCm": 167,
            "WeightKg": 82
        }
    ];
    res.setHeader('Content-Type', 'text/html');
    sampleJSONData.forEach(data => {
        bmidata = calculateBMIData(data.HeightCm, data.WeightKg, true);
        bmiStatsdata = fetchBMIStatistics(bmidata);
        writeToDataResponse(res, "Gender", data.Gender);
        writeToDataResponse(res, "Height In (cm)", data.HeightCm);
        writeToDataResponse(res, "Weight In (kg)", data.WeightKg) ;
        writeToDataResponse(res, "BMI", bmidata) ;
        writeToDataResponse(res, "BMI Category", bmiStatsdata.category) ;
        writeToDataResponse(res, "BMI Range", bmiStatsdata.range) ;
        writeToDataResponse(res, "Health Risk", bmiStatsdata.risk) ;
        drawLineToResponseData(res);
    });
    res.end();
}