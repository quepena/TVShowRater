import router from "next/router";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../store/slices/apiSlice";
import { User } from "../types/user";
import { validate } from "src/components/Validation";
import { Input } from "src/components/input";

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validate(values);
        if (errors && Object.keys(errors).length > 0) {
            setMessageState("");
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
            isOnboarded: false,
        };

        registerUser(details);
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
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(data["token" as keyof Object])
                );
            }

            router.push("/");
        } else if (error) {
            const message: string = JSON.stringify(
                error["data" as keyof Object]["message" as keyof Object]
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

    return (
        <div className="flex items-center justify-center flex-col">
            <div className="text-2xl font-bold my-6">SIGN UP</div>
            <form
                className="flex items-center justify-center flex-col"
                onSubmit={handleSubmit}
            >
                <Input
                    value={values.email}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    type="email"
                />
                <Input
                    value={values.name}
                    onChange={handleChange}
                    id="name"
                    name="name"
                    placeholder="John"
                    type="text"
                />
                <Input
                    value={values.last_name}
                    onChange={handleChange}
                    id="last_name"
                    name="last_name"
                    placeholder="Doe"
                    type="text"
                />
                <Input
                    value={values.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    placeholder="yourpassword"
                    type="password"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-96 bg-sky-400 py-3 mt-3 text-lg rounded-md hover:bg-sky-500 hover:text-white"
                >
                    Register
                </button>
                <p className="text-red-500 mt-3">
                    {isError ? messageState : <span>{messageState}</span>}
                </p>
            </form>
        </div>
    );
};

export default registerForm;
