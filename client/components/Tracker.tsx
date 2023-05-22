import { useState } from "react";
import { useGetEpsBySeasonQuery, useGetSeasonsByShowQuery } from "../store/slices/apiSlice";
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
    

    const { data: epsData } = useGetEpsBySeasonQuery(seasonId)

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
                    epsData?.map((el) => <div>
                        {el.name}
                    </div>)
                }
            </div>
        </div>
    )

};

export default Tracker;