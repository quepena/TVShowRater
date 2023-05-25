import React, { useEffect } from 'react'
import { useGetListsByUserQuery, useGetMeMutation } from '../store/slices/apiSlice';
import Image from 'next/image';
import Link from 'next/link'
// import { useGetListsQuery } from '../store/slices/listSlice';

const MyShows = () => {
    const [getMe, { data: me }] = useGetMeMutation()
    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
        const details = {
            token: local
        }
        getMe(details)
    }, [])
    const { data, error, isLoading } = useGetListsByUserQuery(me?.id)

    console.log(data);

    return (
        <>
            <div className='my-0 mx-auto max-w-7xl'>
                <input className='h-12 w-full bg-gray-300 pl-5' type="text" placeholder='Search by Name, Actor or Cast' />
            </div>

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
        </>
    )
}

export default MyShows