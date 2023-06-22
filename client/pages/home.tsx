import Link from 'next/link'
import React, { Dispatch, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import NavBar from '../components/NavBar'
import navButtons from '../components/NavButtons'
import { useGetAdminListsQuery } from '../store/slices/apiSlice'
import { logout } from '../store/slices/userSlice'
import { TvShow } from '../types/tvShow'
// import { fetchUsers } from '../store/slices/userSlice'
import Image from 'next/image'
import Show from './shows/[show]'
import router, { Router } from 'next/router'
import Loading from '../components/Loading'

const Hero = () => {
  const { data: popular, error, isLoading } = useGetAdminListsQuery("Popular")
  const { data, isSuccess } = useGetAdminListsQuery("Best Shows of All Time")
  // data?.map((el: TvShow) => console.log(el));
  

  return (
    <div>
      {
        isSuccess ?
          <div className='my-0 mx-auto max-w-7xl'>
            <div>
              <button onClick={() => localStorage.removeItem("userInfo")}>
                {/* find */}
              </button>
              <div className='text-3xl mb-6'>Popular Shows</div>
              <div>
                <div className='flex justify-between align-center'>
                {
                    popular.map((el) =>
                      <div>
                        {
                          el.photo != "https://image.tmdb.org/t/p/w500/null" ?
                            <Link key={el.id} href={{
                              pathname: `/shows/${el.name}`, query: {
                                id: el.id,
                                name: el.name,
                              }
                            }}>
                              <div className="w-[180px] h-[280px] relative">
                                <Image src={el.photo} alt={el?.cast?.name} fill />
                              </div>
                            </Link>
                            :
                            <Link key={el.id} href={{
                              pathname: `/shows/${el.name}`, query: {
                                id: el.id,
                                name: el.name,
                              }
                            }}>
                              <div className="w-[180px] h-[280px] relative">
                                <Image src="/placeholder.png" alt={el?.cast?.name} fill />
                              </div>
                            </Link>
                        }
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            <div>
              <div className='text-3xl mt-12 mb-6'>Best shows of All Time</div>
              <div>
                <div className='flex justify-between align-center'>
                  {
                    data.map((el) =>
                      <div>
                        {
                          el.photo != "https://image.tmdb.org/t/p/w500/null" ?
                            <Link key={el.id} href={{
                              pathname: `/shows/${el.name}`, query: {
                                id: el.id,
                                name: el.name,
                              }
                            }}>
                              <div className="w-[180px] h-[280px] relative">
                                <Image src={el.photo} alt={el?.cast?.name} fill />
                              </div>
                            </Link>
                            :
                            <Link key={el.id} href={{
                              pathname: `/shows/${el.name}`, query: {
                                id: el.id,
                                name: el.name,
                              }
                            }}>
                              <div className="w-[180px] h-[280px] relative">
                                <Image src="/placeholder.png" alt={el?.cast?.name} fill />
                              </div>
                            </Link>
                        }
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          :
          <Loading />
      }
    </div>
  )
}

export default Hero