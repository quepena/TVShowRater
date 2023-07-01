import React from 'react'

const SearchShows = ({ handleSearch }) => {

    return (
        <div className='my-0 mx-auto max-w-7xl'>
            <input onChange={(e) => {
                handleSearch(e.target.value);
            }} className='h-12 w-full pl-5 rounded text-lg mb-5 rounded border-gray-600 border-2' type="text" placeholder='Search Show by Name' />
        </div>
    )
}

export default SearchShows