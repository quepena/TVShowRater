import React, { useEffect, useState } from 'react'
import { useCreateListMutation, useGetMeMutation, useSearchShowsMutation } from '../store/slices/apiSlice'
import Image from 'next/image'
import SearchShows from '../components/SearchShows'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';

const NewList = () => {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [search, { data: searchData }] = useSearchShowsMutation()
  const handleSearch = (name: string) => {
    setQuery(name);
  }

  const [shows, setShow] = useState([{}])
  const [added, setAdded] = useState(false)

  const addShow = (el, e) => {
    e.preventDefault()
    setShow([...shows, el])
    setAdded(true)
  }

  const deleteShow = (el, e) => {
    e.preventDefault()
    let allShows = [...shows]
    const newShows = allShows.filter((element) => element != el)
    setShow([...newShows])
  }

  console.log(shows);


  useEffect(() => {
    search(query)
  }, [query])

  const names = []
  shows?.map((name) => names.push(name.name))

  const [getMe, { data: me }] = useGetMeMutation()

  const [createList, { data: listData, isSuccess }] = useCreateListMutation()
  const [name, setName] = useState("")
  const [error, setError] = useState(false)
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('userInfo'));
    const details = {
      token: local
    }
    getMe(details)
  }, [])

  const handleCreation = (name, shows, e) => {
    e.preventDefault()
    const arr = []
    shows.map((el) => arr.push(el.id))
    if (name) {

      const details = {
        user: me?.id,
        name: name,
        tvShows: arr.slice(1)
      }

      createList(details)
      setName("")
      setShow([{}])
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <div className='max-w-3xl mx-auto'>
      <div className='flex my-8'>
        <button className='text-3xl mb-1 mx-5' onClick={() => router.back()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className='text-2xl font-bold'>Add a new list</div>
      </div>
      <form action="" className='flex flex-col'>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
          type="text"
          value={name}
          className={error ? `h-12 w-full pl-5 rounded text-lg mb-5 rounded border-2 border-red-600 drop-shadow-xl` : `h-12 w-full pl-5 rounded text-lg mb-5 rounded border-2 border-gray-600`} />
        <div>
          <SearchShows handleSearch={handleSearch} />
        </div>
        <div className='flex justify-center'>
          {
            query && searchData?.map((el) =>
              <div className='mr-2 w-full'>
                {
                  <button onClick={(e) => {
                    console.log(shows.some(element => element.photo == el.photo));
                    !shows.some(element => element.photo == el.photo) ?
                      addShow(el, e) : deleteShow(el, e)
                  }}>
                    <div className={`w-[180px] h-[280px] relative`}>
                      <Image src={el.photo != "https://image.tmdb.org/t/p/w500/null" ? el.photo : '/placeholder.png'} className={`${shows.some(element => element.photo === el.photo) ? `filter blur-sm` : ``}`}
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
          <div className='mt-8 text-xl'><b>Added shows:</b> {names.length > 0 ? names.slice(1).join(', ') : ''}</div>
        </div>
        <button onClick={(e) => handleCreation(name, shows, e)} className='text-xl bg-green-500 p-4 font-semibold w-[65%] text-center rounded mt-5 mb-2 ml-auto'>Add a list</button>
      </form>
      <div className='text-right text-xl text-green-600 mt-6 text-bold'>{isSuccess ? "New list was successfully created" : ""}</div>
    </div>
  )
}

export default NewList