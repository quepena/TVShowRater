import Link from 'next/link'
import React from 'react'
import NavBar from './NavBar'
import navButtons from './NavButtons'

const Nav = () => {
  return (
    <nav className='bg-sky-400 mb-7 sticky top-0 z-50'>
        <main className='my-0 mx-auto max-w-7xl text-center'>
          <div className='flex justify-between items-center'>
            <div className='flex justify-center text-xl'>
              {/* <div className='pt-3 mr-2 my-5 font-semibold text-2xl'>TVShowRater</div>
              <div className='bg-sky-600 p-8'>Home</div>
              <div className='hover:bg-sky-600 p-8'>My Shows</div> */}
              <Link href="/" className='font-semibold text-2xl'>
                {/* <img className='logo' src="https://see.fontimg.com/api/renderfont4/GO3ED/eyJyIjoiZnMiLCJoIjo1MiwidyI6MTAwMCwiZnMiOjUyLCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiIzAwMDAwMCIsInQiOjF9/Qi5T/creattion-demo.png" alt="" /> */}
                TVShowRater
              </Link>
              <NavBar navButtons={navButtons} />
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
  )
}

export default Nav