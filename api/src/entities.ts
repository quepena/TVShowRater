import { Cast, CastTvShow } from "./cast/cast.entity";
import { Genre } from "./genre/genre.entity";
import { Role } from "./role/role.entity";
import { User } from "./user/user.entity";
import { TvShow } from "./tv-show/tv-show.entity"
import { Season } from "./season/season.entity";
import { Episode } from "./episode/episode.entity";
import { List } from "./list/list.entity";
import { Progress } from "./progress/progress.entity"
import { Rating } from "./rating/rating.entity";
import { Review } from "./review/review.entity";

const entities = [
    Genre,
    Cast,
    Role,
    User,
    TvShow,
    Season,
    Episode,
    List,
    Progress,
    Rating,
    Review,
    CastTvShow,
];

export {Genre, Cast, Role, User, TvShow, Season, Episode, Progress, Rating, Review, CastTvShow };
export default entities;