"use client";

import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
	id: string;
	placeholder: string;
	disabled?: boolean;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const TextArea: React.FC<TextAreaProps> = ({
	id,
	placeholder,
	disabled,
	required,
	register,
	errors,
}) => {
	return (
		<textarea
			id={id}
			placeholder={placeholder}
			disabled={disabled}
			required={required}
			{...register(id, { required })}
			className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
                ${errors[id] ? "border-rose-500" : "border-neutral-300"}
                ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
                `}
		></textarea>
	);
};

export default TextArea;
