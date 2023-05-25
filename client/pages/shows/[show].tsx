import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useChangeRateMutation, useGetMeMutation, useGetMeanRatingByShowQuery, useGetRatingOfShowByUserQuery, useGetShowByIdQuery, useReviewMutation } from '../../store/slices/apiSlice'
import { TvShow } from '../../types/tvShow'
import Image from 'next/image'
// import { Rating } from '../../types/rating'
import Info from '../../components/Info'
import Tracker from '../../components/Tracker'
import Toggle from '../../components/Toggle'
import { Rating } from 'react-simple-star-rating'
import { useRateMutation } from '../../store/slices/apiSlice'
import Review from '../../components/Review'

const Show = (props: TvShow) => {
    const router = useRouter()

    const { data: showData, error, isLoading } = useGetShowByIdQuery(props.id)
    const { data: meanData } = useGetMeanRatingByShowQuery(props.id)
    const [toggle, setToggle] = useState(true)
    const [win, setWin] = useState(false)
    const [getMe, { data: me }] = useGetMeMutation()
    const [rating, setRating] = useState(0)
    const { data: userRatingData } = useGetRatingOfShowByUserQuery({ user: me?.id, show: props.id })
    const [createRating, { data: ratingData }] = useRateMutation()
    const [changeRating, { data: changeRatingData }] = useChangeRateMutation();
    const [createReview, { data: reviewData }] = useReviewMutation();
    const [review, setReview] = useState("")
    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
        const details = {
            token: local
        }
        getMe(details)
        userRatingData?.length > 0 ? setRating(userRatingData[0].rating) : 0
        // userRatingData?.length == 1 ? null : null
    }, [userRatingData, reviewData])

    const handleReview = (e) => {
        reviewData ? setReview({}) : setReview(e.target.value)
    }


    return (
        <div className='my-0 mx-auto max-w-xl'>
            <button onClick={() => router.back()}>Back</button>
            <div>
                {
                    showData ?
                        <Image src={showData.photo} width={180} height={240} alt="" />
                        : <></>
                }
            </div>
            <div>
                <Rating onClick={(rate) => {
                    setRating(rate);
                    const details = {
                        user: me?.id,
                        tvShow: props.id,
                        rating: rate,
                    };
                    userRatingData?.length < 1 ?
                        (createRating(details)) :
                        (changeRating({ details: details, id: userRatingData[0].id }))


                }} ratingValue={rating} />
            </div>
            <p>{meanData}</p>
            <div>{userRatingData ? userRatingData.map((el: Rating) => <p key={el.userId}> {el.rating}</p>) : <></>}</div>

            <div>
                {
                    showData ? <div>
                        <h1>{showData.name}</h1>
                        <h3>{showData.year}</h3>
                        <Toggle show={props.id} />
                    </div>
                        : <></>
                }
            </div>
            <form onSubmit={((e) => {
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
        // </Link>
    )
}

export default Show

export const getServerSideProps = (context) => {
    return {
        props: {
            id: context.query.id,
            name: context.query.name,
            photo: context.query.photo,
            country: context.query.country,
            length: context.query.length,
            trailer: context.query.trailer,
            genres: context.query.genres,
            description: context.query.description
        }
    }
}