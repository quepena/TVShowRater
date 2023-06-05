import { log } from 'console';
import { useGetShowByIdQuery, useGetNumSeasonsByShowQuery, useGetCastByShowQuery, useGetCrewByShowQuery, useReviewMutation, useGetMeMutation } from '../store/slices/apiSlice'
import Image from 'next/image'
import { castTvShow } from '../types/castTvShow';
import { useEffect, useRef, useState } from 'react';
import Review from './Review';

const Info = (props) => {
    const { data: showData, error, isLoading } = useGetShowByIdQuery(props.show)
    const { data: numSeasons } = useGetNumSeasonsByShowQuery(props.show)
    const { data: castInfo } = useGetCastByShowQuery(props.show)
    const { data: crewInfo } = useGetCrewByShowQuery(props.show)
    const genres = []
    showData?.genres.map((genre) => genres.push(genre.name))
    const [createReview, { data: reviewData }] = useReviewMutation();
    const [review, setReview] = useState("")

    const [getMe, { data: me }] = useGetMeMutation()

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
        const details = {
            token: local
        }
        getMe(details)
        // userRatingData?.length == 1 ? null : null
        // getRate({ user: me?.id, show: props.id })
    }, [review])

    console.log(reviewData);
    

    const handleReview = (e) => {
        reviewData ? setReview("") : setReview(e.target.value)
    }
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
            <div>
                <form className='mt-12' onSubmit={((e) => {
                    e.preventDefault();
                    console.log(review);

                    const details = {
                        user: me?.id,
                        tvShow: props.show,
                        review: review,
                    };
                    console.log(details);
                    
                    createReview(details)
                    setReview("")
                })}>
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                            <textarea rows={7} onChange={(e) => setReview(e.target.value)} id="comment" className="text-lg w-full px-0 text-gray-900 bg-white border-0 dark:bg-gray-800" placeholder="Write a comment..." required></textarea>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                            <button type="submit" className="inline-flex items-center py-2.5 px-8 text-xl font-medium text-center text-gray-200 bg-blue-700 rounded-lg hover:bg-blue-800 hover:text-white">
                                Post comment
                            </button>
                        </div>
                    </div>
                </form>
                <div>
                    <Review show={props.show} />
                </div>
            </div>
        </div >
    )
};

export default Info;