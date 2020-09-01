
const msgOne =document.querySelector('#forecast')
const msgTwo = document.querySelector('#error')
const weatherForm=document.querySelector('#search-form')
const search = document.querySelector('input')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    msgOne.textContent = "Loading..."
    msgTwo.textContent =""
    // console.log(location);
    fetch(`/weather?location=${location}`).then((response) => {
        
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error
            } else {
                const forecast = `Weather condition at ${data.location} is ${data.description} with temperature at ${data.temperature} degrees but it feels like ${data.feels_like},there is ${data.precipitation}% chance of rainfall`
                msgOne.textContent = forecast
            }
        })
    })
})