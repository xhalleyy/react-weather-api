'use client'

import React, { useEffect, useState } from 'react'
import { IPosition, ICities, IForecast, ICurrentWeather } from '@/interfaces/interface'
import {currentWeatherApi} from '@/Context/DataContext'
import { apiKey } from '@/app/hidekey'

type CurrentWeatherProp = {
  latitude: number
  setLatitude: React.Dispatch<React.SetStateAction<number>>
  longitude: number
  setLongitude: React.Dispatch<React.SetStateAction<number>>
}

const CurrentWeatherComponent = ({latitude, setLatitude, longitude, setLongitude}: CurrentWeatherProp) => {

  // const [latitude, setLatitude] = useState<number>(0);
  // const [longitude, setLongitude] = useState<number>(0);
  const [location, setLocation] = useState<string>('CURRENT LOCATION')
  const [date, setDate] = useState<string>('');
  const [currentTemp, setCurrentTemp] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [maxTemp, setMaxTemp] = useState<string>('');
  const [minTemp, setMinTemp] = useState<string>('');
  const [feelsLike, setFeelsLike] = useState<string>('');
  const [ humidity, setHumidity] = useState<string>('');

  const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const endings =['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st'];


  useEffect(() => {

    const success = (position: IPosition) => {
      currentWeatherData(position.coords.latitude, position.coords.longitude, apiKey);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    }

    navigator.geolocation.getCurrentPosition(success, (error) => {
      console.error('Error getting user location:', error);
    });

    
  }, [])
  
  const currentWeatherData = async (lat: number, lon: number, apiKey: string) => {
    try {
      const fetchedData = await currentWeatherApi(lat, lon, apiKey);
      setLocation(`${fetchedData.name.toUpperCase()}, ${fetchedData.sys.country}`)
      setDate(getDate(fetchedData.dt));
      setCurrentTemp(`${Math.floor(fetchedData.main.temp)}°`)
      setDescription(fetchedData.weather[0].description);
      setMaxTemp(`${Math.floor(fetchedData.main.temp_max)}°`)
      setMinTemp(`${Math.floor(fetchedData.main.temp_min)}°`);
      setFeelsLike(`${Math.floor(fetchedData.main.feels_like)}°`)
      setHumidity(`${Math.floor(fetchedData.main.humidity)}%`)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getDate = (time:number) => {
    let date = new Date(time *1000);
    let month = date.getMonth();
    let today = date.getDate();
    let day = date.getDay();
    let formattedDate = `${days[day]}, ${months[month]} ${today}${endings[today]}`;

    return formattedDate;
  }

  return (
    <div className='px-20 xl:px-32'>
      <h1 className='font-roadrage text-7xl 2xl:text-8xl text-black ps-4 mb-1'>{location}</h1>
      <div className='light-green px-10 py-5 rounded-xl grid grid-cols-7 items-center'>
        <div className='col-span-3 text-black font-sometype-mono border-r border-lime-600'>
          <p className='text-3xl xl:text-4xl'>TODAY</p>
          <p className='text-2xl xl:text-3xl'>{date}</p>
          <div className='flex justify-center items-center'>
            <img src="" alt="" />
            <div className='text-center pb-4 pt-1'>
              <p className='font-orbitron text-6xl xl:text-7xl pb-2'>{currentTemp}</p>
              <p className='text-lg xl:text-2xl'>{description}</p>
            </div>
          </div>
        </div>
        <div className='col-span-4 text-black'>
          <div className='grid grid-cols-2 justify-center items-center'>
            <div className='col-span-1 flex flex-col justify-center items-center mb-5'>
              <p className='font-sometype-mono text-2xl mb-2'>Max. Temperature</p>
              <p className='font-orbitron-reg text-3xl'>{maxTemp}</p>
            </div>
            <div className='col-span-1 flex flex-col justify-center items-center mb-5'>
              <p className='font-sometype-mono text-2xl mb-2'>Min. Temperature</p>
              <p className='font-orbitron-reg text-3xl'>{minTemp}</p>
            </div>
            <div className='col-span-1 flex flex-col justify-center items-center'>
              <p className='font-sometype-mono text-2xl mb-2'>Feels Like</p>
              <p className='font-orbitron-reg text-3xl'>{feelsLike}</p>
            </div>
            <div className='col-span-1 flex flex-col justify-center items-center'>
              <p className='font-sometype-mono text-2xl mb-2'>Humidity</p>
              <p className='font-orbitron-reg text-3xl'>{humidity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeatherComponent
