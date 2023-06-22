import React, { useEffect, useState } from 'react'
import { useGetRatingOfShowByUserQuery, useGetReviewsOfShowQuery, useGetShowByIdQuery, useRatingOfShowByUserMutation } from '../store/slices/apiSlice'
import Image from 'next/image'
import Stars from './Stars'

const Review = (props) => {
    const { data: reviewData, error, isLoading } = useGetReviewsOfShowQuery(props.show)
    const { data: showData } = useGetShowByIdQuery(props.show)
    const [findRating, { data: userRatingData }] = useRatingOfShowByUserMutation()
    const [reviews, setReviews] = useState(reviewData)


    // useEffect(() => {
    //     reviewData?.map((el) => {
    //         console.log(el)

    //         findRating({ user: el.user.id, show: props.show })

    //         arr.push(userRatingData)
    //         // console.log(userRatingData);

    //     })
    // }, [reviewData])
    // console.log(arr);


    useEffect(() => {
        if (props.review != "" && reviewData)
            setReviews([props.review, ...reviewData])
        else if (reviewData) {
            setReviews([...reviewData])
        }
    }, [props])

    return (
        <div>
            {
                reviews?.map((el) =>
                    <div className='flex border-2 border-black rounded-xl py-2 my-12'>
                        <div className='ml-5' style={{ display: 'inline-block', position: 'relative', width: '70px', height: '70px', overflow: 'hidden', borderRadius: '50%' }}>
                            <img style={{ width: 'auto', height: '100%' }} src={el.user.photo} alt="" />
                        </div>
                        <div className='flex flex-col ml-8'>
                            <div className='flex'>
                                <div className='text-xl'>{el.user.name} {el.user.last_name}</div>
                                <div className='mt-[5px] ml-3'><Stars props={el} /></div>
                            </div>
                            <div>{el.review}</div>
                        </div>
                    </div>

                )
            }
        </div >
    )
}

export default Review