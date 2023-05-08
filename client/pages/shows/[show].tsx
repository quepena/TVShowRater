import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useGetShowByIdQuery } from '../../store/slices/apiSlice'
import { TvShow } from '../../types/tvShow'

const Show = (props) => {
    const router = useRouter()

    const { data, error, isLoading } = useGetShowByIdQuery(props.id)

    return (
        <div>
            <button onClick={() => router.back()}>Back</button>
            <p>
                {data?.id}
            </p>
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