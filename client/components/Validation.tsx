export const validate = ({
    password,
    email,
}: {
    password: string;
    email: string;
}) => {
    const errors: { password?: string; email?: string; } = {};
    if (!password || password.trim() === "") {
        errors.password = "Password is required";
    }
    if (!email || email.trim() === "") {
        errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = "Invalid email address";
    }
    return errors;
};