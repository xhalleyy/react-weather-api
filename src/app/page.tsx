'use client'

import { useEffect, useState } from 'react';
import CurrentWeatherComponent from './components/CurrentWeatherComponent';
import ForecastCardComponent from './components/ForecastCardComponent';
import SearchComponent from './components/SearchComponent';
import './weather.css';
import { forecastApi, apiKey } from '@/Data/DataServices';
// import { apiKey } from '@/app/hidekey';
import { getFormattedDate, getFormattedLongDate } from '@/utilies/formatDate';

type ForecastType = {
  date: string,
  high: number,
  low: number,
  icon: string
}



export default function Home() {

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [forecast, setForecast] = useState<ForecastType[]>([]);
  const [city, setCity] = useState<string>('');
  const [weatherCity, setWeatherCity] = useState<string>('');
  const [isFavorited, setIsFavorited] = useState<boolean>(false);



  useEffect(() => {
    forecastData(latitude, longitude);
  }, [])

  const forecastData = async (lat: number, lon: number) => {
    const fetchedData = await forecastApi(lat, lon);
    console.log(fetchedData)
    const currentDate = getFormattedLongDate()

    let daysWeather: ForecastType[] = fetchedData.list.map(threeHours => {
      return ({
        date: threeHours.dt_txt.slice(0, 10),
        high: threeHours.main.temp_max,
        low: threeHours.main.temp_min,
        icon: threeHours.weather[0].icon,

      })
    })
   
    // calling splitArrayByProp to split the list into sub arrays by date
    // then filter out the arrays that has current date
    // filter out the empty array due to current date
    // depending on the time, the day array can be 6 instead of 5, so splice if the length is 6
    let dayArrays = splitArrayByProperty(daysWeather, "date").map(x=> x.filter(x => x.date !== currentDate)).filter(arr => arr.length > 0)
    if(dayArrays.length ===6)
    {
      dayArrays.splice(5,1)
    }

    // creating an object that has the lowest, highest, date and icon
    // Initialize highest max and lowest min with to the first index of the array
    let highsAndLows = dayArrays.map(arr => {
      let highestMax = arr[0].high;
      let lowestMin = arr[0].low;

      // Iterate through the array to reset value of highest max and lowest min
      for (const obj of arr) {
          if (obj.high > highestMax) {
              highestMax = obj.high;
          }
          if (obj.low < lowestMin) {
              lowestMin = obj.low;
          }
      }

      // Return an object containing highest max and lowest min for the array, and taking the date and icon from the first index of the object array
      return {date: arr[0].date, high: highestMax, low: lowestMin, icon: arr[0].icon }
    })
    setForecast(highsAndLows)
  }

  // this function will take in an array of objects and group them by subarray base on what prop is passed in
  function splitArrayByProperty<T>(array: T[], prop: keyof T): T[][] {
    return array.reduce((acc: T[][], obj: T) => {
      //extracts the value of the property specified by prop from the current object obj 
        const key = obj[prop];
        //finds the index of the subarray within acc whose first element (if it exists) has the same value for the property specified by prop as the current object obj.
        //If no such subarray is found, groupIndex will be -1.
        const groupIndex = acc.findIndex(item => item[0] && item[0][prop] === key);
        if (groupIndex !== -1) {
            acc[groupIndex].push(obj);
        } else {
            acc.push([obj]);
        }
        return acc;
    }, []);
}

  useEffect(() => {
    if (city) {
      forecastData(latitude, longitude);
    }
  }, [weatherCity]);

  return (
    <div className="lightBG min-h-screen">
      <SearchComponent isFavorited={isFavorited} setIsFavorited={setIsFavorited} weatherCity={weatherCity} setWeatherCity={setWeatherCity} city={city} setCity={setCity} setLatitude={setLatitude} setLongitude={setLongitude} />
      <CurrentWeatherComponent isFavorited={isFavorited} setIsFavorited={setIsFavorited} weatherCity={weatherCity} setWeatherCity={setWeatherCity} latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} city={city} />
      <div className='grid md:grid-cols-3 lg:grid-cols-5 mt-8 px-5 xl:px-16'>
        {
          forecast.map((day, idx) => <ForecastCardComponent key={idx} date={day.date} high={day.high} low={day.low} icon={day.icon} isFavorited={isFavorited} setIsFavorited={setIsFavorited}/>)
        }
      </div>
    </div>
  );
}
