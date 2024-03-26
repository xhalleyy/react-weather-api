import React from 'react'

const CurrentWeatherComponent = () => {
  return (
    <div className='px-20 xl:px-32'>
      <h1 className='font-roadrage text-7xl 2xl:text-8xl text-black ps-4 mb-1'>CURRENT LOCATION</h1>
      <div className='light-green px-10 py-5 rounded-xl grid grid-cols-7'>
        <div className='col-span-3 text-black font-sometype-mono border-r border-lime-600'>
            <p className='text-3xl xl:text-4xl'>TODAY</p>
            <p className='text-2xl xl:text-3xl'>Monday, March 25th</p>
            <div className='flex justify-center items-center'>
                <img src="" alt="" />
                <div className='text-center pb-4 pt-1'>
                    <p className='font-orbitron text-6xl xl:text-7xl pb-2'>62</p>
                    <p className='text-lg xl:text-2xl'>overcast clouds</p>
                </div>
            </div>
        </div>
        <div className='col-span-4'>
            <div>
                <div>
                    
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeatherComponent
