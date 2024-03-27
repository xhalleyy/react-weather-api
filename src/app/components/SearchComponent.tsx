'use client'

import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { grey } from '@mui/material/colors';

const SearchComponent = () => {
    return (
        <div className='flex justify-end items-center pt-8 pb-5 pe-10 xl:pe-20'>
            <button className='bg-yellow-100 rounded-xl py-0.5 px-1.5 border h-10 border-black'>
                <FavoriteBorderIcon fontSize="large" sx={{ color: grey[900] }} />
            </button>
            <div className='rounded-xl px-4 flex flex-row items-center'>
                <input type="text" placeholder='Search a City' className='h-10 w-72 xl:w-96 px-3 py-1 rounded-l-xl rounded-r-none font-orbitron text-2xl text-black border border-black' />
                <button className='bg-yellow-100 h-10 py-0.5 px-1.5 border border-black rounded-r-xl'>
                    <SearchOutlinedIcon fontSize="large" sx={{ color: grey[900] }} />
                </button>
            </div>
            <div className='bg-yellow-100 rounded-xl py-0.5 px-3 border h-10 border-black'>
                <button className='text-black text-2xl font-orbitron'>
                    Favorites
                </button>
            </div>
        </div>
    )
}

export default SearchComponent
