// Personal API Key for OpenWeatherMap API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const myApiKey = "3c53ff879c82578f4662293fdb565c63&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.'+ d.getDate()+'.'+ d.getFullYear();

//Access the submit button with ID 'generate'
generateButton = document.getElementById('generate'); 

// Event listener to add function to existing HTML DOM element
generateButton.addEventListener('click', generateData);

//Event listener function with chained promises
function generateData (){
    //get zip number typed in by user 
    zip = document.querySelector('#zip').value;

    //get feelings typed in by user
    feelings = document.querySelector('#feelings').value;

    //get weather data from API 
    getWeather(baseUrl, zip, myApiKey)
    //then post data to server
    .then(function(weatherData){
        postedData = postProjectData('/all', {temp: weatherData.main.temp, date: newDate, feelings: feelings});
    })
    //then update the user interface
    .then(updateMyUi)
    
};


/* Function to GET Web API Data*/
async function getWeather(baseUrl, zip, myApiKey ){
    //create full API link
    const readyUrl = baseUrl + `zip=${zip}&appid=${myApiKey}`;

    //fetch data 
    const fetchData =  await fetch (readyUrl);

    //convert data to JSON 
    const weatherReport = await fetchData.json();

    return weatherReport;
}


/* Function to POST data */
async function postProjectData (myUrl, dataToPost){

    //create POST request to send data to server
    const res = await fetch (myUrl, {
        method: 'POST',
        headers: {
      'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToPost)
    });

    try {
        //convert data to JSON
        const resJson = await res.json();
        return resJson;
    } catch {
        console.log('Type of error: ' + error);
    }
}


async function updateMyUi (){
    //Make a GET request to get the daa from the server
    const rawProjectData = await fetch('/all');
    try {
        //Convert data to JSON
        const data = await rawProjectData.json();

        //Update relevant UI elements to show the data in the UI to the user
        document.getElementById('date').innerHTML = data.temp;
        document.getElementById('temp').innerHTML = data.date;
        document.getElementById('content').innerHTML = data.userInput;
    } catch {
        console.log('Type of error: ' + error)
    }

  }
