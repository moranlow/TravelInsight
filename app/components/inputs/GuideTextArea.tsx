"use client";

import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
	placeholder: string;
	disabled?: boolean;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	index: number;
}

const TextArea: React.FC<TextAreaProps> = ({
	placeholder,
	disabled,
	required,
	register,
	errors,
	index,
}) => {
	return (
		<textarea
			placeholder={placeholder}
			disabled={disabled}
			required={required}
			{...register(`tourGuide[${index}].tourPartDescription`, { required })}
			className={`peer w-full p-2 pt-4 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
                ${
									errors[`tourGuide[${index}]`]
										? "border-rose-500"
										: "border-neutral-300"
								}
                ${
									errors[`tourGuide[${index}]`]
										? "focus:border-rose-500"
										: "focus:border-black"
								}
                `}
		></textarea>
	);
};

export default TextArea;
