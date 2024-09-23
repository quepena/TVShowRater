import router from "next/router";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../store/slices/apiSlice";
import { Auth } from "../types/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface IErrors extends Partial<Auth> {}

const loginForm = () => {
  const [values, setValues] = useState({
    password: "",
    email: "",
  });

  // const [errors, setErrors] = useState<IErrors>({});
  // const [messageState, setMessageState] = useState("");

  const [loginUser, { isLoading, isSuccess, error, isError, data }] =
    useLoginMutation();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // const errors = validate(values);
    // if (errors && Object.keys(errors).length > 0) {
    //   setMessageState("");
    //   return setErrors(errors);
    // }
    // setErrors({});

    const details = {
      password: values.password,
      email: values.email,
    };

    console.log(details);

    loginUser(details);
  };
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setValues((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem(
        "userInfo",
        JSON.stringify(data["token" as keyof Object]),
      );

      router.push("/");
    } else if (error) {
      const message: string = JSON.stringify(
        error["data" as keyof Object]["message" as keyof Object],
      ).replace(/['"]+/g, "");

      setValues({ password: "", email: "" });
      // setMessageState("");
      // setMessageState(message);
    }
  }, [isLoading]);

  const formSchema = z.object({
    email: z.string().email({
      message: "Email must be valid.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 symbols",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Card className="h-100 mx-auto w-11/12 md:max-w-lg">
      <CardHeader className="flex w-full flex-row items-center text-lg font-semibold">
        <Button
          variant="ghost"
          className="h-8 w-8 text-3xl"
          onClick={() => router.back()}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <div className="ml-4 text-center">SIGN IN</div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full space-y-4 text-left"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="justify-end text-right">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
        {/* <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <Input
          value={values.email}
          onChange={handleChange}
          id="email"
          name="email"
          label="E-mail"
          placeholder="you@example.com"
          type="email"
          error={!!errors.email}
          errorMessage={!!errors.email ? errors.email : ""}
        />
        <Input
          value={values.password}
          onChange={handleChange}
          id="password"
          name="password"
          label="Password"
          placeholder="yourpassword"
          type="password"
          error={!!errors.password}
          errorMessage={!!errors.password ? errors.password : ""}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="mt-3 w-96 rounded-md bg-sky-400 py-3 text-lg hover:bg-sky-500 hover:text-white"
        >
          Login
        </button>
        <p>{isError ? messageState : <span>{messageState}</span>}</p>
      </form> */}
      </CardContent>
    </Card>
  );
};

export default loginForm;
