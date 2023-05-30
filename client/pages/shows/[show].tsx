import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useChangeRateMutation, useDeleteRateMutation, useGetMeMutation, useGetMeanRatingByShowQuery, useGetRatingOfShowByUserMutMutation, useGetRatingOfShowByUserQuery, useGetShowByIdQuery, useReviewMutation } from '../../store/slices/apiSlice'
import { TvShow } from '../../types/tvShow'
import Image from 'next/image'
// import { Rating } from '../../types/rating'
import Info from '../../components/Info'
import Tracker from '../../components/Tracker'
import Toggle from '../../components/Toggle'
import { Rating } from 'react-simple-star-rating'
import { useRateMutation } from '../../store/slices/apiSlice'
import Review from '../../components/Review'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

const Show = (props: TvShow) => {
    const router = useRouter()

    const { data: showData, error, isLoading } = useGetShowByIdQuery(props.id)
    const { data: meanData } = useGetMeanRatingByShowQuery(props.id)
    const [toggle, setToggle] = useState(true)
    const [win, setWin] = useState(false)
    const [getMe, { data: me }] = useGetMeMutation()
    const [rating, setRating] = useState(0)
    const { data: userRatingData, refetch } = useGetRatingOfShowByUserQuery({ user: me?.id, show: props.id })
    const [getRate, { data: userRateData }] = useGetRatingOfShowByUserMutMutation()
    const [createRating, { data: ratingData }] = useRateMutation()
    const [changeRating, { data: changeRatingData }] = useChangeRateMutation();
    const [deleteRating, { data: deleteRatingData }] = useDeleteRateMutation();
    const [createReview, { data: reviewData }] = useReviewMutation();
    const [review, setReview] = useState("")
    const [create, setCreate] = useState(0)
    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
        const details = {
            token: local
        }
        getMe(details)
        // userRatingData?.length == 1 ? null : null
        getRate({ user: me?.id, show: props.id })
    }, [reviewData])

    useEffect(() => {
        refetch()
        setCreate(create)
        // console.log(userRatingData);
        // console.log(rating);


        userRatingData?.length > 0 && setRating(userRatingData[0].rating)
    }, [rating, create])

    const handleReview = (e) => {
        reviewData ? setReview({}) : setReview(e.target.value)
    }

    return (
        <div className='my-0 mx-auto max-w-5xl flex'>
            <div className='mr-7'>
                <button className='text-3xl mb-5' onClick={() => router.back()}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <div>
                    {
                        showData ?
                            <div className="w-[200px] h-[300px] relative">
                                <Image src={showData.photo} alt={showData.name} fill />
                            </div>
                            // <Image src={showData.photo} width={250} height={300} alt="photo" />
                            : <></>
                    }
                </div>
                <div className='mt-5 mb-2'>
                    <Rating size={40} onClick={(rate) => {
                        setRating(rate)

                        const details = {
                            user: me?.id,
                            tvShow: props.id,
                            rating: rate,
                        };
                        // getRate({ user: me?.id, show: props.id })
                        // refetch()
                        console.log(create);



                        if (create == 0) {
                            createRating(details)
                            // setRating(rate)
                            if (rate && rate == rating) setCreate(2)
                            setCreate(1)
                            console.log("create")
                            // getRate({ user: me?.id, show: props.id })
                            // refetch()
                        }
                        if (create == 1 && userRatingData[0]) {
                            // refetch()
                            changeRating({ details: details, id: userRatingData[0].id })
                            // setRating(rate)   
                            console.log("change")
                            setCreate(2)
                        }
                        if (create == 2 && rate && rate == rating && userRatingData[0]) {
                            deleteRating(userRatingData[0].id)
                            // setRating(0)
                            setCreate(0)
                            console.log("delete")
                        }

                        // router.reload()

                        // refetch()

                    }} ratingValue={userRatingData && userRatingData[0] ? userRatingData[0].rating : rating} />
                </div>
                <p className='text-lg'>Average Rating: {meanData}</p>
                <div>{userRatingData ? userRatingData.map((el: Rating) => <p key={el.userId}> {el.rating}</p>) : <></>}</div>
            </div>

            <div>
                <div>
                    {
                        showData ?
                            <div>
                                <div className='flex max-w-2xl'>
                                    <h1 className='text-4xl mb-5'>{showData.name}</h1>
                                    <h3 className='text-2xl my-1 ml-3 text-gray-400 font-bold'>{moment(showData.year).format('YYYY')}</h3>
                                </div>
                                <Toggle show={props.id} />
                            </div>
                            : <div></div>
                    }
                </div>
                <form className='mt-12' onSubmit={((e) => {
                    e.preventDefault();
                    console.log(review);

                    const details = {
                        user: me?.id,
                        tvShow: props.id,
                        review: review,
                    };
                    createReview(details)
                    setReview("")
                })}>
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                            <label htmlFor="comment" className="sr-only">Your comment</label>
                            <textarea onChange={(e) => setReview(e.target.value)} id="comment" className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                            <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                Post comment
                            </button>
                        </div>
                    </div>
                </form>
                <div>
                    <Review show={props.id} />
                </div>
            </div >
        </div>
        // </Link>
    )
}

export default Show

export const getServerSideProps = (context) => {
    return {
        props: {
            id: context.query.id,
            name: context.query.name,
        }
    }
}