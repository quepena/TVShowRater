import router from "next/router";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../store/slices/apiSlice";
import { User } from "../types/user";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface IErrors extends Partial<User> {}

const registerForm = () => {
  const [values, setValues] = useState({
    password: "",
    email: "",
    name: "",
    last_name: "",
    photo: "",
    isAdmin: false,
    isOnboarded: false,
  });

  const [errors, setErrors] = useState<IErrors>({});
  const [messageState, setMessageState] = useState("");

  const [registerUser, { isLoading, isSuccess, error, isError, data }] =
    useRegisterMutation();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // const errors = validate(values);
    // if (errors && Object.keys(errors).length > 0) {
    //     setMessageState("");
    //     return setErrors(errors);
    // }
    // setErrors({});

    const details = {
      password: values.password,
      email: values.email,
      name: values.name,
      last_name: values.last_name,
      photo: "",
      isAdmin: false,
      isOnboarded: false,
    };

    registerUser(details);
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
      console.log(data);

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data["token" as keyof Object]),
      );

      router.push("/");
    } else if (error) {
      const message: string = JSON.stringify(
        error["data" as keyof Object]["message" as keyof Object],
      ).replace(/['"]+/g, "");

      setValues({
        password: "",
        email: "",
        name: "",
        last_name: "",
        photo: "",
        isAdmin: false,
        isOnboarded: false,
      });
      setMessageState("");
      setMessageState(message);
    }
  }, [isLoading]);

  const formSchema = z.object({
    email: z.string().email({
      message: "Email must be valid.",
    }),
    password: z.string().min(4, {
      message: "Password must be at least 4 symbols",
    }),
    name: z.string().min(3, {
      message: "Name must be at least 3 symbols",
    }),
    last_name: z.string().min(3, {
      message: "Lat name must be at least 3 symbols",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      last_name: "",
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
        <div className="ml-4 text-center">SIGN UP</div>
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
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
      </CardContent>
    </Card>
    // <div className="flex items-center justify-center flex-col">
    //     <div className="text-2xl font-bold my-6">SIGN UP</div>
    //     <form
    //         className="flex items-center justify-center flex-col"
    //         onSubmit={handleSubmit}
    //     >
    //         <Input
    //             value={values.email}
    //             onChange={handleChange}
    //             id="email"
    //             name="email"
    //             placeholder="you@example.com"
    //             type="email"
    //         />
    //         <Input
    //             value={values.name}
    //             onChange={handleChange}
    //             id="name"
    //             name="name"
    //             placeholder="John"
    //             type="text"
    //         />
    //         <Input
    //             value={values.last_name}
    //             onChange={handleChange}
    //             id="last_name"
    //             name="last_name"
    //             placeholder="Doe"
    //             type="text"
    //         />
    //         <Input
    //             value={values.password}
    //             onChange={handleChange}
    //             id="password"
    //             name="password"
    //             placeholder="yourpassword"
    //             type="password"
    //         />
    //         <button
    //             type="submit"
    //             disabled={isLoading}
    //             className="w-96 bg-sky-400 py-3 mt-3 text-lg rounded-md hover:bg-sky-500 hover:text-white"
    //         >
    //             Register
    //         </button>
    //         <p className="text-red-500 mt-3">
    //             {isError ? messageState : <span>{messageState}</span>}
    //         </p>
    //     </form>
    // </div>
  );
};

export default registerForm;
