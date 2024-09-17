import React from 'react'
import { useGetCastByIdQuery } from '../../store/slices/apiSlice'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../../components/Loading';

const Cast = (props) => {
    const router = useRouter()

    const { data: castData, isSuccess } = useGetCastByIdQuery(props.id)

    return (
        <div>
            {
                isSuccess ?
                    <div className='max-w-3xl mx-auto'>
                        <div className='flex'>
                            <button className='text-3xl mb-5' onClick={() => router.back()}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                            <div className='text-3xl ml-7'>{castData?.name}</div>
                        </div>
                        <div>
                            <div className='flex'>
                                <div>
                                    {
                                        castData?.photo != "https://image.tmdb.org/t/p/w500/null" ?
                                            <div className="w-[180px] h-[250px] relative">
                                                <Image src={castData?.photo} alt={castData?.name} fill />
                                            </div>
                                            :
                                            <div className="w-[180px] h-[250px] relative">
                                                <Image src="/placeholder.png" alt={castData?.name} fill />
                                            </div>
                                    }
                                </div>
                                <div className='ml-5'>{castData?.biography}</div>
                            </div>
                            <div>
                                <div>
                                    <div className='text-2xl mt-4 mb-2'>TV Shows:</div>
                                    {
                                        castData?.castTvShow?.map((el) =>
                                            <div>
                                                {
                                                    el.tvShow.photo != "https://image.tmdb.org/t/p/w500/null" ?
                                                        <div className="w-[140px] h-[200px] relative">
                                                            <Image src={el.tvShow.photo} alt={el.tvShow.name} fill />
                                                        </div>
                                                        :
                                                        <div className="w-[140px] h-[200px] relative">
                                                            <Image src="/placeholder.png" alt={el.tvShow.name} fill />
                                                        </div>
                                                }
                                                <div>{el.tvShow.name}</div>
                                                {castData?.roles && castData?.roles[0] && <div className='text-gray-400'>{castData?.roles[0].name}</div>}
                                                {el.character && <div className='text-gray-400'>{el.character}</div>}
                                            </div>
                                        )
                                    }
                                </div >
                            </div>
                        </div>
                    </div>
                    :
                    <Loading />
            }
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