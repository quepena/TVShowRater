import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useGetMeanRatingByShowQuery, useGetRatingOfShowByUserQuery, useGetShowByIdQuery } from '../../store/slices/apiSlice'
import { TvShow } from '../../types/tvShow'
import Image from 'next/image'
import { Rating } from '../../types/rating'
import Info from '../../components/Info'
import Tracker from '../../components/Tracker'

const Show = (props: TvShow) => {
    const router = useRouter()

    const { data: showData, error, isLoading } = useGetShowByIdQuery(props.id)
    const { data: meanData } = useGetMeanRatingByShowQuery(props.id)
    const { data: userRatingData } = useGetRatingOfShowByUserQuery({ user: 50, show: 109 })

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
            <p>{meanData}</p>
            <div>{userRatingData ? userRatingData.map((el: Rating) => <p key={el.userId}> {el.rating}</p>) : <></>}</div>

            <div>
                {
                    showData ? <div>
                        <h1>{showData.name}</h1>
                        <h3>{showData.year}</h3>
                        <Info show={props.id} />
                        <Tracker />
                    </div>
                        : <></>
                }
            </div>
        </div>
        // </Link>
    )
}

export default Show

export const getServerSideProps = (context) => {
    console.log(context.query)
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