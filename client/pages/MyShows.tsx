import React from 'react'

const MyShows = () => {
    return (
        <>
            <nav className='bg-sky-400 mb-7 sticky top-0 z-50'>
                <main className='my-0 mx-auto max-w-7xl text-center'>
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-center text-xl'>
                            <div className='pt-3 mr-2 my-5 font-semibold text-2xl'>TVShowRater</div>
                            <div className='hover:bg-sky-600 p-8'>Home</div>
                            <div className='bg-sky-600 p-8'>My Shows</div>
                        </div>
                        <div className='flex justify-center text-xl'>
                            <div className='p-8'>Hello, Kitty!</div>
                            <div style={{ display: 'inline-block', position: 'relative', width: '70px', height: '70px', overflow: 'hidden', borderRadius: '50%', margin: 'auto' }}>
                                <img style={{ width: 'auto', height: '100%' }} src="https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_960_720.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </main>
            </nav>

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