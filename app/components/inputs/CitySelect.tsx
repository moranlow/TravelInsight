"use client";

import useLocation from "@/app/hooks/useLocation";
import Select from "react-select";
import { ICity, ICountry, IState } from "country-state-city";

interface CitySelectProps {
	value?: ICity;
	onChange: (value: ICity) => void;
	country: ICountry;
	state: IState;
}

const CitySelect: React.FC<CitySelectProps> = ({
	value,
	onChange,
	country,
	state,
}) => {
	const { getCities } = useLocation();
	return (
		<div>
			<Select
				placeholder="Choose your country"
				isClearable
				options={getCities(country, state)}
				value={value}
				onChange={(value) => onChange(value as ICity)}
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

export default CitySelect;
