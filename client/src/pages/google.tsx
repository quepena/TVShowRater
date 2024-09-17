import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { MutationDefinition } from "@reduxjs/toolkit/dist/query";
import axios from "axios";
import router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Input from "../../components/Input";
import { validate } from "../../components/Validation";
import { useGoogleMutation, useLoginMutation } from "../store/slices/apiSlice";
import { Auth } from "../types/auth";

interface IErrors extends Partial<Auth> { }

const loginForm = () => {
    const [values, setValues] = useState({
        password: "",
        email: "",
    });

    const [errors, setErrors] = useState<IErrors>({});
    const [messageState, setMessageState] = useState("");

    const [loginGoogle, { isLoading, isSuccess, error, isError, data }] = useGoogleMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validate(values);
        if (errors && Object.keys(errors).length > 0) {
            setMessageState("")
            return setErrors(errors);
        }
        setErrors({});
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
            if (data) {
                localStorage.setItem('userInfo', JSON.stringify(data['token' as keyof Object]));
            }

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
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        const details = {
                            token: credentialResponse.credential
                        }
                        loginGoogle(details)
                    }}
                />
            </GoogleOAuthProvider>
        </div>
    );
};

export default loginForm;