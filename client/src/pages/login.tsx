import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <>
      <Card className="mx-auto h-80 w-11/12 md:max-w-lg">
        <CardHeader className="text-lg font-semibold">SIGN IN</CardHeader>
        <CardContent className="flex w-full flex-col">
          <Link href="/google">
            <Button className="my-3 w-full p-3">Continue with Google</Button>
          </Link>
          <Link href="/sign-in">
            <Button className="my-3 w-full p-3">Sign in with E-mail</Button>
          </Link>
        </CardContent>
        <CardFooter className="justify-end text-right">
          <Link href="/register">
            Don't have an account? <Button variant="ghost">Sign up</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default Login;
