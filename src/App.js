import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import "./styles.css"
import 'bootstrap/dist/css/bootstrap.min.css'
const api={key:"f3edadd442b5f5b938a8a11c21b31f86",
base:"https://api.openweathermap.org/data/2.5/"}
const App=()=>
{

    const [query,setQuery]=useState("")
    const [weather,setWeather]=useState({})
    const search=e=>
    {
        if(e.key==="Enter")
        {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res=>res.json())
            .then(result=>{setWeather(result)
            setQuery("")
            console.log(result)
        })
           
        }
    }
    
    const dateBuilder=(d)=>
    {

        const months=["January","February","March","April","May","June","July","August",
    "September","October","November","December"]
    const days=["Sunday","Monday","Tuesday",
"Wedenesday","Thursday","Friday","Saturday"]
let day=days[d.getDay()]
let date=d.getDate()
let month=months[d.getMonth()]
let year=d.getFullYear()
return `${day} ${date} ${month} ${year}`
    }


    return(<div className={(typeof weather.main !="undefined" ? ((weather.main.temp>16) ? "app warm" : "app") : "app")}>
<main>
    <div className='search-box'>
<input type="text"
className='search-bar'
placeholder='Search...'
onChange={e=>setQuery(e.target.value)}
value={query}
onKeyPress={search}
/>
    </div>
{(typeof weather.main !="undefined" ? (<div>
    <div className='location-box'>
<div className='location'>{weather.name}, {weather.sys.country}</div>
<div className='date'>
    {dateBuilder(new Date())}
</div>
    </div>
    <div className='weather-box'>
    <div className='temp'>
{Math.round(weather.main.temp)}°
    </div>
    <div className='weather'>
{weather.weather[0].description}
    </div>   
    <br />
    <br />
    <div className='cards'>
<div className='container'>
<div className='row'>
    <div className='col-xl-4 col-lg-4 col-sm-12'>
        <div className='temp2'>Feels Like {Math.round(weather.main.feels_like)}°</div>
        </div>
        <div className='col-xl-4 col-lg-4 col-sm-12'>
        <div className='temp2'>Humidity: {weather.main.humidity}%</div>
        </div>
        <div className='col-xl-4 col-lg-4 col-sm-12'>
        <div className='temp2'>Wind: {Math.round(weather.wind.speed+2)} Mph</div>
        </div>
    </div>
    <div className='row'>
    <div className='col-xl-6 col-lg-6 col-sm-12'>
        <div className='temp2'>Latitude {weather.coord.lat}</div>
        </div>
        <div className='col-xl-6 col-lg-6 col-sm-12'>
        <div className='temp2'>Longitude: {weather.coord.lon}</div>
        </div>
  
    </div>
</div>
    </div>
    </div>
</div>) : <div className='showMessage'>
    Please search a location
</div>)}


</main>
    </div>)
}
export default App