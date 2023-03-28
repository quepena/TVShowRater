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
        <div className="mb-5">
            <div className="mb-3 flex flex-row">
                <label htmlFor={id} className="text-lg mr-3">
                    {label}
                </label>
                {error && <p className="text-sm pt-1 text-red-600">*{errorMessage}</p>}
            </div>
            <input
                {...props}
                type="text"
                id={id}
                name={name}
                placeholder={placeholder}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-96"
            />
        </div>
    );
};
export default Input;