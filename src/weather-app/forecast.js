const request = require('request')
const chalk = require('chalk')

 
const forecast = (latitude,longitude,callback)=>{
   const url =`http://api.weatherstack.com/current?access_key=625f312ecac92b02225e7d9c722fdc51&query=${latitude},${longitude}&units=m`
   request({url:url,json:true},(error,response)=>{
      if(error){
         callback("Unable to connect","")
      }else if(response.body.error){
         callback("","Could return weather for the given location")
      }
      else{
         callback("",{
            temperature:response.body.current.temperature,
            feels_like: response.body.current.feelslike,
            precipitation: response.body.current.precip,
            weather: response.body.current.weather_descriptions[0],
            latitude: response.body.location.lat,
            longitude:response.body.location.lon
         }); 
      }
   })
}

// forecast(5.48333,7.03333,(error,forecastResponse)=>{
//    if(error){
//      return
//    }
//     console.log(forecastResponse);

// })
module.exports =forecast