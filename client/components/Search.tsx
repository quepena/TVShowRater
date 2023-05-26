import React, { useState } from 'react'
import { useSearchMutation } from '../store/slices/apiSlice'

const Search = ({handleSearch}) => {

    return (
        <div className='my-0 mx-auto max-w-7xl'>
            <input onChange={(e) => handleSearch(e.target.value)} className='h-12 w-full bg-gray-300 pl-5' type="text" placeholder='Search by Name, Actor or Cast' />
        </div>

    )
}

export default Search