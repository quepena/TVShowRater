import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import navButtons from './NavButtons'
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
import { useGetMeMutation } from '../store/slices/apiSlice'
import { useRouter } from 'next/router'

const Nav = () => {
  const router = useRouter()
  const [getMe, { data: me }] = useGetMeMutation()
  const [isOpen, setIsOpen] = useState(false)
  const [loc, setLoc] = useState({})

  useEffect(() => {
    if (localStorage.getItem('userInfo') == null || localStorage.getItem('userInfo') == "" || !localStorage.getItem('userInfo'))
      router.push("/login")
    else {
      const local = JSON.parse(localStorage.getItem('userInfo'));
      const details = {
        token: local
      }
      getMe(details)
    }
  }, [])

  useEffect(() => {
    if (me && me.hasOwnProperty("id"))
      setLoc(me)
  }, [me])

  return (
    <nav className='bg-sky-400 mb-12 sticky top-0 z-50'>
      <main className='my-0 mx-auto max-w-7xl text-center'>
        <div className='flex justify-between items-center'>
          <div className='flex justify-center text-xl'>
            <Link href="/" className='font-semibold text-2xl mr-4'>
              TVShowRater
            </Link>
            {
              me ?
                <NavBar navButtons={navButtons} />
                : <></>
            }
          </div>
          {
            me ?
              (
                <div className='flex justify-center text-xl'>
                  <button className='' onClick={() => setIsOpen((prev) => !prev)}>
                    {
                      !isOpen ? (
                        <AiOutlineCaretDown className="" />
                      ) : (
                        <div className='static right-[545px] top-[35px]'>
                          <AiOutlineCaretUp className="" />
                        </div>
                      )
                    }
                  </button>
                  {
                    isOpen &&
                    <div>
                      <Link className='absolute top-[70px] right-[620px] w-52 bg-gray-100 p-2 border-2 border-black' onClick={() => setIsOpen(false)} href="/admin">
                        <div>Admin panel</div>
                      </Link>
                    </div>
                  }
                  <div className='p-8'>Hello, {me?.name}</div>
                  <div style={{ display: 'inline-block', position: 'relative', width: '70px', height: '70px', overflow: 'hidden', borderRadius: '50%', margin: 'auto' }}>
                    <img style={{ width: 'auto', height: '100%' }} src={me?.photo} alt="" />
                  </div>
                </div>
              )
              : <div className='flex justify-center text-xl p-8'></div>
          }
        </div>
      </main>
    </nav>
  )
}

export default Nav