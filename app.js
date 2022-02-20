const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})


app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "01dee55d079cf2f8a54e8eb3f925040e";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";

  https.get(url, function(response){
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
      res.write("<h1>Tempreature in " + query + " is "+temp + " degrees Celcius.</h1>")
      res.write("<h3>Weather is currently "+ weatherDescription + ".</h3>");
      res.write("<img src=" + iconUrl + ">");
      res.send();
    })
  });
});

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
