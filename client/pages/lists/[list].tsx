import React, { useEffect } from 'react'
import { useGetListByIdQuery, useGetListsByUserQuery, useGetMeMutation } from '../../store/slices/apiSlice';
import Image from 'next/image';
import Link from 'next/link';

const List = (props) => {
  const { data } = useGetListByIdQuery(props.id)

  console.log(data);


  return (
    <div>
      {
        data?.tvShows.map((el) =>
          <Link key={el.id} href={{
            pathname: `/shows/${el.name}`, query: {
                id: el.id,
                name: el.name,
            }}}>
            <Image src={el.photo} width={120} height={100} />
          </Link>
        )
      }
    </div>
  )
}

export default List

export const getServerSideProps = (context) => {
  console.log(context);
  return {

    props: {
      id: context.query.id,
      name: context.query.name,
      tvShows: context.query.tvShows,
      user: context.query.user
    }
  }
}