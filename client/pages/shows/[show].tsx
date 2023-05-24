import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useChangeRateMutation, useGetMeMutation, useGetMeanRatingByShowQuery, useGetRatingOfShowByUserQuery, useGetShowByIdQuery } from '../../store/slices/apiSlice'
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
    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('userInfo'));
        const details = {
            token: local
        }
        getMe(details)
        userRatingData?.length > 0 ? setRating(userRatingData[0].rating) : 0
        // userRatingData?.length == 1 ? null : null
    }, [userRatingData])

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
            <div>
                <Review show={props.id} />
            </div>
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
            photo: context.query.photo,
            country: context.query.country,
            length: context.query.length,
            trailer: context.query.trailer,
            genres: context.query.genres,
            description: context.query.description
        }
    }
}