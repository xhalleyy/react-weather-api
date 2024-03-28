'use client'

import { useEffect, useState } from 'react';
import CurrentWeatherComponent from './components/CurrentWeatherComponent';
import ForecastCardComponent from './components/ForecastCardComponent';
import SearchComponent from './components/SearchComponent';
import './weather.css';
import { forecastApi } from '@/Context/DataContext';
import { apiKey } from '@/app/hidekey';
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
    forecastData(latitude, longitude, apiKey);
  }, [])

  const forecastData = async (lat: number, lon: number, apiKey: string) => {
    const fetchedData = await forecastApi(lat, lon, apiKey);
    console.log(fetchedData)
    const currentDate = getFormattedLongDate()
    // console.log(currentDate)

    // filtering out the duplicated dates
    let daysWeather: ForecastType[] = fetchedData.list.map(threeHours => {
      return ({
        date: threeHours.dt_txt.slice(0, 10),
        high: threeHours.main.temp_max,
        low: threeHours.main.temp_min,
        icon: threeHours.weather[0].icon,

      })
    }
    ).filter((obj, index, array) => array.findIndex((o) => o.date === obj.date) === index).filter(x => x.date !== currentDate)

    console.log(daysWeather)
    setForecast(daysWeather)
    // setDate(getDate2(fetchedData.list[startNewDayIndex].dt_txt));
  }

  useEffect(() => {
    if (city) {
      forecastData(latitude, longitude, apiKey);
    }
  }, [weatherCity]);


  return (
    <div className="lightBG min-h-screen">
      <SearchComponent isFavorited={isFavorited} setIsFavorited={setIsFavorited} weatherCity={weatherCity} setWeatherCity={setWeatherCity} city={city} setCity={setCity} setLatitude={setLatitude} setLongitude={setLongitude} />
      <CurrentWeatherComponent isFavorited={isFavorited} setIsFavorited={setIsFavorited} weatherCity={weatherCity} setWeatherCity={setWeatherCity} latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} city={city} />
      <div className='grid grid-cols-5 mt-8 px-5 xl:px-16'>
        {
          forecast.map((day, idx) => <ForecastCardComponent key={idx} date={day.date} high={day.high} low={day.low} icon={day.icon} isFavorited={isFavorited} setIsFavorited={setIsFavorited}/>)
        }
      </div>
    </div>
  );
}
