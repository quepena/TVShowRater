import React from "react";
import { Input } from "./ui/input";

const SearchShows = ({ handleSearch }) => {
    return (
        <div className="my-0 mx-auto max-w-7xl">
            <Input
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                type="text"
                placeholder="Search Show by Name"
            />
        </div>
    );
};

export default SearchShows;
