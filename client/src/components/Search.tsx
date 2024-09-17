import React from 'react'
import { Input } from './input'

const Search = ({ handleSearch }) => {

    return (
        <div className='my-0 mx-auto max-w-7xl'>
            <Input onChange={(e) => handleSearch(e.target.value)} type="text" placeholder='Search by Name, Actor or Cast' />
        </div>
    )
}

export default Search