import { MutationDefinition } from "@reduxjs/toolkit/dist/query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Input from "../components/Input";
import { validate } from "../components/Validation";
import { useLoginMutation } from "../store/slices/apiSlice";
import { Auth } from "../types/auth";

interface IErrors extends Partial<Auth> { }

const loginForm = () => {
  const [values, setValues] = useState({
    password: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<IErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageState, setMessageState] = useState("");

  const [loginUser, { isLoading, data, error }] = useLoginMutation();
  
  // useLoginQuery({password: "bla", email: "bla"})
  // const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const errors = validate(values);
    // if (errors && Object.keys(errors).length > 0) {
    //   setMessageState("")
    //   return setErrors(errors);
    // }
    // setErrors({});
    // setLoading(true);
    const details = {
      password: values.password,
      email: values.email
    }
    console.log({password: values.password, email: values.email});
    
    // const { data, error, isLoading } = useLoginQuery({password: "hey", email: "hello"})
    loginUser({password: "", email: ""});
    // dispatch(useLoginQuery({password: values.password, email: values.email}))
    // console.log(data);
    
    // if (!error) {
    //   setValues({ password: "", email: "", message: "" });
    //   setLoading(false);
    //   setSuccess(true);
    //   setMessageState(data!.message);
    // } else {
    //   setLoading(false);
    //   setMessageState(String(error))
    // }
    // setLoading(false);
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

  return (
    <form className="ml-5" onSubmit={handleSubmit}>
      <div className="inputs">
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
          error={!!errors}
          errorMessage={!!errors.password ? errors.password : ""}
        />
      </div>
      <button className="contact-btn"
        type="submit"
        disabled={loading}
      >
        Login
      </button>
      <p style={{ height: '30px', paddingTop: '2vh' }}>
        {success !== false ? (
          messageState
        ) : (
          <span>{messageState}</span>
        )}
      </p>
    </form>
  );
};

export default loginForm;