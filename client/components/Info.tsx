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
            <div>
                {
                    numSeasons ? (numSeasons[1] > 1 ? numSeasons[1] + " seasons" : (numSeasons[1] < 1 ? "" : numSeasons[1] + " season")) : ""
                }
            </div>
            <div>
                {
                    genres.join(', ')
                }
            </div>
            <div>{showData?.description}</div>
            <div>Cast
                <div className='flex justify-center'>
                {
                    castInfo?.map((el: castTvShow) =>
                        <div key={el?.id}>
                            <Image src={el?.cast?.photo} width={180} height={240} alt="photo" />
                            <div>{el?.cast?.name}</div>
                            <div className='text-gray-400'>{el?.character}</div>
                        </div>
                    )
                }
                </div>
            </div>
            <div>Crew
            <div className='flex justify-center'>
                {
                    crewInfo?.map((el: castTvShow) =>
                        // console.log(el);

                        <div key={el?.id}>
                            {
                                el?.cast?.photo == "https://image.tmdb.org/t/p/w500/null"
                                    ?
                                    <div>
                                        <Image src="/placeholder.png" width={180} height={240} alt="" />
                                        <div>{el?.cast?.name}</div>
                                        <div className='text-gray-400'>{el?.cast?.roles[0].name}</div>
                                    </div>
                                    :
                                    <div>
                                        <Image src={el?.cast?.photo} width={180} height={240} alt="" />
                                        <div>{el?.cast?.name}</div>
                                        <div className='text-gray-400'>{el?.cast?.roles[0].name}</div>
                                    </div>
                            }
                        </div>
                    )}
            </div>
            </div>
        </div >
    )
};

export default Info;