import { useEffect, useState } from "react";
import { useCreateProgressMutation, useGetEpsBySeasonQuery, useGetSeasonsByShowQuery, useGetMeMutation, useFindShowProgressByUserByShowMutation, useGetListsByUserMutation } from "../store/slices/apiSlice";
import { Season } from "../types/season";
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai'

const Tracker = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [season, setSeason] = useState("1")
    const [numS, setNumS] = useState("")
    const [seasonId, setSeasonId] = useState("")
    const { data: seasonsData, error, isLoading } = useGetSeasonsByShowQuery(props.show)
    console.log(season);
    console.log(seasonsData);
    const [getMe, { data: me }] = useGetMeMutation()

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
        const details = {
            token: local
        }
        getMe(details)
    }, [])

    const { data: epsData, isSuccess } = useGetEpsBySeasonQuery(seasonId)

    const [createProgress, { data: progressData }] = useCreateProgressMutation()
    const [checked, setChecked] = useState(false)

    const initialGenres = epsData && [...new Array(epsData.length)].map(() => false);

    const [checkedState, setCheckedState] = useState([]);

    console.log(new Array(epsData?.length).map(() => false));

    console.log(checkedState);

    const [findShows, { data: progressByShowData }] = useFindShowProgressByUserByShowMutation()

    const [findLists, { data: listsData }] = useGetListsByUserMutation()

    const [shows, setShows] = useState([])


    useEffect(() => {
        findShows({ user: me?.id, show: props.show });
        findLists(me?.id)
    }, [me])


    useEffect(() => {
        if (isSuccess) {
            // console.log([...new Array(epsData.length)].map(() => false));

            // setName(showData?.name);
            // setDesc(showData?.description);
            // setPhoto(showData?.photo);
            // setLength(showData?.length);
            // setYear(showData?.year);
            // setTrailer(showData?.trailer);
            // initialGenres[index] = true
            setCheckedState([...initialGenres]);
        }
    }, [isSuccess])


    console.log(checkedState);
    console.log(progressByShowData);



    const [newEps, setNewEps] = useState([])

    useEffect(() => {
        // progressByShowData && progressByShowData.map((el) => el.episode.numEp-1 && checkedState.map((item, index) => index === position ? !item : item))
        const eps = progressByShowData && progressByShowData.map((el) => el.episode.numEp)
        console.log(eps);

        setNewEps(checkedState.map((item, index) => eps?.includes(index + 1) ? !item : item))
        console.log(newEps);

    }, [progressByShowData, checkedState])

    console.log(initialGenres);
    console.log(checkedState);

    console.log(newEps);

    console.log(progressByShowData && progressByShowData.length);

    useEffect(() => {
        listsData && listsData.tvShows && setShows([...listsData.tvShows])
    }, [listsData])

    console.log(shows);
    


    const handleOnChange = (el, position) => {
        // setCheckedState([...initialGenres]);
        console.log(el);

        const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);

        setCheckedState([...updatedCheckedState]);

        if (progressByShowData && progressByShowData.length == 0) {
            const list = listsData?.filter((el) => el.name == "Currently Watching")
            console.log(list && list[0].id);
            const details = {
                user: me?.id,
                name: list[0].name,
                tvShows: [...newShowsIds]
            }
            editList({ id: list[0].id, details: details })
        }


        // e.preventDefault()
        console.log("check");
        // console.log(e.target);

        // if (e?.target?.checked === true) {
        const details = {
            user: me?.id,
            episode: el.id
        }

        createProgress(details)
        // setChecked(true)
        // }

    }

    console.log(progressData);


    return (
        <div className="h-[500px]">
            <hr className="mb-7 h-0.5 border-t-0 bg-gray-300" />
            <div className="flex flex-col items-center outline-black">
                <button onClick={() => setIsOpen((prev) => !prev)} className="p-3 w-[500px] flex items-center justify-between text-lg border-2 rounded">
                    {numS ? `Season ${numS}` : 'Choose season'}
                    {
                        !isOpen ? (
                            <AiOutlineCaretDown className="h-8" />
                        ) : (
                            <AiOutlineCaretUp className="h-8" />
                        )
                    }
                </button>
                {
                    isOpen && (
                        <div className="flex justify-center">
                            <div className="w-full text-xl flex flex-col justify-center align-center">
                                {
                                    seasonsData?.map((el) => <button onClick={() => {
                                        setSeason(el.numSeason);
                                        setIsOpen(false);
                                        setNumS(el.numSeason);
                                        setSeasonId(el.id);
                                    }}
                                        className="my-1 bg-gray-100 w-[500px] rounded p-2">{`Season ${el.numSeason}`}
                                    </button>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
                <div>
                    {
                        epsData?.map((el, index) =>
                            <div className="bg-gray-200 flex justify-between w-[500px] my-2 align-center p-2 rounded">
                                <div className="">{el.name}</div>
                                <div className="">
                                    <input onChange={() => handleOnChange(el, index)} disabled={newEps[index]} checked={newEps[index]} id="default-checkbox" type="checkbox" value={el.id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </div>
    )

};

export default Tracker;