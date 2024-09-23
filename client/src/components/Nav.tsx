import Link from "next/link";
import React, { useEffect, useState } from "react";
import navButtons from "./NavButtons";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useGetMeMutation } from "../store/slices/apiSlice";
import { useRouter } from "next/router";
import NavBar from "./NavBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const Nav = () => {
  const router = useRouter();
  const [getMe, { data: me }] = useGetMeMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [loc, setLoc] = useState({});

  useEffect(() => {
    if (
      localStorage.getItem("userInfo") == null ||
      localStorage.getItem("userInfo") == "" ||
      !localStorage.getItem("userInfo") ||
      localStorage.getItem("userInfo") === "undefined"
    )
      router.push("/login");
    else {
      const local = JSON.parse(localStorage.getItem("userInfo"));
      const details = {
        token: local,
      };
      getMe(details);
    }
  }, []);

  useEffect(() => {
    if (me && me.hasOwnProperty("id")) setLoc(me);
  }, [me]);

  return (
    <nav className="sticky top-0 z-50 mb-12 bg-sky-400">
      <main className="mx-auto my-0 max-w-7xl px-6 text-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center text-xl">
            <Link href="/" className="mr-4 text-2xl font-semibold text-white">
              TVShowRater
            </Link>
            {me ? <NavBar navButtons={navButtons} /> : <></>}
          </div>
          {me ? (
            <div className="flex items-center justify-center text-xl">
              {
                <DropdownMenu>
                  <DropdownMenuTrigger className="">
                    <Button onClick={() => setIsOpen((prev) => !prev)}>
                      {!isOpen ? (
                        <AiOutlineCaretDown className="" />
                      ) : (
                        <AiOutlineCaretUp className="" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link onClick={() => setIsOpen(false)} href="/admin">
                        <div>Admin panel</div>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              }
              <div className="p-8 text-white">Hello, {me?.name}</div>
              <div
                style={{
                  display: "inline-block",
                  position: "relative",
                  width: "70px",
                  height: "70px",
                  overflow: "hidden",
                  borderRadius: "50%",
                  margin: "auto",
                }}
              >
                <img
                  style={{ width: "auto", height: "100%" }}
                  src={me?.photo}
                  alt=""
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center p-8 text-xl"></div>
          )}
        </div>
      </main>
    </nav>
  );
};

export default Nav;
