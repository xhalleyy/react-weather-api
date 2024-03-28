import React from 'react'
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import yellow from '@mui/material/colors/yellow';
import Image from 'next/image'

type FavoritesProp = {
    favoriteName: string
}

const FavoritesComponent = (favoriteName): FavoritesProp => {
    return (
        <div className='rounded-xl light-green p-5'>
            <div className='grid grid-cols-2'>
                <h1 className='font-sometype-mono text-2xl'>Hello</h1>
                <div className='flex justify-end'>
                    <RemoveCircleOutlinedIcon fontSize="large" sx={{ color: yellow[100], stroke: "#000000", strokeWidth: 0.5 }} />

                </div>
            </div>

            <div className='grid grid-cols-2 my-4 items-end justify-center text-center'>
                <div className='col-span-1'>
                    {/* <Image src='' alt=''/> */}
                    Hello
                </div>
                <p className='font-orbitron text-3xl xl:text-4xl'>00</p>
            </div>
            <div className='grid grid-cols-4'>
                <div className='col-span-1 text-center'>
                    <p>LOW:</p>
                    <p>00</p>
                </div>
                <div className='col-span-2'></div>
                <div className='col-span-1 text-center'>
                    <p>HIGH:</p>
                    <p>00</p>
                </div>
            </div>
        </div>
    )
}

export default FavoritesComponent
