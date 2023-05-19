import { useGetShowByIdQuery, useGetNumSeasonsByShowQuery } from '../store/slices/apiSlice'

const Info = (props) => {
    const { data: showData, error, isLoading } = useGetShowByIdQuery(props.show)
    const { data: numSeasons } = useGetNumSeasonsByShowQuery(props.show)
    const genres = []
    showData?.genres.map((genre) => genres.push(genre.name))

    return (
        <div>
            <div>
                {
                    numSeasons ? ( numSeasons[1] > 1 ? numSeasons[1]+" seasons" : ( numSeasons[1] < 1 ? "" : numSeasons[1]+" season") ) : ""
                }
            </div>
            <div>
                {
                    genres.join(', ')
                }
            </div>
            <div>{showData?.description}</div>
        </div>
    )
};

export default Info;