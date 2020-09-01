 const request = require('request')


const forecast = (latitude, longitude, callback) => {
   const url = `http://api.weatherstack.com/current?access_key=625f312ecac92b02225e7d9c722fdc51&query=${latitude},${longitude}&units=m`
   request({ url: url, json: true }, (error, response) => {
      if (error) {
         callback("Unable to connect", "")
      } else if (response.body.error) {
         callback("", "Could return weather for the given location")
      }
      else {
         callback("", {
            temperature: response.body.current.temperature,
            feels_like: response.body.current.feelslike,
            precipitation: response.body.current.precip,
            weather: response.body.current.weather_descriptions[0],
            latitude: response.body.location.lat,
            longitude: response.body.location.lon
         });
      }
   })
}











//  ---------------------------------------------------------------------------------------------------------------------------------------------

const geocode = (place,callback)=>{
const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoibWVrdXotZGV2IiwiYSI6ImNrZGNjZGNhNzFobWYyc2s2ODJqaXYwNnUifQ.1leomh0iy-KjqcZ1Psa84Q&limit=5 `;
request({url:url,json:true},(error,response)=>{
          if(error){
             return callback("unable to connect",undefined)
          }
          else if(response.body.features.length===0){
             callback("unable to find loaction try another search",undefined)
          }else

          callback(undefined,{
             latitude:response.body.features[0].center[1],
             longitude: response.body.features[0].center[0],
             location: response.body.features[0].place_name,
          })
    })
}



module.exports=geocode