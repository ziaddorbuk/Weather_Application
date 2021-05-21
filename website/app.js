var input = document.querySelector('.input_text');
var feeling = document.getElementById('feeling');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var date = document.querySelector('.date');
var button= document.querySelector('.submit');

const apiKey = '7206b5ade23555ede8556b0b97b6db5a';

let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
//event listner triggered onClick
button.addEventListener('click', function(name){
  console.log(input.value);
fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${input.value},&units=metric&appid=${apiKey}`)
.then(response => response.json())
.then(data => {
  // if responce: get temp and name of the city drom the ressponce
  var tempValue = data['main']['temp'];
  var nameValue = data['name'];
  //converting input text (feeling) to readable text
  var inText = feeling.value;
  // posting data from API to server
  postData('/add',{temp:parseInt(tempValue),cityName:nameValue,feeling: inText,date:newDate});
  // updating the UI after the server responce
  updateUI();

  

})

.catch(err => alert("Wrong zip code!"));
});
//initiallizing post request to the server
const postData = async(url='',data={})=>{
  const res = await fetch(url,{
      method:'POST',
      credentials:'same-origin',
      headers:{
          'Content-Type':'application/json',
      },
      body:JSON.stringify(data)
  });
  try{
      const newData = await res.json();
      return newData;
  }catch(e){
      console.log("error at posting data to server"+e);
  }
}
const updateUI= async () => {
  //making a get request from the server with the data
  const req = await fetch('/home');
  try{
    // chack for valied data then update the UI
      const allData = await req.json();
      main.innerHTML = `City: ${allData.name}`;
      temp.innerHTML = `${allData.temp}°C`;
      date.innerHTML = `date:${allData.date}`;
      desc.innerHTML = `feeling: ${allData.feeling}`
  }catch(e){
      console.log("error at updatting UI"+e);
  }
}
