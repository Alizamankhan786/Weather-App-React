import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const App = () => {

  const val = useRef();

  const [weatherData , setWeatherData] = useState([]);
  const [city , setCity] = useState(``);


  const submitBtn = (event) =>{

    event.preventDefault()
    setCity(val.current.value)
  }

  useEffect(() =>{

    const callApi = async () =>{

      await axios(`https://api.weatherapi.com/v1/current.json?key=2feb46cda2064407bb560452240509&q=${city}&aqi=no`)

      .then((res)=>{
        weatherData.unshift(res.data);
        setWeatherData([...weatherData]);
        val.current.value = ""
      })

      .catch((error)=>{
        console.log(error.message);
        
      })


    }

    callApi();

  } , [city])


  return (
    <>
    <div className='weather' >WEATHER APP</div>
    <form onSubmit={submitBtn} className="max-w-md mx-auto mt-6">

    <div className="flex justify-center items-center w-full">
      <input  id='label' type="search" required  className="border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500  " placeholder="City Name" ref={val} />
</div>

<br />
<br />

<div>
  <button type='submit' className='btn'>Show Weather</button>
</div>

<br />
<br />

</form>

{weatherData.map((item , index)=>{
  return(

    <div key={index} className="mt-10">

  <div className="weather-card " id="weather-card">
        <h3 className='text-black' >{item.location.name}, {item.location.region} , {item.location.country}</h3>
        <div className="weather-icon" id="weather-icon">
          <img id='icon'  className="center size " src={item.current.condition.icon} alt="icon"/></div>
        <div className="temp" >{item.current.temp_c}°C</div>
        <div className="desc" >Wind Speed: {item.current.wind_kph} Kph</div>
    </div>

    
</div>
  )
})}


    </>
  )
}

export default App