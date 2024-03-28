'use client'

import React, { useEffect, useState } from 'react'
import { apiKey } from '@/app/hidekey'
import { forecastApi } from '@/Context/DataContext'
import { getFormattedDate } from '@/utilies/formatDate'

type ForecastCardProp = {
  date: string
}

const ForecastCardComponent = ({ date }: ForecastCardProp) => {

  // const [date, setDate] = useState<string>('');

 

  return (
    <div className='blueCard rounded-xl mx-2 xl:mx-5 flex justify-center text-black'>
      <p className='pt-4'>{getFormattedDate(date)}</p>
    </div>
  )
}

export default ForecastCardComponent
