import React from 'react'
import { useGetCastByIdQuery } from '../../store/slices/apiSlice'
import Image from 'next/image';

const Cast = (props) => {
    const { data: castData } = useGetCastByIdQuery(props.id)

    console.log(castData);


    return (
        <div>
            <div className="w-[140px] h-[200px] relative">
                <Image src={castData?.photo} alt={castData?.name} fill />
            </div>
        </div>
    )
}

export default Cast

export const getServerSideProps = (context) => {
    return {
        props: {
            id: context.query.id,
            name: context.query.name,
        }
    }
}