// Personal API Key for OpenWeatherMap API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const myApiKey = "3c53ff879c82578f4662293fdb565c63";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.'+ d.getDate()+'.'+ d.getFullYear();

//Access the submit button with ID 'generate'
generateButton = document.getElementById('generate'); 

// //Access feelings textarea with ID 'feelings'
// feelingText = document.getElementById('feelings');

// Event listener to add function to existing HTML DOM element
generateButton.addEventListener('click', generateData);

function generateData (){
    zip = document.querySelector('#zip').value;
    feelings = document.querySelector('#feelings').value;

    getWeather(baseUrl, zip, myApiKey)
    .then(function(weatherData){
        console.log(weatherData.main.temp);
        //console.log(feelings);
        postedData = postProjectData('/all', {temp: weatherData.main.temp, date: newDate, feelings: feelings});
    })
    .then(updateMyUi)
    
};


/* Function to GET Web API Data*/
async function getWeather(baseUrl, zip, myApiKey ){
    const readyUrl = baseUrl + `zip=${zip}&appid=${myApiKey}`;
    const fetchData =  await fetch (readyUrl);
    const weatherReport = await fetchData.json();
    return weatherReport;
}


/* Function to POST data */
async function postProjectData (myUrl, dataToPost){
    const res = await fetch (myUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
      'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToPost)
    });

    try {
        const resJson = await res.json();
        return resJson;
    } catch {
        console.log('Type of error: ' + error);
    }
}

/* Function to GET Project Data */
// async function getProjectData (myUrl){
//     const rawProjectData = await fetch(myUrl);
//     try {
//         const projectData = await rawProjectData.json();
//         return projectData;
//     } catch {
//         console.log('Type of error: ' + error)
//     }
    
// }


async function updateMyUi (){
    const rawProjectData = await fetch('/all');
    try {
        const data = await rawProjectData.json();
        console.log(data);
        document.getElementById('date').innerHTML = data.temp;
        document.getElementById('temp').innerHTML = data.date;
        document.getElementById('content').innerHTML = data.userInput;
    } catch {
        console.log('Type of error: ' + error)
    }
    //console.log(data);

        //const data = await getProjectData ('/all');
   

  }