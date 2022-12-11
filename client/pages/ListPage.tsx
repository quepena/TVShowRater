import React from 'react'

const ListPage = () => {
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
                <div className='flex flex-row w-full h-12 bg-gray-300'>
                    <img className='w-8 h-5 mt-3 ml-3' src="https://cdn.pixabay.com/photo/2012/04/11/10/24/arrow-27323_960_720.png" alt="" />
                    <div className='mt-2 ml-3 text-xl'>Watched</div>
                </div>
                <div className='flex flex-row mt-8'>
                    <img className='mr-12' style={{width: '205px', height: '305px'}} src="https://m.media-amazon.com/images/M/MV5BZDJmODFjMzEtNTE4MS00OGViLTk4OGYtZjg3OGFhM2VlOTliXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UX380_CR0,0,380,562_.jpg" alt="" />
                    <img className='mx-12' src="https://resizing.flixster.com/W7Ln4xbDwcvoM9Pjbkp3qd2350s=/206x305/v2/https://flxt.tmsimg.com/assets/p10777346_b_v13_az.jpg" alt="" />
                </div>
            </div>
        </>
    )
}

export default ListPage