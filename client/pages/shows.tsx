import React from 'react'
import { useGetListsQuery } from '../store/slices/apiSlice';
// import { useGetListsQuery } from '../store/slices/listSlice';

const MyShows = () => {
    const { data, error, isLoading } = useGetListsQuery(28)

    console.log(data);
    
    return (
        <>
            <div className='my-0 mx-auto max-w-7xl'>
                <input className='h-12 w-full bg-gray-300 pl-5' type="text" placeholder='Search by Name, Actor or Cast' />
            </div>

            <div className='my-0 mx-auto max-w-3xl mt-12'>
                <div className='bg-gray-300 p-5 flex justify-between'>
                    <img src="https://resizing.flixster.com/2b8jpB0s_CzFXRgbgLZwTlmpCRI=/fit-in/180x240/v2/https://resizing.flixster.com/KdLRjDQYu1miVe2tU6KGB4wJf_4=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNTMyMDI2ZTQtMTc4NC00NjEwLWI2MGUtZGQwNzczOWViNzI5LmpwZw==" alt="" />
                    <div className='flex justify-between align-start'>
                        <div className='text-3xl mr-96'>Watched</div>
                        <div className='ml-5'>5 shows</div>
                    </div>
                </div>
                <div className='bg-gray-300 mt-5 p-5 flex justify-between'>
                    <img src="https://resizing.flixster.com/_JEFzZbnV8gFwCvBuViPtGry9Pk=/fit-in/180x240/v2/https://flxt.tmsimg.com/assets/p185008_b_v8_ah.jpg" alt="" />
                    <div className='flex justify-between align-start'>
                        <div className='text-3xl mr-60'>Currently Watching</div>
                        <div className='ml-5'>2 shows</div>
                    </div>
                </div>

                <div className='bg-gray-300 mt-5 p-5 flex justify-between'>
                    <img src="https://resizing.flixster.com/2b8jpB0s_CzFXRgbgLZwTlmpCRI=/fit-in/180x240/v2/https://resizing.flixster.com/KdLRjDQYu1miVe2tU6KGB4wJf_4=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNTMyMDI2ZTQtMTc4NC00NjEwLWI2MGUtZGQwNzczOWViNzI5LmpwZw==" alt="" />
                    <div className='flex justify-between align-start'>
                        <div className='text-3xl mr-60'>Want to Watch</div>
                        <div className='ml-5'>23 shows</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyShows