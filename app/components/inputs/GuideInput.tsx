"use client";

import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";

interface InputProps {
	label: string;
	type?: string;
	index?: number;
	disabled?: boolean;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
	label,
	type,
	disabled,
	required,
	register,
	errors,
	index,
}) => {
	return (
		<div className="w-full relative mb-5">
			<input
				disabled={disabled}
				type={type}
				{...register(`tourGuide[${index}].tourPartTitle`, { required })}
				placeholder=" "
				className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
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
			/>
			<label
				className={`absolute text-md duration-150 transform -translate-y-3 top-5 left-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
                ${
									errors[`tourGuide[${index}]`]
										? "text-rose-500"
										: "text-zinc-400"
								}`}
			>
				{label}
			</label>
		</div>
	);
};

export default Input;
