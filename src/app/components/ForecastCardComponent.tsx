'use client'

import React from 'react'
import { apiKey } from '@/hidekey'
import { forecastApi } from '@/Context/DataContext'

const ForecastCardComponent = () => {

//   const forecastData = async(lat:number, lon: number, apiKey: string){
//     // const fetchedData = await forecastApi(latitude, longitude, apiKey);
//   }


  return (
    <div className='blueCard rounded-xl mx-2 xl:mx-5 flex justify-center'>
      <p className='pt-4'>Hello</p>
    </div>
  )
}

export default ForecastCardComponent
