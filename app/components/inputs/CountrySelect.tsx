"use client";

import useLocation from "@/app/hooks/useLocation";
import Select from "react-select";
import { ICountry } from "country-state-city";

interface CountrySelectProps {
	value?: ICountry;
	onChange: (value: ICountry) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
	const { getCountries } = useLocation();
	return (
		<div>
			<Select
				placeholder="Choose your country"
				isClearable
				options={getCountries()}
				value={value}
				onChange={(value) => onChange(value as ICountry)}
				formatOptionLabel={(option: any) => (
					<div className="flex flex-row items-center gap-3">
						<div>{option.flag}</div>
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

export default CountrySelect;
