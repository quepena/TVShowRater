import React, { useEffect, useState } from 'react'
import { useDeleteListMutation, useEditListMutation, useGetListByIdMutation, useGetMeMutation, useGetShowByIdQuery, useSearchShowsMutation } from '../../store/slices/apiSlice';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';
import SearchShows from '../../components/SearchShows';
import Loading from '../../components/Loading';

const List = (props) => {
  const router = useRouter();
  const [getListsById, { data, isSuccess }] = useGetListByIdMutation()
  const [id, setId] = useState()
  const { data: showData } = useGetShowByIdQuery(id)
  console.log(showData);
  console.log(props.id);

  useEffect(() => {
    getListsById(props.id)
  }, [])
  

  console.log(data);

  const [editList, { data: editData }] = useEditListMutation()
  const [deleteList, { isSuccess: isDeleteSuccess }] = useDeleteListMutation()

  const [shows, setShows] = useState([])

  console.log(shows);


  useEffect(() => {
    console.log(data);

    if (data)
      setShows([...data.tvShows])
  }, [data])

  console.log(shows);

  const [getMe, { data: me }] = useGetMeMutation()

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('userInfo'));
    const details = {
      token: local
    }
    getMe(details)
  }, [])

  const [query, setQuery] = useState("")
  const [search, { data: searchData }] = useSearchShowsMutation()
  const handleSearch = (name: string) => {
    setQuery(name);
  }

  const [showsObj, setShowsObj] = useState([{}])
  const [added, setAdded] = useState(false)

  const addShow = (el, e) => {
    e.preventDefault()
    setShowsObj([...showsObj, el])
    setAdded(true)
  }

  const deleteShow = (el, e) => {
    e.preventDefault()
    let allShows = [...showsObj]
    const newShows = allShows.filter((element) => element != el)
    setShowsObj([...newShows])
  }

  console.log(shows);


  useEffect(() => {
    search(query)
  }, [query])


  const names = []
  showsObj?.map((name) => names.push(name.name))

  const handleDeleteShow = (e, el) => {
    e.preventDefault()
    console.log(el);
    console.log(shows);
    let allShows = [...shows]
    const newShows = allShows.filter((element) => element != el)
    setShows([...newShows])
    const newShowsIds = newShows.map((el) => parseInt(el.id))

    console.log(newShowsIds);


    const details = {
      user: me?.id,
      name: data?.name,
      tvShows: [...newShowsIds]
    }

    console.log(details);

    console.log(details.user);



    editList({ id: parseInt(props.id), details: details })
  }

  const handleAddShows = (e) => {
    e.preventDefault()
    const newShowsIds = shows.map((el) => parseInt(el.id))
    let newShowsObjIds = []
    showsObj.map((el) => el.id && newShowsObjIds.push(parseInt(el.id)))

    const newShowsObjId = newShowsObjIds.map((el) => el)

    const details = {
      user: me?.id,
      name: data?.name,
      tvShows: [...newShowsIds, ...newShowsObjId]
    }

    editList({ id: parseInt(props.id), details: details })

    setShows([...shows, ...showsObj.splice(1)])
  }

  const handleDeleteList = (e) => {
    e.preventDefault()
    deleteList(props.id)
    router.push('/lists', undefined)
  }


  return (
    <div className='mx-auto max-w-5xl'>
      {
        isSuccess ?
          <div className=''>
            <div className='flex bg-gray-200 p-2 mb-12 h-[50px]'>
              <button className='text-3xl mb-5 mx-5' onClick={() => router.back()}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <div className='text-2xl'>{data?.name}</div>
            </div>
            <div className='flex'>
              {
                shows.map((el) =>
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
                    <button onClick={(e) => handleDeleteShow(e, el)}>
                      <FontAwesomeIcon className='text-red-600 text-2xl' icon={faTrash} />
                    </button>
                  </div>
                )
              }
            </div>
            <div className='flex flex-col'>
              <div>
                <SearchShows handleSearch={handleSearch} />
              </div>
              <div className='flex justify-center'>
                {
                  query && searchData?.map((el) =>
                    <div className='mr-2 w-full'>
                      {
                        <button disabled={shows.some(element => element.photo == el.photo) ? true : false} onClick={(e) => {
                          console.log(showsObj.some(element => element.photo == el.photo));
                          !showsObj.some(element => element.photo == el.photo) ?
                            addShow(el, e) : deleteShow(el, e)
                        }}>
                          <div className={`w-[180px] h-[280px] relative`}>
                            <Image src={el.photo != "https://image.tmdb.org/t/p/w500/null" ? el.photo : '/placeholder.png'} className={`${shows.some(element => element.photo === el.photo) || showsObj.some(element => element.photo === el.photo) ? `filter blur-sm` : ``}`}
                              alt={el.name} fill />
                          </div>
                        </button>
                      }
                      <div className='text-xl'>{el.name}</div>
                    </div>
                  )
                }
              </div>
              <div className='flex'>
                <div className='mt-8 text-xl'><b>Added shows:</b> {names.length > 1 ? names.slice(1).join(', ') : ''}</div>
              </div>
              <button onClick={(e) => handleAddShows(e)} className='bg-green-500 p-5 w-[30%] text-2xl hover:bg-green-600'>+ Add shows</button>
              {
                data?.name == "Watchlist" || data?.name == "Watched" || data?.name == "Currently Watching" ? "" :
                  <button onClick={(e) => handleDeleteList(e)} className='bg-red-500 p-5 w-[30%] text-white text-2xl hover:bg-red-600'>Delete list</button>
              }
            </div>
          </div>
          :
          <Loading />
      }
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