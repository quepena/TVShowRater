import React, { useEffect, useState } from "react";
import {
    useGetListsByUserMutation,
    useGetMeMutation,
    useSearchMutation,
} from "../../store/slices/apiSlice";
import Image from "next/image";
import Link from "next/link";
import Search from "src/components/Search";
import Loading from "src/components/Loading";
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import SearchShows from "@/components/SearchShows";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
});

const MyShows = () => {
    const [getMe, { data: me }] = useGetMeMutation();
    const [getLists, { data, isSuccess }] = useGetListsByUserMutation();

    const [query, setQuery] = useState("");
    const [search, { data: searchData }] = useSearchMutation();

    const shows = [];
    const castCrew = [];
    const handleSearch = (name: string) => {
        setQuery(name);
    };
    searchData?.map((el) =>
        el.hasOwnProperty("addId") ? shows.push(el) : castCrew.push(el)
    );

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem("userInfo"));
        const details = {
            token: local,
        };
        getMe(details);
    }, []);

    useEffect(() => {
        getLists(me?.id);
    }, [me]);

    useEffect(() => {
        search(query);
    }, [query]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };

    return (
        <div>
            {isSuccess ? (
                <div className="">
                    <Search handleSearch={handleSearch} />

                    {query ? (
                        <div className="">
                            <div className="">
                                {shows.length > 0 ? (
                                    <div className="">
                                        <div className="text-3xl font-semibold mt-7 mb-4">
                                            Shows
                                        </div>
                                        <div className="flex">
                                            {shows.map((el) => (
                                                <div className="mr-2 w-full">
                                                    <div className="w-[180px] h-[280px] relative">
                                                        <Image
                                                            src={
                                                                el.photo !=
                                                                "https://image.tmdb.org/t/p/w500/null"
                                                                    ? el.photo
                                                                    : "/placeholder.png"
                                                            }
                                                            alt={el.name}
                                                            fill
                                                        />
                                                    </div>
                                                    <div className="text-xl">
                                                        {el.name}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                            <div className="mb-12">
                                {castCrew.length > 0 ? (
                                    <div>
                                        <div className="text-3xl font-semibold mt-7 mb-4">
                                            Cast & Crew
                                        </div>
                                        <div className="flex">
                                            {castCrew.map((el) => (
                                                <div className="mr-2 w-full">
                                                    <div className="w-[180px] h-[280px] relative">
                                                        <Image
                                                            src={
                                                                el.photo !=
                                                                "https://image.tmdb.org/t/p/w500/null"
                                                                    ? el.photo
                                                                    : "/placeholder.png"
                                                            }
                                                            alt={el.name}
                                                            fill
                                                        />
                                                    </div>
                                                    <div className="text-xl">
                                                        {el.name}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Dialog>
                                <DialogTrigger className="flex w-full items-end">
                                    <Button className="my-5 ml-auto">
                                        <PlusIcon className="h-6 w-6 mr-2" />{" "}
                                        Add a list
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Create a new list
                                        </DialogTitle>
                                    </DialogHeader>
                                    <Form {...form}>
                                        <form
                                            onSubmit={form.handleSubmit(
                                                onSubmit
                                            )}
                                            className="space-y-8"
                                        >
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="My List"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            This is your list
                                                            name.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <SearchShows
                                                handleSearch={handleSearch}
                                            />
                                            <Button type="submit">
                                                Submit
                                            </Button>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                            <ScrollArea className="h-[600px]">
                                {data?.map((el) => (
                                    <Link
                                        key={el.id}
                                        href={{
                                            pathname: `/lists/${el.name}`,
                                            query: {
                                                id: el.id,
                                                name: JSON.stringify(el.name),
                                            },
                                        }}
                                    >
                                        <Card className="p-5 flex mb-5 w-full h-[350px]">
                                            <div className="relative top-0 left-0">
                                                {el.tvShows &&
                                                el.tvShows.length <= 1 ? (
                                                    <div className="w-[220px] h-[280px] relative mr-5 top-0 left-0">
                                                        <Image
                                                            src={
                                                                el.tvShows &&
                                                                el.tvShows[0]
                                                                    ? el
                                                                          .tvShows[0]
                                                                          .photo
                                                                    : "/placeholder.png"
                                                            }
                                                            alt={
                                                                el.tvShows &&
                                                                el.tvShows[0] &&
                                                                el.tvShows[0]
                                                                    .name
                                                            }
                                                            fill
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-[220px] h-[280px] relative mr-5 top-[40px] left-0">
                                                        <Image
                                                            src={
                                                                el.tvShows &&
                                                                el.tvShows[0]
                                                                    ? el
                                                                          .tvShows[0]
                                                                          .photo
                                                                    : "/placeholder.png"
                                                            }
                                                            alt={
                                                                el.tvShows &&
                                                                el.tvShows[0] &&
                                                                el.tvShows[0]
                                                                    .name
                                                            }
                                                            fill
                                                        />
                                                    </div>
                                                )}
                                                {el.tvShows &&
                                                    el.tvShows.length > 1 && (
                                                        <div className="w-[220px] h-[280px] relative mr-5 top-[-260px] left-[15px]">
                                                            <Image
                                                                className="drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
                                                                src={
                                                                    el
                                                                        .tvShows[1]
                                                                        ? el
                                                                              .tvShows[1]
                                                                              .photo
                                                                        : "/placeholder.png"
                                                                }
                                                                alt={
                                                                    el.tvShows &&
                                                                    el
                                                                        .tvShows[1] &&
                                                                    el
                                                                        .tvShows[1]
                                                                        .name
                                                                }
                                                                fill
                                                            />
                                                        </div>
                                                    )}
                                                {el.tvShows &&
                                                    el.tvShows.length > 2 && (
                                                        <div className="w-[220px] h-[280px] relative mr-5 top-[-560px] left-[30px]">
                                                            <Image
                                                                className="drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
                                                                src={
                                                                    el
                                                                        .tvShows[2]
                                                                        ? el
                                                                              .tvShows[2]
                                                                              .photo
                                                                        : "/placeholder.png"
                                                                }
                                                                alt={
                                                                    el.tvShows &&
                                                                    el
                                                                        .tvShows[2] &&
                                                                    el
                                                                        .tvShows[2]
                                                                        .name
                                                                }
                                                                fill
                                                            />
                                                        </div>
                                                    )}
                                            </div>
                                            <div className="flex justify-between w-full">
                                                <div className="text-3xl ml-8">
                                                    {el.name}
                                                </div>
                                                <div className="ml-5">
                                                    {el.tvShows.length % 10 == 1
                                                        ? `${el.tvShows.length} show`
                                                        : `${el.tvShows.length} shows`}
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </ScrollArea>
                        </div>
                    )}
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default MyShows;
