import React, { useEffect, useState } from 'react'
import { useGetRatingOfShowByUserQuery, useGetReviewsOfShowQuery, useRatingOfShowByUserMutation } from '../store/slices/apiSlice'
import Image from 'next/image'

const Review = (props) => {
    const { data: reviewData, error, isLoading } = useGetReviewsOfShowQuery(props.show)
    // console.log(reviewData);
    const [findRating, { data: userRatingData }] = useRatingOfShowByUserMutation()
    const [rate, setRate] = useState(0)

    const arr = []

    const findRatings = (el) => {
        findRating({ user: el.user.id, show: props.show })
    }

    // useEffect(() => {
    //     reviewData?.map((el) => {
    //         console.log(el)

    //         findRating({ user: el.user.id, show: props.show })

    //         arr.push(userRatingData)
    //         // console.log(userRatingData);

    //     })
    // }, [reviewData])
    // console.log(arr);



    return (
        <div>
            {
                reviewData?.map((el) =>
                    <div>
                        <Image src={el.user.photo} width={140} height={100} />
                        {
                            // findRatings(el)
                        // <div>{userRatingData?.rating}</div>
                        }
                        {/* <div>{userRatingData?.rating}</div> */}
                        <div>{el.user.name}</div>
                        <div>{el.review}</div>
                    </div>
                )
            }
        </div >
    )
}

export default Review