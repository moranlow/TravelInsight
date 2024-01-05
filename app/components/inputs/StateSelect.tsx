"use client";

import useLocation from "@/app/hooks/useLocation";
import Select from "react-select";
import { IState } from "country-state-city";

interface StateSelectProps {
	value?: IState;
	onChange: (value: IState) => void;
	country: any;
}

const StateSelect: React.FC<StateSelectProps> = ({
	value,
	onChange,
	country,
}) => {
	const { getState } = useLocation();

	return (
		<div>
			<Select
				placeholder="Choose your state"
				isClearable
				options={getState(country)}
				value={value}
				onChange={(value) => onChange(value as IState)}
				formatOptionLabel={(option: any) => (
					<div className="flex flex-row items-center gap-3">
						<div>{option.countryCode}</div>
						<div>{option.name}</div>
					</div>
				)}
				classNames={{
					control: () => "p-3 border-2",
					input: () => "text-lg",
					option: () => "text-lg",
				}}
				theme={(theme) => ({
					...theme,
					borderRadius: 6,
					colors: {
						...theme.colors,
						primary: "black",
						primary25: "#ffe4e6",
					},
				})}
			/>
		</div>
	);
};

export default StateSelect;
