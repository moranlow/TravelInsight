import { Country, City, State, ICountry, IState } from "country-state-city";

const CountriesList = Country.getAllCountries().map((country) => ({
	label: country.name,
	lat: country.latitude,
	lng: country.longitude,
	...country,
}));

const useLocation = () => {
	const getCountries = () => CountriesList;

	const getState = (value: ICountry) => {
		if (value)
			return State.getStatesOfCountry(value.isoCode).map((state) => ({
				label: state.name,
				...state,
			}));
	};

	const getCities = (country: ICountry, state: IState) => {
		if (country && state)
			return City.getCitiesOfState(country.isoCode, state.isoCode).map(
				(city) => ({
					label: city.name,
					lat: city.latitude,
					lng: city.longitude,
					...city,
				})
			);
	};

	const getCoordinatesByValue = (value: string) => {
		const city = City.getAllCities().find((item) => item.name === value);
		return [city?.latitude, city?.longitude];
	};

	return { getCountries, getCities, getState, getCoordinatesByValue };
};

export default useLocation;
