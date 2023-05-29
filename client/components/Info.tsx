import { log } from 'console';
import { useGetShowByIdQuery, useGetNumSeasonsByShowQuery, useGetCastByShowQuery, useGetCrewByShowQuery } from '../store/slices/apiSlice'
import Image from 'next/image'
import { castTvShow } from '../types/castTvShow';
import { useRef } from 'react';

const Info = (props) => {
    const { data: showData, error, isLoading } = useGetShowByIdQuery(props.show)
    const { data: numSeasons } = useGetNumSeasonsByShowQuery(props.show)
    const { data: castInfo } = useGetCastByShowQuery(props.show)
    const { data: crewInfo } = useGetCrewByShowQuery(props.show)
    const genres = []
    showData?.genres.map((genre) => genres.push(genre.name))
    // const cast: Array = []
    // console.log(castInfo);
    // castInfo?.map((el) => {
    //     cast.push(el)
    // })
    // console.log(cast);


    return (
        <div>
            <hr className="mb-7 h-0.5 border-t-0 bg-gray-300" />
            <div className='text-2xl mb-2'>
                {
                    numSeasons ? (numSeasons[1] > 1 ? numSeasons[1] + " seasons" : (numSeasons[1] < 1 ? "" : numSeasons[1] + " season")) : ""
                }
            </div>
            <div className='mb-6 text-xl text-gray-800'>
                {
                    genres.join(', ')
                }
            </div>
            <div className='mb-12 text-lg'>{showData?.description}</div>
            <div className='mb-7'>
                {
                    castInfo && castInfo.length > 0
                        ?
                        <div>
                            <div className='text-3xl font-semibold mb-3'>Cast</div>
                            <div className='flex justify-left'>
                                {
                                    castInfo?.map((el: castTvShow) =>
                                        <div key={el?.id} className='mr-2'>
                                            {
                                                el?.cast?.photo == "https://image.tmdb.org/t/p/w500/null"
                                                    ?
                                                    <div className='mr-2'>
                                                        <div className="w-[140px] h-[200px] relative">
                                                            <Image src="/placeholder.png" alt={el?.cast?.name} fill />
                                                        </div>
                                                        <div>{el?.cast?.name}</div>
                                                        <div className='text-gray-400'>{el?.cast?.roles[0].name}</div>
                                                    </div>
                                                    :
                                                    <div className='mr-2'>
                                                        <div className="w-[140px] h-[200px] relative">
                                                            <Image src={el?.cast?.photo} alt={el?.cast?.name} fill />
                                                        </div>
                                                        <div>{el?.cast?.name}</div>
                                                        <div className='text-gray-400'>{el?.character}</div>
                                                    </div>
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        :
                        <></>
                }
            </div>
            <div>
                {
                    crewInfo && crewInfo.length > 0
                        ?
                        <div>
                            <div className='text-3xl font-semibold'>Crew</div>
                            <div className='flex justify-left'>
                                {
                                    crewInfo?.map((el: castTvShow) =>
                                        // console.log(el);

                                        <div key={el?.id} className='mr-2'>
                                            {
                                                el?.cast?.photo == "https://image.tmdb.org/t/p/w500/null"
                                                    ?
                                                    <div className='mr-2'>
                                                        <div className="w-[140px] h-[200px] relative">
                                                            <Image src="/placeholder.png" alt={el?.cast?.name} fill />
                                                        </div>
                                                        <div>{el?.cast?.name}</div>
                                                        <div className='text-gray-400'>{el?.cast?.roles[0].name}</div>
                                                    </div>
                                                    :
                                                    <div className='mr-2'>
                                                        <div className="w-[140px] h-[200px] relative">
                                                            <Image src={el?.cast?.photo} alt={el?.cast?.name} fill />
                                                        </div>
                                                        <div>{el?.cast?.name}</div>
                                                        <div className='text-gray-400'>{el?.cast?.roles[0].name}</div>
                                                    </div>
                                            }
                                        </div>
                                    )}
                            </div>
                        </div>
                        : <></>
                }
            </div>
        </div >
    )
};

export default Info;