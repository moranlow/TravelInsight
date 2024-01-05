//@ts-nocheck

"use client";

import qs from "query-string";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import useSearchModal from "@/app/hooks/useSearchModal";

import Modal from "./Modal";
import CountrySelect from "../inputs/CountrySelect";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import { ICountry } from "country-state-city";
import CategoryInput from "../inputs/CategoryInput";
import Counter from "../inputs/Counter";

enum STEPS {
	COUNTRY = 0,
	CATEGORY = 1,
	PRICE = 2,
}

const SearchModal = () => {
	const router = useRouter();
	const searchModal = useSearchModal();
	const params = useSearchParams();

	const [step, setStep] = useState(STEPS.COUNTRY);

	const [country, setCountry] = useState<ICountry>();
	const [category, setCategory] = useState("");
	const [price, setPrice] = useState(10);

	const Map = useMemo(
		() =>
			dynamic(() => import("../Map"), {
				ssr: false,
			}),
		[country]
	);

	const onBack = useCallback(() => {
		setStep((value) => value - 1);
	}, []);

	const onNext = useCallback(() => {
		setStep((value) => value + 1);
	}, []);

	const onSubmit = useCallback(async () => {
		if (step !== STEPS.PRICE) {
			return onNext();
		}

		let currentQuery = {};

		if (params) {
			currentQuery = qs.parse(params.toString());
		}

		const updatedQuery: any = {
			...currentQuery,
			country,
			category,
			price,
		};

		const url = qs.stringifyUrl(
			{
				url: "/",
				query: updatedQuery,
			},
			{ skipNull: true }
		);

		setStep(STEPS.COUNTRY);
		searchModal.onClose();
		router.push(url);
	}, [step, searchModal, country, router, category, price, onNext, params]);

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return "Search";
		}

		return "Next";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.COUNTRY) {
			return undefined;
		}

		return "Back";
	}, [step]);

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Where do you wanna go?"
				subtitle="Find the perfect location!"
			/>
			<CountrySelect
				value={country}
				onChange={(value) => setCountry(value)}
			/>
			<hr />
			<Map center={country} />
		</div>
	);

	if (step === STEPS.CATEGORY) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Which of these best describes your place?"
					subtitle="Pick a category"
				/>
				<div
					className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
				>
					{categories.map((item) => (
						<div
							key={item.label}
							className="col-span-1"
						>
							<CategoryInput
								onClick={(category) => setCategory(category)}
								selected={category === item.label}
								label={item.label}
								icon={item.icon}
							/>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (step === STEPS.PRICE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="More information"
					subtitle="Find your perfect place!"
				/>
				<Counter
					onChange={(value) => setPrice(value)}
					value={price}
					title="Guests"
					subtitle="How many guests are coming?"
				/>
			</div>
		);
	}

	return (
		<Modal
			isOpen={searchModal.isOpen}
			title="Filters"
			actionLabel={actionLabel}
			onSubmit={onSubmit}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.COUNTRY ? undefined : onBack}
			onClose={searchModal.onClose}
			body={bodyContent}
		/>
	);
};

export default SearchModal;
