import React, { useEffect, useState } from 'react'
import { useGetListByIdQuery, useGetListsByUserQuery, useGetMeMutation, useGetShowByIdQuery } from '../../store/slices/apiSlice';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';

const List = (props) => {
  const router = useRouter();
  const { data } = useGetListByIdQuery(props.id)
  const [id, setId] = useState()
  const { data: showData } = useGetShowByIdQuery(id)
  console.log(showData);


  console.log(data);

  const handleDeleteShow = () => {
    
  }

  const handleDeleteList = () => {

  }

  return (
    <div className='mx-auto max-w-5xl'>
      <div className='flex bg-gray-200 p-2 mb-12 h-[50px]'>
        <button className='text-3xl mb-5 mx-5' onClick={() => router.back()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className='text-2xl'>{data?.name}</div>
      </div>
      <div className='flex'>
        {
          data?.tvShows.map((el) =>
            <div className='mr-2 w-full'>
              <Link onClick={() => setId(el.id)} key={el.id} href={{
                pathname: `/shows/${el.name}`, query: {
                  id: el.id,
                  name: el.name,
                }
              }}>
                <div className="w-[180px] h-[280px] relative">
                  <Image src={el.photo != "https://image.tmdb.org/t/p/w500/null" ? el.photo : '/placeholder.png'} alt={el.name} fill />
                </div>
                <div className='text-xl'>{el.name}</div>
              </Link>
              <button onClick={() => handleDeleteShow()}>
                <FontAwesomeIcon className='text-red-600 text-2xl' icon={faTrash} />
              </button>
            </div>
          )
        }
      </div>
      <div className='flex flex-col'>
        <button className='bg-green-500 p-5 w-[30%] text-2xl hover:bg-green-600'>+ Add shows</button>
        <button onClick={() => handleDeleteList()} className='bg-red-500 p-5 w-[30%] text-white text-2xl hover:bg-red-600'>Delete list</button>
      </div>
    </div>
  )
}

export default List

export const getServerSideProps = (context) => {
  console.log(context);
  return {

    props: {
      id: context.query.id,
      name: context.query.name,
    }
  }
}