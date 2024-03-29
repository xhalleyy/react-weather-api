'use client'

import React, { SetStateAction, useEffect, useState } from 'react'
import { apiKey } from '@/app/hidekey'
import { forecastApi } from '@/Context/DataContext'
import { getFormattedDate } from '@/utilies/formatDate'
import Image from 'next/image'
import { icons } from '@/utilies/icons'

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
    <div className='blueCard rounded-xl py-4 mx-2 xl:mx-5 flex flex-col justify-end items-center text-black px-5'>
      <p className=' font-sometype-mono text-xl text-center'>{getFormattedDate(date).split(',').at(0)}</p>
      <p className=' font-sometype-mono text-xl text-center'>{getFormattedDate(date).split(',').at(1)}</p>
      <Image src={icons(icon)} alt='' width={100} height={100} priority={false}/>
      <div className='grid grid-cols-4 justify-center items-center'>
        <div className='col-span-1 text-center'>
          <p className='font-sometype-mono text-xl'>LOW:</p>
          <p className='font-orbitron text-2xl'>{`${Math.floor(low)}°`}</p>
        </div>
        <div className='col-span-2 inline-flex justify-center'>
          <Image src='/images/gradienttemp.png' alt='' width={75} height={75}/>
        </div>
        <div className='col-span-1 text-center'>
        <p className='font-sometype-mono text-xl'>HIGH:</p>
          <p className='font-orbitron text-2xl'>{`${Math.floor(high)}°`}</p>
        </div>
      </div>
    </div>
  )
}

export default ForecastCardComponent
