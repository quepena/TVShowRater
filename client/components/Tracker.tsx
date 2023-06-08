import { useEffect, useState } from "react";
import { useCreateProgressMutation, useGetEpsBySeasonQuery, useGetSeasonsByShowQuery, useGetMeMutation, useFindShowProgressByUserByShowMutation, useGetListsByUserMutation, useEditListMutation, useGetEpsBySeasonMutMutation, useGetCountEpsByShowQuery, useGetShowByIdQuery } from "../store/slices/apiSlice";
import { Season } from "../types/season";
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai'

const Tracker = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const { data: showData } = useGetShowByIdQuery(props.show)
    const [season, setSeason] = useState("1")
    const [numS, setNumS] = useState("")
    const [seasonId, setSeasonId] = useState("")
    const { data: seasonsData, error, isLoading } = useGetSeasonsByShowQuery(props.show)
    const [getMe, { data: me }] = useGetMeMutation()
    const [editList, { data: editData }] = useEditListMutation()

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

    const [findShows, { data: progressByShowData }] = useFindShowProgressByUserByShowMutation()

    const [findLists, { data: listsData }] = useGetListsByUserMutation()

    const [shows, setShows] = useState([])
    const [watchedShows, setWatchedShows] = useState([])
    const [watchlistShows, setWatchlistShows] = useState([])

    const { data: countAllEps } = useGetCountEpsByShowQuery(props.show)

    console.log(countAllEps);



    useEffect(() => {
        findShows({ user: me?.id, show: props.show });
        findLists(me?.id)
    }, [me])

    const [list, setList] = useState([])
    const [watchlist, setWatchlist] = useState([])
    const [watched, setWatched] = useState([])



    useEffect(() => {
        setList(listsData?.filter((el) => el.name == "Currently Watching"))
        setWatched(listsData?.filter((el) => el.name == "Watched"))
        setWatchlist(listsData?.filter((el) => el.name == "Watchlist"))
    }, [listsData])

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

    const [newEps, setNewEps] = useState([])

    useEffect(() => {
        // progressByShowData && progressByShowData.map((el) => el.episode.numEp-1 && checkedState.map((item, index) => index === position ? !item : item))
        const eps = progressByShowData && progressByShowData.map((el) => el.episode.numEp)

        setNewEps(checkedState.map((item, index) => eps?.includes(index + 1) ? !item : item))
    }, [progressByShowData, checkedState])

    useEffect(() => {

        list && list[0] && list[0].tvShows && setShows(list[0].tvShows)
        watchlist && watchlist[0] && watchlist[0].tvShows && setWatchlistShows(watchlist[0].tvShows)
        watched && watched[0] && watched[0].tvShows && setWatchedShows(watched[0].tvShows)
        

    }, [list])

    // useEffect(() => {
    //     console.log(allEps);
    //     console.log(allEpsData);


    //     allEps && allEpsData && setAllEps([...allEps, ...allEpsData]);
    // }, [allEpsData])

    // console.log(allEps);

    const [include, setInclude] = useState(false)
    useEffect(() => {
        Object.entries(shows).map((obj, i) => {
            const key = obj[0];
            const value = obj[1];

            console.log(value);

            showData && value.id == showData.id && setInclude(true)
        });
    }, [shows])

    progressByShowData && countAllEps && console.log(progressByShowData.length + 1, countAllEps[1]);
    

    const handleOnChange = (el, position) => {
        // setCheckedState([...initialGenres]);
        console.log(el);

        const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item);

        setCheckedState([...updatedCheckedState]);



        if (progressByShowData && progressByShowData.length == 0 && !include) {
            const newShowsIds = shows.map((el) => parseInt(el.id))
            console.log(list && list[0].id);
            const details = {
                user: me?.id,
                name: list[0].name,
                tvShows: [...newShowsIds, parseInt(props.show)]
            }

            editList({ id: list[0].id, details: details })

            const newShows = watchlist && watchlist[0] && watchlist[0].tvShows && watchlist[0].tvShows.filter((el) => el.name != showData.name)
            const newShowsWatchlistIds = newShows.map((el) => parseInt(el.id))
            const detailsWatchlist = {
                user: me?.id,
                name: watchlist[0].name,
                tvShows: [...newShowsWatchlistIds]
            }

            editList({ id: watchlist[0].id, details: detailsWatchlist })
        } else if (progressByShowData && countAllEps && progressByShowData.length + 1 == countAllEps[1] && include) {
            const newShows = list[0].tvShows.filter((el) => el.name != showData.name)
            const newShowsIds = newShows.map((el) => parseInt(el.id))
            console.log(newShowsIds);

            const details = {
                user: me?.id,
                name: list[0].name,
                tvShows: [...newShowsIds]
            }

            console.log(details);


            editList({ id: list[0].id, details: details })
            setInclude(false)

            const newShowsWatchedIds = shows.map((el) => parseInt(el.id))
            console.log(list && list[0].id);
            const detailsWatchedList = {
                user: me?.id,
                name: list[0].name,
                tvShows: [...newShowsWatchedIds, parseInt(props.show)]
            }

            editList({ id: watchlist[0].id, details: detailsWatchedList })
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