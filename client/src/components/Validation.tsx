export const validate = ({
    password,
    email,
    name,
    last_name,
}: {
    password: string;
    email: string;
    name?: string,
    last_name?: string,
}) => {
    const errors: { password?: string; email?: string; name?: string, last_name?: string } = {};
    if (!password || password.trim() === "") {
        errors.password = "Password is required";
    }
    if (!email || email.trim() === "") {
        errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = "Invalid email address";
    }
    if (!name || name.trim() === "") {
        errors.name = "Name is required";
    }
    if (!last_name || last_name.trim() === "") {
        errors.last_name = "Last name is required";
    }
    return errors;
};