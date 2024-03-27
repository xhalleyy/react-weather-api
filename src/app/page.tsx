'use client'

import CurrentWeatherComponent from './components/CurrentWeatherComponent';
import ForecastCardComponent from './components/ForecastCardComponent';
import SearchComponent from './components/SearchComponent';
import './weather.css';

export default function Home() {
  return (
    <div className="lightBG min-h-screen">
      <SearchComponent/>
      <CurrentWeatherComponent/>
      <div className='grid grid-cols-5 mt-8 px-5 xl:px-16'>
        <ForecastCardComponent/>
        <ForecastCardComponent/>
        <ForecastCardComponent/>
        <ForecastCardComponent/>
        <ForecastCardComponent/>
      </div>
    </div>
  );
}
