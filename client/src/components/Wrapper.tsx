import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGetMeMutation } from "@/store/slices/apiSlice";
import Nav from "./Nav";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  const router = useRouter();
  const [getMe, { data: me, isSuccess }] = useGetMeMutation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [logout, setLogout] = useState(false);

  const checkUserData = async () => {
    const item = localStorage.getItem("userInfo");

    if (!item || item === "undefined" || item === "") {
      router.push("/login");
    } else {
      const details = {
        token: JSON.parse(item),
      };
      try {
        await getMe(details).unwrap();
        // setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    checkUserData();
  }, []);

  console.log(logout);
  useEffect(() => {
    if (logout) {
      localStorage.removeItem("userInfo");
      setIsLoggedIn(false);
      setLogout(false);
      router.push("/login");
    }
  }, [logout]);

  //   console.log(logout);

  //   if (logout) {
  //     localStorage.removeItem("userInfo");
  //     setIsLoggedIn(false);
  //     setLogout(false);
  //     router.push("/login");
  //   }
  //   checkUserData();
  // }, [logout]);

  console.log(me);

  //   useEffect(() => {
  //     // if (isSuccess) {
  //       setIsLoggedIn(true);
  //     // } else {
  //     //   setIsLoggedIn(false);
  //     // }
  //   }, []);

  // useEffect(() => {
  //   const item = localStorage.getItem("userInfo");

  //   if (!item || item === "undefined" || item === "") {
  //     router.push("/login");
  //     router.reload();
  //   } else {
  //     const details = {
  //       token: JSON.parse(item),
  //     };
  //     getMe(details);
  //   }
  // }, []);

  return (
    <div className="w-full bg-white">
      <Nav me={me} setLogout={setLogout} isLoggedIn={isLoggedIn} />
      <div className="mx-auto my-0 max-w-7xl text-center">{children}</div>
    </div>
  );
};

export default Wrapper;
