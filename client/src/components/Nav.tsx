import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { User } from "@/types/user";

interface Props {
  me: User | undefined;
  setLogout: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
}

const Nav = (props: Props) => {
  const { me, setLogout } = props;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  // const [getMe, { data: me, isSuccess }] = useGetMeMutation();
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [isOpen, setIsOpen] = useState(false);
  // const [loc, setLoc] = useState({});
  // const [logout, setLogout] = useState(false);

  // // useEffect(() => {
  // //   const checkUserData = () => {
  // //     const item = localStorage.getItem("userInfo");

  // //     if (item == "" || !item || item === "undefined") {
  // //       router.push("/login");
  // //     } else {
  // //       const details = {
  // //         token: JSON.parse(item),
  // //       };
  // //       getMe(details);
  // //     }
  // //   };

  // //   if (logout) {
  // //     localStorage.removeItem("userInfo");
  // //     setLogout(false);
  // //     router.push("/login");
  // //   }

  // //   checkUserData();
  // //   window.addEventListener("storage", checkUserData);

  // //   return () => {
  // //     window.removeEventListener("storage", checkUserData);
  // //   };
  // // }, [logout]);

  // useEffect(() => {
  //   const item = localStorage.getItem("userInfo");

  //   if (item == "" || !item || item === "undefined") {
  //     router.push("/login");
  //   } else {
  //     const details = {
  //       token: JSON.parse(item),
  //     };
  //     getMe(details);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (
  //     localStorage.getItem("userInfo") == null ||
  //     localStorage.getItem("userInfo") == "" ||
  //     !localStorage.getItem("userInfo") ||
  //     localStorage.getItem("userInfo") === "undefined"
  //   )
  //     router.push("/login");
  //   else {
  //     const local = JSON.parse(localStorage.getItem("userInfo"));
  //     const details = {
  //       token: local,
  //     };
  //     getMe(details);
  //   }
  // }, [localStorage.getItem("userInfo")]);

  // useEffect(() => {
  //   console.log(me);
  //   if (me) setIsLoggedIn(true);
  // }, [me]);

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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <div
                        onClick={() => {
                          localStorage.removeItem("userInfo");
                          // setIsLoggedIn(false);
                          setLogout(true);
                        }}
                      >
                        Logout
                      </div>
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
