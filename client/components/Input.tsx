interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    name: string;
    label: string;
    placeholder: string;
    error?: boolean;
    errorMessage?: string;
}

const Input = ({
    id,
    name,
    label,
    placeholder,
    error = false,
    errorMessage = "",
    ...props
}: InputProps) => {

    return (
        <div className="input-div">
            <div className="label-error">
                <label htmlFor={id}>
                    {label}
                </label>
                {error && <p className="error-message">*{errorMessage}</p>}
            </div>
            <input
                {...props}
                type="text"
                id={id}
                name={name}
                placeholder={placeholder}
                className="contact-input"
            />
        </div>
    );
};
export default Input;