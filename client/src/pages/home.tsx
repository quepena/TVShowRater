import Link from "next/link";
import React from "react";
import { useGetAdminListsQuery } from "../store/slices/apiSlice";
import Image from "next/image";
import Loading from "@/components/Loading";

const Hero = () => {
  const { data: popular } = useGetAdminListsQuery("Popular");
  const { data, isSuccess } = useGetAdminListsQuery("Best Shows of All Time");

  console.log(popular, data);

  return (
    <div>
      {isSuccess ? (
        <div className="mx-auto my-0 max-w-7xl">
          <div>
            <div className="mb-6 text-3xl">Popular Shows</div>
            <div>
              <div className="align-center flex justify-between">
                {popular?.map((el) => (
                  <div>
                    {el.photo != "https://image.tmdb.org/t/p/w500/null" ? (
                      <Link
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
                            src={el.photo}
                            alt={el?.cast?.name}
                            fill
                            sizes="280px"
                          />
                        </div>
                      </Link>
                    ) : (
                      <Link
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
                            src="/placeholder.png"
                            alt={el?.cast?.name}
                            fill
                            sizes="280px"
                          />
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="mb-6 mt-12 text-3xl">Best shows of All Time</div>
            <div>
              <div className="align-center flex justify-between">
                {data.map((el) => (
                  <div>
                    {el.photo != "https://image.tmdb.org/t/p/w500/null" ? (
                      <Link
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
                            src={el.photo}
                            alt={el?.cast?.name}
                            fill
                            sizes="280px"
                          />
                        </div>
                      </Link>
                    ) : (
                      <Link
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
                            src="/placeholder.png"
                            alt={el?.cast?.name}
                            fill
                            sizes="280px"
                          />
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Hero;
