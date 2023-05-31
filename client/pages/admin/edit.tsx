import React, { useEffect, useState } from 'react'
import { useGetGenresQuery, useGetShowByIdQuery } from '../../store/slices/apiSlice'
import { TvShow } from '../../types/tvShow';
import { useRouter } from 'next/router';

const Edit = () => {
    const router = useRouter()

    const { data: showData, isSuccess, error, isLoading } = useGetShowByIdQuery(router.query.id)
    console.log(showData);

    const { data: genresData } = useGetGenresQuery({})

    console.log(genresData);

    const initialGenres = [...new Array(genresData?.length)].map(() => false);
    console.log(initialGenres);


    const [checked, setChecked] = useState(false)
    console.log([...initialGenres]);

    const [checkedState, setCheckedState] = useState([...initialGenres]);

    useEffect(() => {
        isSuccess && setCheckedState([...initialGenres])
    }, [isSuccess])

    console.log(checkedState);



    const handleOnChange = (position) => {
        console.log(checkedState);

        const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);

        setCheckedState([...updatedCheckedState]);
        console.log(updatedCheckedState);

        // e.preventDefault()
        // console.log("check");
        // console.log(e.target);

        // if (e?.target?.checked === true) {
        //     // const details = {
        //     //     user: me?.id,
        //     //     episode: e.target.value
        //     // }
        //     // createProgress(details)
        //     setChecked(true)
        // }

    }

    // console.log(checkedState);


    useEffect(() => {

    }, [checkedState])


    return (
        <div className='max-w-2xl mx-auto'>
            <div className='text-3xl my-8'>Edit Show: {showData?.name}</div>
            <form className='flex flex-col' action="">
                <label className='text-xl mb-1' htmlFor="">Name</label>
                <input className='border-2 border-black rounded p-3 mb-5' value={showData?.name} type="text" />
                <label className='text-xl mb-1' htmlFor="">Year</label>
                <input className='border-2 border-black rounded p-3 mb-5' value={showData?.year} type="text" />
                <label className='text-xl mb-1' htmlFor="">Description</label>
                <textarea className='border-2 border-black rounded p-3 mb-5' rows={8} value={showData?.description} type="text" />
                <label className='text-xl mb-1' htmlFor="">Photo</label>
                <input className='border-2 border-black rounded p-3 mb-5' value={showData?.photo} type="text" />
                <label className='text-xl mb-1' htmlFor="">Length</label>
                <input className='border-2 border-black rounded p-3 mb-5' value={showData?.length} type="text" />
                <label className='text-xl mb-1' htmlFor="">Trailer</label>
                <input className='border-2 border-black rounded p-3 mb-5' value={showData?.trailer} type="text" />
                <div>
                    <label className='text-xl mb-1' htmlFor="">Genres</label>
                    {
                        showData?.genres?.map((el) =>
                            <div className='border-2 border-black rounded p-3 mb-2'>{el.name}</div>
                        )
                    }
                </div>
                <div className='mt-5'>
                    <label className='text-xl mb-5' htmlFor="">Choose new genres: (Check all needed, including the ones that are already listed)</label>
                    {
                        genresData?.map((el, index) =>
                            <div className='border-2 border-black rounded p-2 mb-2 flex justify-between'>
                                <div>{el.name}</div>
                                <div className="">
                                    <input onChange={() => handleOnChange(index)} checked={checkedState[index]} id="default-checkbox" type="checkbox" value={el.id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                </div>
                            </div>
                        )
                    }
                </div>
                <div>
                    <div>You chose genres:</div>
                    {
                        genresData?.map((el, i) =>
                            checkedState[i] ?

                                <div>
                                    {
                                        el.name
                                    }
                                </div>
                                : <div></div>

                        )
                    }
                </div>
            </form>
            <button className='text-xl text-white hover:bg-green-600 bg-green-500 p-4 font-semibold w-[45%] text-center rounded mt-5 mb-2'>Edit</button>
        </div>
    )
}

export default Edit