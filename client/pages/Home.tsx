import React from 'react'

const Home = () => {
  return (
    <>
      <nav className='bg-sky-400 mb-7 sticky top-0 z-50'>
        <main className='my-0 mx-auto max-w-7xl text-center'>
          <div className='flex justify-between items-center'>
            <div className='flex justify-center text-xl'>
              <div className='pt-3 mr-2 my-5 font-semibold text-2xl'>TVShowRater</div>
              <div className='bg-sky-600 p-8'>Home</div>
              <div className='hover:bg-sky-600 p-8'>My Shows</div>
            </div>
            <div className='flex justify-center text-xl'>
              <div className='p-8'>Hello, Kitty!</div>
              <div style={{ display: 'inline-block', position: 'relative', width: '70px', height: '70px', overflow: 'hidden', borderRadius: '50%', margin: 'auto'}}>
                <img style={{ width: 'auto', height: '100%' }} src="https://cdn.pixabay.com/photo/2021/10/19/10/56/cat-6723256_960_720.jpg" alt="" />
              </div>
            </div>
          </div>
        </main>
      </nav>

      <div className='my-0 mx-auto max-w-7xl'>
        <div>
            <div className='text-3xl mt-12 mb-6'>Popular Shows</div>
            <div>
                <div className='flex justify-between align-center'>
                    <img src="https://resizing.flixster.com/2b8jpB0s_CzFXRgbgLZwTlmpCRI=/fit-in/180x240/v2/https://resizing.flixster.com/KdLRjDQYu1miVe2tU6KGB4wJf_4=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNTMyMDI2ZTQtMTc4NC00NjEwLWI2MGUtZGQwNzczOWViNzI5LmpwZw==" alt="" />
                    <img src="https://resizing.flixster.com/Ck1tyAAOP7GHlb6h5Eq0NlzCT4g=/fit-in/180x240/v2/https://resizing.flixster.com/yscZSV8bcdRl94Y0RoUvaN7kFEc=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vMGQ4MzA2NGItODJmYi00YmQzLWIwMzAtZjM1MmU3NTk0ZWE5LmpwZw==" alt="" />
                    <img src="https://resizing.flixster.com/gkHuw1PUqzm6PaJ8kKOaUbEu7LY=/fit-in/180x240/v2/https://resizing.flixster.com/_wXgZsxZOAtdk4oTp0bT5R9w46k=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vM2FjOGIyZDgtMzAwOS00YWRlLTkzMWQtOWFiNTg5MTg2NWViLmpwZw==" alt="" />
                    <img src="https://resizing.flixster.com/iwsmej3x7lf56oixua5BBNIV2vM=/fit-in/180x240/v2/https://resizing.flixster.com/HQgL4VLnuy8wSJO5u_3oUalaXCE=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vMjlhMDk2ZWYtY2YyZi00MGNlLThjZTMtYWQzNjAwMDYwYzVlLmpwZw==" alt="" />
                    <img src="https://resizing.flixster.com/YGk3PHH40sTq9Sd41aZXgFOqGtQ=/fit-in/180x240/v2/https://resizing.flixster.com/XU0xdxbGw8YdWsFi5CW7nEziok0=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNTEwZjEwYmItMzY3NS00MjQ1LTg3NGEtYmMyZWFjYTcxN2Y1LmpwZw==" alt="" />
                    <img src="https://resizing.flixster.com/01F9mjjQWOAv6q6CYM9J4wLdvno=/fit-in/180x240/v2/https://resizing.flixster.com/MNXqeczvvBC7oHMlYxfEfZwzxFU=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNTYxOGM1ZTItNDMyNi00NTUwLTkzMDQtMjEzMThkOTI3NzAyLmpwZw==" alt="" />
                </div>
            </div>
        </div>
        <div>
            <div className='text-3xl mt-12 mb-6'>Best shows of All Time</div>
            <div>
                <div className='flex justify-between align-center'>
                    <img src="https://resizing.flixster.com/K17peCvHQfgIvFPXcfQcxwz5P1c=/fit-in/180x240/v2/https://flxt.tmsimg.com/assets/p8679006_b_v8_ac.jpg" alt="" />
                    <img src="https://resizing.flixster.com/b855WA2jfWRodJ3P2zdUQ8GiqXo=/fit-in/180x240/v2/https://flxt.tmsimg.com/assets/p185595_b_v8_ai.jpg" alt="" />
                    <img src="https://resizing.flixster.com/D6BAvtv3eVV4nmVJziWrpm6hZBQ=/fit-in/180x240/v2/https://flxt.tmsimg.com/assets/p12991665_b_v13_am.jpg" alt="" />
                    <img src="https://resizing.flixster.com/B6yliDFPyIoXEVMyfRZ2CION_fI=/fit-in/180x240/v2/https://flxt.tmsimg.com/assets/p8204516_b_v8_at.jpg" alt="" />
                    <img src="https://resizing.flixster.com/x44BmZzzU6ta6SovPPJeGWyaH94=/fit-in/180x240/v2/https://flxt.tmsimg.com/assets/p185846_b_v8_ad.jpg" alt="" />
                    <img src="https://resizing.flixster.com/PLeQtZHMj4wElEOG6pgeIkdaZ9s=/fit-in/180x240/v2/https://flxt.tmsimg.com/assets/p9960168_b_v13_aa.jpg" alt="" />
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Home