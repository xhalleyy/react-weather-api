import React, { SetStateAction, useEffect, useState } from 'react'
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import yellow from '@mui/material/colors/yellow';
import Image from 'next/image'
import { currentWeatherApi, searchApi } from '@/Data/DataServices';
import { ICurrentWeather } from '@/interfaces/interface';
import { getLocal, removeFromLocal } from '@/utilies/LocalStorageFunctions';
import { useRouter } from 'next/navigation';
import { icons } from '@/utilies/icons';

type FavoritesProp = {
    index: number
    cityName: string
    city: string
    rerender: boolean
    likes: string[]
    setLikes: React.Dispatch<React.SetStateAction<string[]>>
    setRerender: React.Dispatch<React.SetStateAction<boolean>>
    setCity: React.Dispatch<SetStateAction<string>>
    setWeatherCity: React.Dispatch<SetStateAction<string>>
}

const FavoritesComponent = ({ cityName, likes, setLikes, rerender, setRerender, city, setCity, setWeatherCity, index }: FavoritesProp) => {

    const [weatherData, setWeatherData] = useState<any[]>([]);
    // const router = useRouter();
    // const iconSrc = weather?.weather[0]?.icon ? icons(weather.weather[0].icon) : '/images/fewclouds.png';

    useEffect(() => {
        let favCities: string[] = getLocal();
        setLikes(favCities);
    }, [rerender]);

    // Promise.all await multiple asynchronous functions/operations concurrently.
    // map through likes (local storage) and for each city, we asynchronously call the search city api
    // if there is a city (length > 0), then we use its lat and lon of the first index of the array.
    // we then call the current weather api and return an object 

    // Then we filter out any null values from the weatherDataList using filter(Boolean)
    useEffect(() => {
        const fetchWeatherData = async () => {
            const weatherDataList = await Promise.all(
                likes.map(async (city) => {
                    const searchResults = await searchApi(city);
                    if (searchResults.length > 0) {
                        const { lat, lon } = searchResults[0];
                        const currentWeather = await currentWeatherApi(lat, lon);
                        return { city, weather: currentWeather };
                    }
                    return null;
                })
            );
            setWeatherData(weatherDataList.filter(Boolean));
        };

        fetchWeatherData();
    }, [likes]);

    const handleRemoveFavorite = async (cityToRemove: string) => {
        removeFromLocal(cityToRemove);
        setLikes((prevLikes) => prevLikes.filter((city) => city !== cityToRemove));
        setRerender((prevRerender) => !prevRerender);
    };

    return (
        <>
            {weatherData.map(({ city, weather }, idx) => (
                <div key={idx} className='rounded-xl light-green p-5 cursor-pointer flex flex-col justify-start'>
                    <div className='grid grid-cols-5 '>
                        <h1 className='col-span-4 font-sometype-mono text-2xl'>{city}</h1>
                        <div className='col-span-1 flex justify-end'>
                            <RemoveCircleOutlinedIcon
                                onClick={() => handleRemoveFavorite(city)}
                                fontSize='large'
                                sx={{ color: yellow[100], stroke: '#000000', strokeWidth: 0.5 }}
                                className='cursor-pointer'
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-2 my-4 items-end justify-end text-start'>
                        <div className='col-span-1 flex justify-center'>
                            <Image src={icons(weather.weather[0].icon) || '/images/fewclouds.png'} alt='' width={70} height={70} priority={false} />
                        </div>
                        <p className='font-orbitron text-3xl md:text-5xl lg:text-4xl xl:5xl'>{weather && `${Math.floor(weather.main.temp)}°`}</p>
                    </div>
                    <div className='grid grid-cols-4 justify-center items-center'>
                        <div className='col-span-1 text-center'>
                            <p className='font-sometype-mono text-2xl lg:text-xl'>LOW:</p>
                            <p className='font-orbitron text-2xl '>{weather && `${Math.floor(weather.main.temp_min)}°`}</p>
                        </div>
                        <div className='col-span-2 inline-flex justify-center'>
                            <Image src='/images/gradienttemp.png' alt='' width={70} height={70} />
                        </div>
                        <div className='col-span-1 text-center'>
                            <p className='font-sometype-mono text-2xl lg:text-xl'>HIGH:</p>
                            <p className='font-orbitron text-2xl '>{weather && `${Math.floor(weather.main.temp_max)}°`}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default FavoritesComponent
