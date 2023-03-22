import React from 'react'

const Register = () => {
  return (
    <>
      <nav className='bg-sky-400 mb-7 sticky top-0 z-50'>
        <main className='my-0 mx-auto max-w-7xl text-center'>
          <div className='flex justify-between items-center'>
            <div className='flex justify-center text-xl'>
              <div className='mr-2 my-5 font-semibold text-2xl'>TVShowRater</div>
              {/* <div className='hover:bg-sky-600 p-8'>Home</div>
              <div className='hover:bg-sky-600 p-8'>My Shows</div> */}
            </div>
            {/* <div className='flex justify-center text-xl'>
              <div className='p-8'>Hello, Kitty!</div>
              <div className='pl-8 pt-8'>Photo</div>
            </div> */}
          </div>
        </main>
      </nav>

      <div className='bg-gray-300 mb-12 sm:w-full md:max-w-md lg:max-w-lg mx-auto p-8 md:p-12 my-5 rounded-lg h-80'>
        <div className='text-md font-semibold'>Sign Up</div>
        <div>
          <div className='bg-gray-400 p-3 my-3'>Continue with Google</div>
          <div className='bg-gray-400 p-3 my-3'>Sign up with E-mail</div>
        </div>
        <div className='text-right'>Already have an account? Sign in</div>
      </div>
    </>
  )
}

export default Register