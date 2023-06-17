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
import Loading from '../../components/Loading'

const Show = (props: TvShow) => {
    const router = useRouter()

    const { data: showData, error, isLoading, isSuccess } = useGetShowByIdQuery(props.id)
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
    // const [createReview, { data: reviewData }] = useReviewMutation();
    // const [review, setReview] = useState("")
    const [create, setCreate] = useState(true)
    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
        const details = {
            token: local
        }
        getMe(details)
        // userRatingData?.length == 1 ? null : null
        // getRate({ user: me?.id, show: props.id })
    }, [])

    useEffect(() => {
        userRatingData && userRatingData[0] ? setRating(userRatingData[0].rating) : setRating(0)
        if (userRatingData && userRatingData[0]) setCreate(false)
    }, [userRatingData])

    // useEffect(() => {
    //     setRating(rating)
    // }, [])

    useEffect(() => {
        refetch()
        // console.log(rating);
    }, [])

    const ratingHandler = (rate) => {
        setRating(rate)
        const details = {
            user: me?.id,
            tvShow: props.id,
            rating: rate,
        };
        // createRating(details)
        // refetch()

        if ((ratingData && rating != rate && !create) || (userRatingData && userRatingData[0] && rating != rate && !create)) {
            changeRating({ details: details, id: ratingData ? ratingData.id : userRatingData[0].id })
            // createRating(details);
            // deleteRating(userRatingData[0].id)
            // console.log("change");
            // refetch()
        } else if ((ratingData && rating == rate && !create) || (userRatingData && userRatingData[0] && rating == rate && !create)) {
            // console.log(rating);
            // console.log("delete");

            deleteRating(ratingData ? ratingData.id : userRatingData[0].id)
            setRating(0)
            setCreate(true)
        } else if (rating == 0 && create) {
            createRating(details)
            // console.log("create");
            setCreate(false)
            // refetch()
        }
        // refetch()

    }

    console.log(showData);


    return (
        <div>
            {
                isSuccess
                    ?
                    <div className='my-0 mx-auto max-w-5xl flex'>
                        <div className='mr-7'>
                            <button className='text-3xl mb-5' onClick={() => router.back()}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            <div>
                                {
                                    showData.photo != "https://image.tmdb.org/t/p/w500/null" ?
                                        <div className="w-[200px] h-[300px] relative">
                                            <Image src={showData.photo} alt={showData.name} fill />
                                        </div>
                                        // <Image src={showData.photo} width={250} height={300} alt="photo" />
                                        :
                                        <div className="w-[200px] h-[300px] relative">
                                            <Image src="/placeholder.png" alt={showData.name} fill />
                                        </div>
                                }
                            </div>
                            <div className='mt-5 mb-2'>
                                <Rating size={40} onClick={(rate) => ratingHandler(rate)}
                                    ratingValue={rating} />
                            </div>
                            <p className='text-lg'>Average Rating: {meanData && meanData.toFixed(2)}</p>
                            <div>Your rating: {rating}</div>
                        </div>

                        <div>
                            <div>
                                {
                                    showData ?
                                        <div>
                                            <div className='flex max-w-2xl'>
                                                <h1 className='text-4xl mb-5'>{showData.name}</h1>
                                                {
                                                    showData.year &&
                                                    <h3 className='text-2xl my-1 ml-3 text-gray-400 font-bold'>{moment(showData.year).format('YYYY')}</h3>
                                                }
                                            </div>
                                            <Toggle show={props.id} />
                                        </div>
                                        : <div></div>
                                }
                            </div>
                        </div >
                    </div>
                    :
                    <Loading />
            }
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