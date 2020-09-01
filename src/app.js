const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./weather-app/forecast')
const geocode = require('./weather-app/geocode')
const app = express()
const port = process.env.PORT || 3000
// Defined paths of express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname,'../Templates/views')
const partialsPath = path.join(__dirname,'../Templates/partials')
// setup for hbs and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup for static directory to use
app.use(express.static(publicPath));

app.get('',(req,res)=>{
    res.render('index',{
         title:"Weather App",
         name:"Inspiri-tech" 
    })
})

app.get("/about", (req, res) => {
  res.render('about',{
    title:"About",
    name:"Mark Onuoha"
  });
});

app.get("/weather",(req,res)=>{
  if(!req.query.location){
   return res.send({Error:"Please enter a valid location"})
  }else{
    geocode(req.query.location, (error, geocodeResponse) => {
      if (error) {
        return res.send({error:error})
      }
      // console.log(geocodeResponse)
      forecast(geocodeResponse.latitude, geocodeResponse.longitude, (error, forecastResponse) => {
        if (error) {
          return res.send({error:error})
        }
         res.send({
          location: geocodeResponse.location,
          latitude: geocodeResponse.latitude,
          longitude: geocodeResponse.longitude,
          temperature: forecastResponse.temperature,
          feels_like: forecastResponse.feels_like,
          description: forecastResponse.weather,
          precipitation: forecastResponse.precipitation
        });

      })
    })
  }
 
})

app.get('/help',(req,res)=>{
    res.render('help',{
      title:"Get help",
      name:"Mark Onuoha"
    })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title:"404",
    error: "Help article not found",
    name: "Inspiri-Tech",
  });
});

app.get('*',(req,res)=>{
  res.render('404',{
    title: "404",
    error:"Page not found",
    name:"Inspiri-Tech"
  })
})
https://inspiri-tech-weather-app.herokuapp.com/

app.listen(port,()=>{
    console.log("Server Running on port "+port);
})
