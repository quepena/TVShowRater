import { useEffect, useState } from "react";
import { useCreateProgressMutation, useGetEpsBySeasonQuery, useGetSeasonsByShowQuery, useGetMeMutation } from "../store/slices/apiSlice";
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

    const { data: epsData } = useGetEpsBySeasonQuery(seasonId)

    const [createProgress, { data: progressData }] = useCreateProgressMutation()
    const [checked, setChecked] = useState(false)
    const [checkedState, setCheckedState] = useState(
        new Array(epsData?.length).fill(false)
    );

    const handleOnChange = (position, e) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
        e.preventDefault()
        console.log("check");
        console.log(e.target);
        
        if (e?.target?.checked === true) {
            const details = {
                user: me?.id,
                episode: e.target.value
            }
            createProgress(details)
            setChecked(true)
        }
        
    }

    const handleCheck = (e, index) => {
        e.preventDefault()
        console.log("check");
        console.log(e.target);

        console.log(index);
        
        if (e?.target?.checked === true) {
            const details = {
                user: me?.id,
                episode: e.target.value
            }
            createProgress(details)
            setChecked(true)
        }
        if (checked && e?.target?.checked === true) {
            console.log("unchecked");

        }
    }

    console.log(progressData);


    return (
        <div className="relative flex flex-col items-center w-[340px] h-[340px] rounded-lg outline-black">
            <button onClick={() => setIsOpen((prev) => !prev)} className="p-4 w-full flex items-center justify-between text-lg active:border-white duration-300">
                {numS}
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
                    <div className="w-full">
                        {
                            seasonsData?.map((el) => <button onClick={() => {
                                setSeason(el.numSeason);
                                setIsOpen(false);
                                setNumS(el.numSeason);
                                setSeasonId(el.id);
                            }}>{`Season ${el.numSeason}`}</button>
                            )
                        }
                    </div>
                )
            }
            <div>
                {
                    epsData?.map((el, index) =>
                        <div>
                            {el.name}
                            <div className="flex items-center mb-4">
                                <input onChange={(e) => handleOnChange(index, e)} checked={checkedState[index]} id="default-checkbox" type="checkbox" value={el.id} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                        </div>)
                }
            </div>
        </div>
    )

};

export default Tracker;