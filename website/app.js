/* Global Variables */
const baseURL='http://api.openweathermap.org/data/2.5/weather?zip=';
const Key = ',us&appid=1021aa21e05ea2ab9fe0d880b68e959c';
const generate = document.getElementById('generate');
const date= document.getElementById('date');
const temp= document.getElementById('temp');
const content= document.getElementById('content');
const entryHolder = document.getElementById('entryHolder');

generate.addEventListener('click',clickedGenerateHandler);
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+d.getMonth()+'.'+ d.getFullYear();

function clickedGenerateHandler(e){
    const zipCode = document.getElementById('zip').value;
    const Content = document.getElementById('feelings').value;
    getWeather(baseURL, zipCode, Key)
    .then(function (data){
        date.innerHTML = "Date : "+newDate;
        temp.innerHTML = "Temp : "+data.main.temp;
        content.innerHTML = "Content :"+ Content;
        entryHolder.classList.add('entryHolder');
        postWeather('/add',{
            date:newDate,
            temp: data.main.temp,
            content:Content
        })
})
} 
//ASYNC GET
const getWeather = async (baseUrl, zip, apiKey) => {
    const res = await fetch(baseUrl + zip + apiKey);
    try{
        const data = await res.json();
        return data;
    } catch (error){
        console.log("error",error);
    }
}
//ASYNC POST
const postWeather = async ( url, data) => {
    const req = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    });
    try{
        const newData = await req.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

//UPDATE UI
const updateUI = async () => {
    const request = await fetch ('/all');
    try{
        const alldata = await request.json();
        date.innerHTML = alldata.date;
        temp.innerHTML = alldata.temp;
        content.innerHTML = alldata.content;
    } catch(error){
        console.log("error", error);
    }
}
