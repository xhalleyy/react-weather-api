'use client'

import React, { SetStateAction, useEffect, useState } from 'react'
import { apiKey } from '@/app/hidekey'
import { forecastApi } from '@/Context/DataContext'
import { getFormattedDate } from '@/utilies/formatDate'
import Image from 'next/image'

type ForecastCardProp = {
  date: string 
  high: number,
  low: number,
  icon: string
  isFavorited: boolean
  setIsFavorited: React.Dispatch<SetStateAction<boolean>>
}

const ForecastCardComponent = ({ date, high, low, icon, isFavorited, setIsFavorited }: ForecastCardProp) => {

  // const [date, setDate] = useState<string>('');

  return (
    <div className='blueCard rounded-xl mx-2 xl:mx-5 flex flex-col justify-center items-center text-black px-5'>
      <p className='pt-4 font-sometype-mono'>{getFormattedDate(date)}</p>
      {/* <Image src='' alt=''/> */}
      <div className='grid grid-cols-4'>
        <div className='col-span-1 text-center'>
          <p>LOW:</p>
          <p>{Math.floor(low)}</p>
        </div>
        <div className='col-span-2'></div>
        <div className='col-span-1 text-center'>
        <p>HIGH:</p>
          <p>{Math.floor(high)}</p>
        </div>
      </div>
    </div>
  )
}

export default ForecastCardComponent
