import { Cast } from "./cast/cast.entity";
import { Crew } from "./crew/crew.entity";
import { Genre } from "./genre/genre.entity";
import { Role } from "./role/role.entity";
import { User } from "./user/user.entity";
import { TvShow } from "./tv-show/tv-show.entity"
import { Season } from "./season/season.entity";
import { Episode } from "./episode/episode.entity";
import { List } from "./list/list.entity";
import { Progress } from "./progress/progress.entity"

const entities = [
    Genre,
    Cast,
    Role,
    Crew,
    User,
    TvShow,
    Season,
    Episode,
    List,
    Progress
];

export {Genre, Cast, Role, Crew, User, TvShow, Season, Episode};
export default entities;