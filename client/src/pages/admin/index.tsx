import React, { useEffect, useState } from 'react'
import SearchShows from '../../../components/SearchShows'
import { useDeleteShowMutation, useSearchShowsMutation } from '../../store/slices/apiSlice'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const Admin = () => {
    const [query, setQuery] = useState("")
    const [search, { data: searchData }] = useSearchShowsMutation()
    const handleSearch = (name: string) => {
        setQuery(name);
    }

    useEffect(() => {
        search(query)
    }, [query])

    useEffect(() => {
        setDeleteShow(searchData)
    }, [searchData])

    const [deleteShow] = useDeleteShowMutation()
    const [show, setDeleteShow] = useState([{}])

    const handleDelete = (id) => {
        setDeleteShow(searchData?.filter((el) => el.id != id))
        deleteShow(id)
    }

    return (
        <div className='max-w-5xl mx-auto'>
            <div className='text-3xl mb-7'>Admin Panel</div>
            <SearchShows handleSearch={handleSearch} />
            <div className='flex justify-center'>
                {
                    query && show?.map((el) =>
                        <div className='mr-2 w-full'>
                            <div>
                                <button>
                                    <div className={`w-[180px] h-[280px] relative`}>
                                        <Image src={el.photo != "https://image.tmdb.org/t/p/w500/null" ? el.photo : '/placeholder.png'}
                                            alt={el.name} fill />
                                    </div>
                                </button>
                                <div className="">{el.name}</div>
                            </div>
                            <Link href={{
                                pathname: `/admin/edit`, query: {
                                    id: el.id,
                                }
                            }}>
                                <FontAwesomeIcon className='text-blue-500 text-2xl mr-2' icon={faPenToSquare} />
                            </Link>
                            <button onClick={() => handleDelete(el.id)}>
                                <FontAwesomeIcon className='text-red-600 text-2xl' icon={faTrash} />
                            </button>
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default Admin