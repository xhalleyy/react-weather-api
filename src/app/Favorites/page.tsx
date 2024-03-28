'use client'

import React, { useEffect, useState } from 'react'
import SearchComponent from '../components/SearchComponent';
import { useRouter } from 'next/navigation';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import grey from '@mui/material/colors/grey';
import '../weather.css';
import FavoritesComponent from '../components/FavoritesComponent';
import { getLocal } from '@/utilies/LocalStorageFunctions';

type Favorite = {
    favoriteName: string
}

const Favorites = () => {

    const [likes, setLikes] = useState<string[]>([]);
    const router = useRouter();

    const goBack = ()=> {
        router.push('/');
    }

    useEffect(() => {
        let favCities: string[] = getLocal().map(city => {
            return({
                favoriteName: city
            })
        })

        setLikes(favCities);
    },[])

    return (
        <div className="lightBG min-h-screen text-black">
            <div className='flex justify-start items-center pt-8 pb-5 ps-3 md:ps-10 xl:ps-20'>

                <div className='bg-yellow-100 rounded-xl py-0.5 px-3 border h-10 border-black'>
                    <button onClick={goBack} className='text-black text-2xl font-orbitron flex items-center'>
                        <ArrowBackIosIcon fontSize="medium" sx={{ color: grey[900] }}/>
                        Go Back
                    </button>
                </div>
            </div>

            <div className=' px-5 md:px-20 lg:px-28 xl:px-40'>
                <h1 className='font-roadrage text-6xl xl:text-7xl'>FAVORITES</h1>

                <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 xl:gap-10 2xl:gap-14'>
                {/* {
          forecast.map((day, idx) => <FavoritesComponent key={idx} date={day.date} high={day.high} low={day.low} icon={day.icon} isFavorited={isFavorited} setIsFavorited={setIsFavorited}/>)
        } */}
                </div>
            </div>
        </div>
    )
}

export default Favorites
