import router from "next/router";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import { validate } from "../components/Validation";
import { useLoginMutation } from "../store/slices/apiSlice";
import { Auth } from "../types/auth";

interface IErrors extends Partial<Auth> { }

const loginForm = () => {
  const [values, setValues] = useState({
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState<IErrors>({});
  const [messageState, setMessageState] = useState("");

  const [loginUser, { isLoading, isSuccess, error, isError, data }] = useLoginMutation();


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
      email: values.email
    }

    loginUser(details);
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
    if (data) {
      localStorage.setItem('userInfo', JSON.stringify(data['token' as keyof Object]));

      router.push('/')
    } else if (error) {
      const message: string = JSON.stringify(error['data' as keyof Object]['message' as keyof Object]).replace(/['"]+/g, '')

      setValues({ password: "", email: "" });
      setMessageState("")
      setMessageState(message)
    }
  }, [isLoading])


  return (
    <div className="flex items-center justify-center flex-col">
      <div className="text-2xl font-bold my-6">SIGN IN</div>
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
          Login
        </button>
        <p>
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

export default loginForm;