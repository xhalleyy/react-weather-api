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

    const [favWeatherData, setfavWeatherData] = useState<ICurrentWeather>();
    const router = useRouter();
    const iconSrc = favWeatherData?.weather[0]?.icon ? icons(favWeatherData.weather[0].icon) : '/default-image.png';

    useEffect(() => {
        const searchData = async (city: string) => {
            const fetchedData = await searchApi(city);
            // search api gets long and lat
            // then run the other endpoint and chuck in fetchedData.lon, fetchData.lat
            // then we can save that data into a useState Object and use that to render our components
            const favData = await currentWeatherApi(fetchedData[0].lat, fetchedData[0].lon)
            setfavWeatherData(favData);
        }

        searchData(cityName);
    }, [])

    useEffect(() => {
        console.log(favWeatherData)
    }, [favWeatherData])

    const changeCity = () => {
        router.push('/');
        const newCity = `${favWeatherData?.name}, ${favWeatherData?.sys.country}`;
        setCity(newCity);
        setWeatherCity(newCity);
      };

    const handleRemoveFavorite = (cityToRemove: string) => {
        removeFromLocal(cityToRemove);
        setRerender(!rerender);
        // console.log(cityName)
    };

    return (
        <div className='rounded-xl light-green p-5 cursor-pointer flex flex-col justify-start'>
            <div className='grid grid-cols-5 '>
                <h1 className='col-span-4 font-sometype-mono text-2xl'>{`${favWeatherData?.name.toUpperCase()}, ${favWeatherData?.sys.country}`}</h1>
                <div className='col-span-1 flex justify-end'>
                    <RemoveCircleOutlinedIcon onClick={() => handleRemoveFavorite(cityName)}
                        fontSize="large" sx={{ color: yellow[100], stroke: "#000000", strokeWidth: 0.5 }} className='cursor-pointer' />

                </div>
            </div>

            <div onClick={changeCity} className='grid grid-cols-2 my-4 items-end justify-end text-start'>
                <div className='col-span-1 flex justify-center'>
                    <Image src={iconSrc} alt='' width={70} height={70} priority={false}/>
                </div>
                <p className='font-orbitron text-3xl md:text-5xl lg:text-4xl xl:5xl'>{favWeatherData && `${Math.floor(favWeatherData.main.temp)}°`}</p>
            </div>
            <div className='grid grid-cols-4 justify-center items-center'>
                <div className='col-span-1 text-center'>
                    <p className='font-sometype-mono text-2xl'>LOW:</p>
                    <p className='font-orbitron text-2xl lg:text-3xl'>{favWeatherData && `${Math.floor(favWeatherData.main.temp_min)}°`}</p>
                </div>
                <div className='col-span-2 inline-flex justify-center'>
                    <Image src='/images/gradienttemp.png' alt='' width={75} height={75}/>
                </div>
                <div className='col-span-1 text-center'>
                    <p className='font-sometype-mono text-2xl'>HIGH:</p>
                    <p className='font-orbitron text-2xl lg:text-3xl'>{favWeatherData && `${Math.floor(favWeatherData.main.temp_max)}°`}</p>
                </div>
            </div>
        </div>
    )
}

export default FavoritesComponent
