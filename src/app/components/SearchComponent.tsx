'use client'

import React, { SetStateAction, useEffect } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { grey } from '@mui/material/colors';
import { apiKey, currentWeatherApi, forecastApi } from '@/Context/DataContext';
import { searchApi } from '@/Context/DataContext';
import { ICities } from '@/interfaces/interface';
import Route, { useRouter } from 'next/navigation'
import { getLocal, removeFromLocal, saveToLocal } from '@/utilies/LocalStorageFunctions';

type SearchProp = {
    city: string
    setCity: React.Dispatch<SetStateAction<string>>
    setLatitude: React.Dispatch<React.SetStateAction<number>>
    setLongitude: React.Dispatch<React.SetStateAction<number>>
    weatherCity: string
    setWeatherCity: React.Dispatch<SetStateAction<string>>;
    isFavorited: boolean
    setIsFavorited: React.Dispatch<SetStateAction<boolean>>
}



const SearchComponent = ({ city, setCity, setLatitude, setLongitude, setWeatherCity, isFavorited, setIsFavorited, weatherCity }: SearchProp) => {

    const router = useRouter();

    const handleSearch = async () => {
        try {
            const fetchedData = await searchApi(city, apiKey);
            setLatitude(fetchedData[0].lat);
            setLongitude(fetchedData[0].lon);
            setWeatherCity(city);

        } catch (error) {
            alert('Invalid City name. Try Again')
        }
    }

    const goToFavorites = () => {
        router.push('/Favorites');
    }

    useEffect(() => {
        let favCity = getLocal();
        setIsFavorited(favCity.includes(weatherCity));
    }, [weatherCity]);

    const handleLikes = () => {
        if (isFavorited) {
            removeFromLocal(weatherCity);
            setIsFavorited(false);
        } else {
            saveToLocal(weatherCity);
            setIsFavorited(true);
        }
    }

    return (
        <div>
            <div className='flex justify-end items-center pt-8 pb-5 pe-10 xl:pe-20'>
                <button onClick={handleLikes} className='bg-yellow-100 rounded-xl py-0.5 px-1.5 border h-10 border-black'>
                    {isFavorited ? (
                        <FavoriteIcon fontSize="large" sx={{ color: grey[900] }} />
                    ) : (
                        <FavoriteBorderIcon fontSize="large" sx={{ color: grey[900] }} />
                    )}
                </button>
                <div className='rounded-xl px-4 flex flex-row items-center'>
                    <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder='Search a City' className='h-10 w-72 xl:w-96 px-3 py-1 rounded-l-xl rounded-r-none font-orbitron text-2xl text-black border border-black' />
                    <button className='bg-yellow-100 h-10 py-0.5 px-1.5 border border-black rounded-r-xl' onClick={handleSearch}>
                        <SearchOutlinedIcon fontSize="large" sx={{ color: grey[900] }} />
                    </button>
                </div>
                <div className='bg-yellow-100 rounded-xl py-0.5 px-3 border h-10 border-black'>
                    <button onClick={goToFavorites} className='text-black text-2xl font-orbitron'>
                        Favorites
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchComponent
