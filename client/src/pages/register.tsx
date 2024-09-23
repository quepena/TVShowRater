import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const Register = () => {
  return (
    <>
      <Card className="mx-auto h-80 w-11/12 md:max-w-lg">
        <CardHeader className="text-lg font-semibold">SIGN UP</CardHeader>
        <CardContent>
          <Link href="/google">
            <Button className="my-3 w-full p-3">Continue with Google</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="my-3 w-full p-3">Sign up with E-mail</Button>
          </Link>
        </CardContent>
        <CardFooter className="justify-end text-right">
          <Link href="/login">
            Already have an account? <Button variant="ghost">Sign in</Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default Register;
