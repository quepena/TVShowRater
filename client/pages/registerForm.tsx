import { MutationDefinition } from "@reduxjs/toolkit/dist/query";
import axios from "axios";
import router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Input from "../components/Input";
import { validate } from "../components/Validation";
import { useRegisterMutation } from "../store/slices/apiSlice";
import { User } from "../types/user";

interface IErrors extends Partial<User> { }

const registerForm = () => {
  const [values, setValues] = useState({
    password: "",
    email: "",
    name: "",
    last_name: "",
    photo: "",
    isAdmin: false,
  });

  const [errors, setErrors] = useState<IErrors>({});
  const [messageState, setMessageState] = useState("");

  const [registerUser, { isLoading, isSuccess, error, isError, data }] = useRegisterMutation();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(values);
    if (errors && Object.keys(errors).length > 0) {
      setMessageState("")
      return setErrors(errors);
    }
    setErrors({});

    const details = {
      password: values.password,
      email: values.email,
      name: values.name,
      last_name: values.last_name,
      photo: "",
      isAdmin: false,
    }
    console.log(details);

    registerUser(details);
    console.log(isLoading, isSuccess, error, isError);
  };
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValues((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("token sucessfully generated");
      if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data['token' as keyof Object]));
      }

      router.push('/')
    } else if (error) {
      console.log(error['data' as keyof Object]['message' as keyof Object]);

      const message: string = JSON.stringify(error['data' as keyof Object]['message' as keyof Object]).replace(/['"]+/g, '')

      setValues({ password: "", email: "", name: "", last_name: "", photo: "", isAdmin: false });
      setMessageState("")
      setMessageState(message)
    }
  }, [isLoading])


  return (
    <div className="flex items-center justify-center flex-col">
      <div className="text-2xl font-bold my-6">SIGN UP</div>
      <form className="flex items-center justify-center flex-col" onSubmit={handleSubmit}>
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
          value={values.name}
          onChange={handleChange}
          id="name"
          name="name"
          label="Name"
          placeholder="John"
          type="text"
          error={!!errors.name}
          errorMessage={!!errors.name ? errors.name : ""}
        />
        <Input
          value={values.last_name}
          onChange={handleChange}
          id="last_name"
          name="last_name"
          label="Last Name"
          placeholder="Doe"
          type="text"
          error={!!errors.last_name}
          errorMessage={!!errors.last_name ? errors.last_name : ""}
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
          className="w-96 bg-sky-400 py-3 mt-3 text-lg rounded-md hover:bg-sky-500 hover:text-white"
        >
          Register
        </button>
        <p className="text-red-500 mt-3">
          {isError ? (
            messageState
          ) : (
            <span>{messageState}</span>
          )}
        </p>
      </form>
    </div>
  );
};

export default registerForm;