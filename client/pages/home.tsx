import Link from 'next/link'
import React from 'react'
import { useGetAdminListsQuery } from '../store/slices/apiSlice'
import Image from 'next/image'
import Loading from '../components/Loading'

const Hero = () => {
  const { data: popular } = useGetAdminListsQuery("Popular")
  const { data, isSuccess } = useGetAdminListsQuery("Best Shows of All Time")

  return (
    <div>
      {
        isSuccess ?
          <div className='my-0 mx-auto max-w-7xl'>
            <div>
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