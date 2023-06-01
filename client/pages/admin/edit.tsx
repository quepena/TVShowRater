import React, { useEffect, useState } from 'react'
import { useEditShowMutation, useGetGenresQuery, useGetShowByIdQuery } from '../../store/slices/apiSlice'
import { TvShow } from '../../types/tvShow';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Edit = () => {
    const router = useRouter()

    const { data: showData, isSuccess, error, isLoading } = useGetShowByIdQuery(router.query.id)

    const [editShow, { isSuccess: editSuccess, error: editError }] = useEditShowMutation()

    const [name, setName] = useState(showData?.name)
    const [desc, setDesc] = useState(showData?.description)
    const [photo, setPhoto] = useState(showData?.photo)
    const [length, setLength] = useState(showData?.length)
    const [year, setYear] = useState(showData?.year)
    const [trailer, setTrailer] = useState(showData?.trailer)

    const { data: genresData } = useGetGenresQuery({})

    const initialGenres = [...new Array(genresData?.length)].map(() => false);

    const [checkedState, setCheckedState] = useState([...initialGenres]);

    const [emptyErrors, setEmptyErrors] = useState([false, false, false, false, false, false])

    useEffect(() => {
        if (isSuccess) {
            setName(showData?.name);
            setDesc(showData?.description);
            setPhoto(showData?.photo);
            setLength(showData?.length);
            setYear(showData?.year);
            setTrailer(showData?.trailer);
            setCheckedState([...initialGenres]);
        }
    }, [isSuccess])

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);

        setCheckedState([...updatedCheckedState]);
    }

    // let newItems = [...emptyErrors]

    useEffect(() => {

    }, [checkedState])

    const handleEdit = (e, details) => {
        e.preventDefault()
        const arr = details.genresData.filter((el, i) => checkedState[i]);

        const show = {
            name: details.name,
            year: details.year,
            description: details.desc,
            photo: details.photo,
            length: details.length,
            trailer: details.trailer,
            genres: arr.map((el) => el.id)
        }
        
        let newItems = [...emptyErrors]
        Object.entries(show).map((obj, index) => {
            const key = obj[0];
            const value = obj[1];


            // value?.length == 0 && setEmptyErrors([...emptyErrors, true])
            value?.length == 0 && !Array.isArray(value) && emptyErrors.map((el, i) => i == index && (newItems[i] = true
            )
            )

            // console.log(emptyErrors);


            // JSON.stringify(value)?.length == 0 &&
            //     // setEmptyErrors([...emptyErrors, false])
            //     console.log(value?.length);

            console.log(newItems);
            
        });
        console.log(newItems);
        
        setEmptyErrors([...newItems])



        // values.forEach((value, key) => {
        //     JSON.stringify(value)?.length == 0 &&
        //     setEmptyErrors([...emptyErrors, false])
        // });

        console.log(emptyErrors);


        editShow({ id: parseInt(router.query.id), details: show })

    }

    // console.log(emptyErrors);



    return (
        <div className='max-w-2xl mx-auto'>
            <div className='flex'>
                <button className='text-3xl mb-1 mr-5' onClick={() => router.back()}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div className='text-3xl my-8'>Edit Show: {showData?.name}</div>
            </div>
            <form className='flex flex-col' action="">
                <label className='text-xl mb-1' htmlFor="">Name</label>
                <input onChange={(e) => setName(e.target.value)} className='border-2 border-black rounded p-3 mb-5' value={name} type="text" />
                <label className='text-xl mb-1' htmlFor="">Year</label>
                <input onChange={(e) => setYear(e.target.value)} className='border-2 border-black rounded p-3 mb-5' value={year} type="text" />
                <label className='text-xl mb-1' htmlFor="">Description</label>
                <textarea onChange={(e) => setDesc(e.target.value)} className='border-2 border-black rounded p-3 mb-5' rows={8} value={desc} type="text" />
                <label className='text-xl mb-1' htmlFor="">Photo</label>
                <input onChange={(e) => setPhoto(e.target.value)} className='border-2 border-black rounded p-3 mb-5' value={photo} type="text" />
                <label className='text-xl mb-1' htmlFor="">Length</label>
                <input onChange={(e) => setLength(e.target.value)} className='border-2 border-black rounded p-3 mb-5' value={length} type="text" />
                <label className='text-xl mb-1' htmlFor="">Trailer</label>
                <input onChange={(e) => setTrailer(e.target.value)} className='border-2 border-black rounded p-3 mb-5' value={trailer} type="text" />
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
                    <div className='mt-4'>You chose genres:</div>
                    {
                        genresData?.map((el, i) =>
                            checkedState[i] ? <div className='mx-2'>{el.name}</div> : <div></div>
                        )
                    }
                </div>
            </form >
            <button onClick={(e) => handleEdit(e, { name, year, desc, length, trailer, photo, genresData })} className='text-xl text-white hover:bg-green-600 bg-green-500 p-4 font-semibold w-[45%] text-center rounded mt-5 mb-2 ml-auto'>Edit</button>
            {
                editSuccess && <div className='text-green-600 text-xl mb-5'>Edit successful</div>
            }
            {
                editError && <div className='text-red-500 text-xl mb-5'>Edit failed</div>
            }
        </div >
    )
}

export default Edit