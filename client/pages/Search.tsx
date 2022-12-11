import React from 'react'

const Search = () => {
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
                <div className='flex flex-row mt-8'>
                    <img className='mr-12' src="https://resizing.flixster.com/FTR0tK9gnkDQbZw2g4anPngtQkU=/206x305/v2/https://flxt.tmsimg.com/assets/p185124_b_v8_aj.jpg" alt="" />
                    <img className='mx-12' src="https://resizing.flixster.com/W7Ln4xbDwcvoM9Pjbkp3qd2350s=/206x305/v2/https://flxt.tmsimg.com/assets/p10777346_b_v13_az.jpg" alt="" />
                    <img className='mx-12' src="https://resizing.flixster.com/l2JO0iSIgKOIowTI-E0ilGTnkh4=/206x305/v2/https://flxt.tmsimg.com/assets/p185044_b_v8_ab.jpg" alt="" />
                </div>
            </div>
        </>
    )
}

export default Search