import { useGetShowByIdQuery } from '../store/slices/apiSlice'

const Info = (props) => {
    const { data: showData, error, isLoading } = useGetShowByIdQuery(props.show)

    return (
        <div>
            <div>
                {
                    showData?.genres.map((genre) => <div key={genre.id}>{genre.name}</div>)
                }
            </div>
            <div>{showData?.description}</div>
        </div>
    )
};

export default Info;