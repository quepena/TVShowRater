import Link from 'next/link'
import React from 'react'

const Register = () => {

  return (
    <>
      <div className='bg-gray-300 mb-12 sm:w-full md:max-w-md lg:max-w-lg mx-auto p-8 md:p-12 my-5 rounded-lg h-80'>
        <div className='text-md font-semibold'>Sign Up</div>
        <div>
          <Link href="/google">
              <div className='bg-gray-400 p-3 my-3'>Continue with Google</div>
          </Link>
          <Link href="/registerForm">
            <div className='bg-gray-400 p-3 my-3'>
              Sign up with E-mail
            </div>
          </Link>
        </div>
        <div className='text-right'>
          <Link href="/login">Already have an account? Sign in</Link>
        </div>
      </div>
    </>
  )
}

export default Register