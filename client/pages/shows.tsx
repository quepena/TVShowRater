import React, { useEffect, useState } from 'react'
import { useGetListsByUserQuery, useGetMeMutation, useSearchMutation } from '../store/slices/apiSlice';
import Image from 'next/image';
import Link from 'next/link'
import Search from '../components/Search';
// import { useGetListsQuery } from '../store/slices/listSlice';

const MyShows = () => {
    const [getMe, { data: me }] = useGetMeMutation()
    const { data, error, isLoading } = useGetListsByUserQuery(me?.id)

    const [query, setQuery] = useState("")
    const [search, { data: searchData }] = useSearchMutation()

    const shows = []
    const castCrew = []
    const handleSearch = (name: string) => {
        setQuery(name);
    }
    console.log(searchData);
    searchData?.map((el) => el.addId ? shows.push(el) : castCrew.push(el))
    console.log(shows);

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
        const details = {
            token: local
        }
        getMe(details)
        search(query)
    }, [query])

    // console.log(query);

    // console.log(searchData);


    return (
        <>
            <Search handleSearch={handleSearch} />

            {
                query ? (
                    <div>
                        {
                            <div>
                                {
                                    shows.length > 0 ? (
                                        <div>Shows
                                            {
                                                shows.map((el) =>
                                                    <div>
                                                        {
                                                            el.name
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ) : <div></div>
                                }
                                <div>
                                    {
                                        castCrew.length > 0 ? (
                                            <div>Cast & Crew
                                                {
                                                    castCrew.map((el) =>
                                                        <div>
                                                            {
                                                                el.name
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        ) : <div></div>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                ) : (
                    <div>
                        <Link href="/newList">+ Add a list</Link>
                        <div className='my-0 mx-auto max-w-3xl mt-12'>
                            {
                                data?.map((el) =>
                                    <Link key={el.id} href={{
                                        pathname: `/lists/${el.name}`, query: {
                                            id: el.id,
                                            name: el.name,
                                            tvShows: el.tvShows,
                                            user: el.user,
                                        }
                                    }}>
                                        <div className='bg-gray-300 p-5 flex justify-between mb-2'>
                                            {/* <Image src={} width={180} height={240} alt="" /> */}
                                            <div className='flex justify-between align-start'>
                                                <div className='text-3xl mr-96'>{el.name}</div>
                                                <div className='ml-5'>{`${el.tvShows.length} shows`}</div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default MyShows