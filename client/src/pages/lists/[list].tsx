import React, { useEffect, useState } from "react";
import {
  useDeleteListMutation,
  useEditListMutation,
  useGetListByIdMutation,
  useGetMeMutation,
  useGetShowByIdQuery,
  useSearchShowsMutation,
} from "../../store/slices/apiSlice";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import SearchShows from "@/components/SearchShows";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const List = (props) => {
  const router = useRouter();
  const [getListsById, { data, isSuccess }] = useGetListByIdMutation();
  const [id, setId] = useState();
  const { data: showData } = useGetShowByIdQuery(id);

  useEffect(() => {
    getListsById(props.id);
  }, []);

  const [editList] = useEditListMutation();
  const [deleteList] = useDeleteListMutation();

  const [shows, setShows] = useState([]);

  useEffect(() => {
    if (data) setShows([...data.tvShows]);
  }, [data]);

  const [getMe, { data: me }] = useGetMeMutation();

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("userInfo"));
    const details = {
      token: local,
    };
    getMe(details);
  }, []);

  const [query, setQuery] = useState("");
  const [search, { data: searchData }] = useSearchShowsMutation();
  const handleSearch = (name: string) => {
    setQuery(name);
  };

  const [showsObj, setShowsObj] = useState([{}]);
  const [setAdded] = useState(false);

  const addShow = (el, e) => {
    e.preventDefault();
    setShowsObj([...showsObj, el]);
    setAdded(true);
  };

  const deleteShow = (el, e) => {
    e.preventDefault();
    let allShows = [...showsObj];
    const newShows = allShows.filter((element) => element != el);
    setShowsObj([...newShows]);
  };

  useEffect(() => {
    search(query);
  }, [query]);

  const names = [];
  showsObj?.map((name) => names.push(name.name));

  const handleDeleteShow = (e, el) => {
    e.preventDefault();
    let allShows = [...shows];
    const newShows = allShows.filter((element) => element != el);
    setShows([...newShows]);
    const newShowsIds = newShows.map((el) => parseInt(el.id));

    const details = {
      user: me?.id,
      name: data?.name,
      tvShows: [...newShowsIds],
    };

    editList({ id: parseInt(props.id), details: details });
  };

  const handleAddShows = (e) => {
    e.preventDefault();
    const newShowsIds = shows.map((el) => parseInt(el.id));
    let newShowsObjIds: number[] = [];
    showsObj.map((el) => el.id && newShowsObjIds.push(parseInt(el.id)));

    const newShowsObjId = newShowsObjIds.map((el) => el);

    const details = {
      user: me?.id,
      name: data?.name,
      tvShows: [...newShowsIds, ...newShowsObjId],
    };

    editList({ id: parseInt(props.id), details: details });

    setShows([...shows, ...showsObj.splice(1)]);
  };

  const handleDeleteList = (e) => {
    e.preventDefault();
    deleteList(props.id);
    router.push("/lists", undefined);
  };

  return (
    <>
      {isSuccess ? (
        <div className="">
          <div className="mb-12 flex h-[50px] p-2 text-black">
            <button
              className="mx-5 mb-5 text-3xl"
              onClick={() => router.back()}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="text-2xl">{data?.name}</div>
          </div>
          <div className="flex">
            {shows.map((el) => (
              <div className="mr-2 w-full">
                <Link
                  onClick={() => setId(el.id)}
                  key={el.id}
                  href={{
                    pathname: `/shows/${el.name}`,
                    query: {
                      id: el.id,
                      name: el.name,
                    },
                  }}
                >
                  <div className="relative h-[280px] w-[180px]">
                    <Image
                      src={
                        el.photo != "https://image.tmdb.org/t/p/w500/null"
                          ? el.photo
                          : "/placeholder.png"
                      }
                      alt={el.name}
                      fill
                    />
                  </div>
                  <div className="text-xl">{el.name}</div>
                </Link>
                <button onClick={(e) => handleDeleteShow(e, el)}>
                  <FontAwesomeIcon
                    className="text-2xl text-red-600"
                    icon={faTrash}
                  />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col">
            <div>
              <SearchShows handleSearch={handleSearch} />
            </div>
            <div className="flex justify-center">
              {query &&
                searchData?.map((el) => (
                  <div className="mr-2 w-full">
                    {
                      <button
                        disabled={
                          shows.some((element) => element.photo == el.photo)
                            ? true
                            : false
                        }
                        onClick={(e) => {
                          !showsObj.some((element) => element.photo == el.photo)
                            ? addShow(el, e)
                            : deleteShow(el, e);
                        }}
                      >
                        <div className={`relative h-[280px] w-[180px]`}>
                          <Image
                            src={
                              el.photo != "https://image.tmdb.org/t/p/w500/null"
                                ? el.photo
                                : "/placeholder.png"
                            }
                            className={`${
                              shows.some(
                                (element) => element.photo === el.photo,
                              ) ||
                              showsObj.some(
                                (element) => element.photo === el.photo,
                              )
                                ? `blur-sm filter`
                                : ``
                            }`}
                            alt={el.name}
                            fill
                          />
                        </div>
                      </button>
                    }
                    <div className="text-xl">{el.name}</div>
                  </div>
                ))}
            </div>
            <div className="flex">
              <div className="mt-8 text-xl">
                <b>Added shows:</b>{" "}
                {names.length > 1 ? names.slice(1).join(", ") : ""}
              </div>
            </div>
            <Button className="my-5 mr-auto" onClick={(e) => handleAddShows(e)}>
              <PlusIcon className="mr-2 h-6 w-6" /> Add shows
            </Button>
            {data?.name == "Watchlist" ||
            data?.name == "Watched" ||
            data?.name == "Currently Watching" ? (
              ""
            ) : (
              <button
                onClick={(e) => handleDeleteList(e)}
                className="w-[30%] bg-red-500 p-5 text-2xl text-white hover:bg-red-600"
              >
                Delete list
              </button>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default List;

export const getServerSideProps = (context) => {
  return {
    props: {
      id: context.query.id,
      name: context.query.name,
    },
  };
};
