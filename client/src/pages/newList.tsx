import React, { useEffect, useState } from "react";
import {
  useCreateListMutation,
  useGetMeMutation,
  useSearchShowsMutation,
} from "../store/slices/apiSlice";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import SearchShows from "@/components/SearchShows";

const NewList = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [search, { data: searchData }] = useSearchShowsMutation();
  const handleSearch = (name: string) => {
    setQuery(name);
  };

  const [shows, setShow] = useState([{}]);
  const [added, setAdded] = useState(false);

  const addShow = (el, e) => {
    e.preventDefault();
    setShow([...shows, el]);
    setAdded(true);
  };

  const deleteShow = (el, e) => {
    e.preventDefault();
    let allShows = [...shows];
    const newShows = allShows.filter((element) => element != el);
    setShow([...newShows]);
  };

  useEffect(() => {
    search(query);
  }, [query]);

  const names = [];
  shows?.map((name) => names.push(name.name));

  const [getMe, { data: me }] = useGetMeMutation();

  const [createList, { isSuccess }] = useCreateListMutation();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("userInfo"));
    const details = {
      token: local,
    };
    getMe(details);
  }, []);

  const handleCreation = (name, shows, e) => {
    e.preventDefault();
    const arr = [];
    shows.map((el) => arr.push(el.id));
    if (name) {
      const details = {
        user: me?.id,
        name: name,
        tvShows: arr.slice(1),
      };

      createList(details);
      setName("");
      setShow([{}]);
      setQuery("");
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="my-8 flex">
        <button className="mx-5 mb-1 text-3xl" onClick={() => router.back()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="text-2xl font-bold">Add a new list</div>
      </div>
      <form action="" className="flex flex-col">
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          type="text"
          value={name}
          className={
            error
              ? `mb-5 h-12 w-full rounded border-2 border-red-600 pl-5 text-lg drop-shadow-xl`
              : `mb-5 h-12 w-full rounded border-2 border-gray-600 pl-5 text-lg`
          }
        />
        <div>
          <SearchShows handleSearch={handleSearch} />
        </div>
        <div className="flex justify-center">
          {query &&
            searchData?.map((el) => (
              <div className="mr-2 w-full">
                {
                  <button
                    onClick={(e) => {
                      !shows.some((element) => element.photo == el.photo)
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
                        className={`${shows.some((element) => element.photo === el.photo) ? `blur-sm filter` : ``}`}
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
            {names.length > 0 ? names.slice(1).join(", ") : ""}
          </div>
        </div>
        <button
          onClick={(e) => handleCreation(name, shows, e)}
          className="mb-2 ml-auto mt-5 w-[65%] rounded bg-green-500 p-4 text-center text-xl font-semibold"
        >
          Add a list
        </button>
      </form>
      <div className="text-bold mt-6 text-right text-xl text-green-600">
        {isSuccess ? "New list was successfully created" : ""}
      </div>
    </div>
  );
};

export default NewList;
