import React, { useEffect, useState } from 'react'
import { useGetListsByUserMutation, useGetMeMutation, useSearchMutation } from '../../store/slices/apiSlice';
import Image from 'next/image';
import Link from 'next/link'
import Search from '../../components/Search';
import Loading from '../../components/Loading';
// import { useGetListsQuery } from '../store/slices/listSlice';

const MyShows = () => {
    const [getMe, { data: me }] = useGetMeMutation()
    const [getLists, { data, error, isLoading, isSuccess }] = useGetListsByUserMutation()

    const [query, setQuery] = useState("")
    const [search, { data: searchData }] = useSearchMutation()

    const shows = []
    const castCrew = []
    const handleSearch = (name: string) => {
        setQuery(name);
    }
    console.log(searchData);
    searchData?.map((el) => el.hasOwnProperty('addId') ? shows.push(el) : castCrew.push(el))

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
        const details = {
            token: local
        }
        getMe(details)
    }, [])

    useEffect(() => {
        getLists(me?.id)
    }, [me])

    useEffect(() => {
        search(query)
    }, [query])
    
    return (
        <div className='mx-auto max-w-5xl'>
            {
                isSuccess ?
                    <div className=''>
                        <Search handleSearch={handleSearch} />

                        {
                            query ? (
                                <div className=''>
                                    <div className=''>
                                        {
                                            shows.length > 0 ? (
                                                <div className=''>
                                                    <div className='text-3xl font-semibold mt-7 mb-4'>Shows</div>
                                                    <div className='flex'>
                                                        {
                                                            shows.map((el) =>
                                                                <div className='mr-2 w-full'>
                                                                    <div className="w-[180px] h-[280px] relative">
                                                                        <Image src={el.photo != "https://image.tmdb.org/t/p/w500/null" ? el.photo : '/placeholder.png'} alt={el.name} fill />
                                                                    </div>
                                                                    <div className='text-xl'>{el.name}</div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            ) : <div></div>
                                        }
                                    </div>
                                    <div className='mb-12'>
                                        {
                                            castCrew.length > 0 ? (
                                                <div>
                                                    <div className='text-3xl font-semibold mt-7 mb-4'>Cast & Crew</div>
                                                    <div className='flex'>
                                                        {
                                                            castCrew.map((el) =>
                                                                <div className='mr-2 w-full'>
                                                                    <div className="w-[180px] h-[280px] relative">
                                                                        <Image src={el.photo != "https://image.tmdb.org/t/p/w500/null" ? el.photo : '/placeholder.png'} alt={el.name} fill />
                                                                    </div>
                                                                    <div className='text-xl'>{el.name}</div>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            ) : <div></div>
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className='text-xl bg-green-500 p-4 font-semibold w-[15%] text-center rounded mt-5 mb-2 ml-auto mr-24'>
                                        <Link href="/newList"><b>+</b> Add a list</Link>
                                    </div>
                                    <div className='my-0 mx-auto w-[81%] mb-12'>
                                        {
                                            data?.map((el) =>
                                                <Link key={el.id} href={{
                                                    pathname: `/lists/${el.name}`, query: {
                                                        id: el.id,
                                                        name: JSON.stringify(el.name),
                                                    }
                                                }}>
                                                    <div className='border-2 border-black rounded-xl p-5 flex mb-5 w-full h-[350px]'>
                                                        <div className='relative top-0 left-0'>
                                                            {
                                                                el.tvShows && (el.tvShows.length <= 1)
                                                                    ?
                                                                    <div className="w-[220px] h-[280px] relative mr-5 top-0 left-0">
                                                                        <Image src={el.tvShows && el.tvShows[0] ? el.tvShows[0].photo : '/placeholder.png'} alt={el.tvShows && el.tvShows[0] && el.tvShows[0].name} fill />
                                                                    </div>
                                                                    :
                                                                    <div className="w-[220px] h-[280px] relative mr-5 top-[40px] left-0">
                                                                        <Image src={el.tvShows && el.tvShows[0] ? el.tvShows[0].photo : '/placeholder.png'} alt={el.tvShows && el.tvShows[0] && el.tvShows[0].name} fill />
                                                                    </div>
                                                            }
                                                            {
                                                                el.tvShows && (el.tvShows.length > 1) && <div className="w-[220px] h-[280px] relative mr-5 top-[-260px] left-[15px]">
                                                                    <Image className='drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]' src={el.tvShows[1] ? el.tvShows[1].photo : '/placeholder.png'} alt={el.tvShows && el.tvShows[1] && el.tvShows[1].name} fill />
                                                                </div>
                                                            }
                                                            {
                                                                el.tvShows && (el.tvShows.length > 2) && <div className="w-[220px] h-[280px] relative mr-5 top-[-560px] left-[30px]">
                                                                    <Image className='drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]' src={el.tvShows[2] ? el.tvShows[2].photo : '/placeholder.png'} alt={el.tvShows && el.tvShows[2] && el.tvShows[2].name} fill />
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className='flex justify-between w-full'>
                                                            <div className='text-3xl ml-8'>{el.name}</div>
                                                            <div className='ml-5'>{el.tvShows.length % 10 == 1 ? `${el.tvShows.length} show` : `${el.tvShows.length} shows`}</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    : <Loading />
            }
        </div>
    )
}

export default MyShows