import { useEffect, useState } from 'react'
import './App.css'

//images
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.png";
import humidityIcon from "./assets/humidity.png";
import rainIcon from "./assets/rain.png";
import searchIcon from "./assets/search1.jpg";
import snowIcon from "./assets/snow.png";
import windIcon from "./assets/wind.png";

const WeatherDetails = ({icon,temp,city,country,lat,log,humidity,wind}) => {
  return (
    <>
      <div className='image'>
        <img src={icon} alt="Image" />
      </div>
      <div className="temp"> {temp}°C  </div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className='lat'>latitude</span>
          <span>{lat}</span>
        </div>

        <div>
          <span className='lat'>longitude</span>
          <span>{log}</span>
        </div>
      </div>

      <div className="data-comtainer">
        <div className="element">
          <img src="https://openweathermap.org/img/wn/50d@2x.png" height={80}  alt="humidity" className='icon'/>
          <div className="data">
              <div className='humidity-percent'>{humidity}%</div>
              <div className='text'>Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src="https://openweathermap.org/img/wn/04n@2x.png" height={80} alt="humidity" className='icon'/>
          <div className="data">
              <div className='wind-percent'>{wind} km/h</div>
              <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  )
}



function App() {
  const [icon, setIcon] = useState(snowIcon)
  const [temp, setTemp] = useState(0)
  const [city, setCity] = useState("Chennai")
  const [country, setCountry] = useState("IN")
  const [lat, setLat] = useState(0)
  const [log, setLog] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [wind, setWind] = useState(0)

  const [text, setText] = useState("chennai")
  const [cityNotFound,setCityNotFound] = useState(false);
  const [loading,setLoading] = useState(false)

  const search = async () =>{

    setLoading(true)
    let api_key = "7ac12f714fccb5202a1360386bbca8fc"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`
     
    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log("app res",data)

      if(data.cod === "404"){
        console.log("City Not Found")
        setCityNotFound(true)
        setLoading(false)
      }

      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setTemp(Math.floor(data.main.temp))
      setCity(data.name)
      setCountry(data.sys.country)
      setLat(data.coord.lat)
      setLog(data.coord.lon)
      setIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
      setCityNotFound(false)

    } catch (error) {
      console.log("An error occurred",error)
    } finally {
      setLoading(false)
    }

  };

  useEffect(function () {
    search()
  },[]);

  const handleCity = (e) => {
    console.log("onclick",e)
    setText(e.target.value);
  };

  const handleKeyDown = (e) =>{
    console.log("key down",e)
    if(e.key === 'Enter'){
      search();
    }
  };

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type="text" className='cityInput' value={text} placeholder='Search City' onChange={handleCity} onKeyDown={handleKeyDown}/>
          <div className='search-icon' onClick={() => search()}>
            <img src={searchIcon} alt='search' width={30} height={30}/>

          </div>

        </div>
        <WeatherDetails icon={icon} temp={temp} city={city} lat={lat} log={log} country={country} humidity={humidity} wind={wind}/>
        
        <p className='copyright'>Designed by <span>Sudharsan</span></p>
      </div>
    </>
  )
}

export default App
