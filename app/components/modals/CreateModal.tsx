"use client";

import useCreateModal from "@/app/hooks/useCreateModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import {
	FieldValues,
	SubmitHandler,
	useFieldArray,
	useForm,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import CountrySelect from "../inputs/CountrySelect";
import CitySelect from "../inputs/CitySelect";
import StateSelect from "../inputs/StateSelect";
import dynamic from "next/dynamic";
import Input from "../inputs/Input";
import ImageUpload from "../inputs/ImageUpload";
import TextArea from "../inputs/TextArea";
import axios from "axios";
import toast from "react-hot-toast";
import GuideInput from "../inputs/GuideInput";
import GuideTextArea from "../inputs/GuideTextArea";

enum STEPS {
	LOCATION_PART = 1,
	CATEGORY_PART = 2,
	MAIN_PART = 3,
	EXPIERENCE_PART = 4,
	TOUR_PART = 5,
}

const CreateModal = () => {
	const router = useRouter();
	const createModal = useCreateModal();
	const [step, setStep] = useState(STEPS.LOCATION_PART);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		control,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			country: "",
			state: "",
			city: "",
			title: "",
			imageSrc: "",
			description: "",
			price: 1,
			highlights: "",
			startPoint: "",
			information: "",
			category: "",
			tourGuide: [{ tourPartTitle: "", tourPartDescription: "" }],
		},
	});
	const { fields, append, remove } = useFieldArray({
		name: "tourGuide",
		control,
	});

	const country = watch("country");
	const city = watch("city");
	const state = watch("state");
	const imageSrc = watch("imageSrc");
	const category = watch("category");

	const Map = useMemo(
		() =>
			dynamic(() => import("../Map"), {
				ssr: false,
			}),
		[country]
	);

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};

	const onBack = () => setStep((value) => value - 1);
	const onNext = () => setStep((value) => value + 1);

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (step !== STEPS.TOUR_PART) return onNext();
		setIsLoading(true);

		axios
			.post("/api/listings", data)
			.then(() => {
				toast.success("Tour Created!");
				router.refresh();
				reset();
				setStep(STEPS.LOCATION_PART);
				createModal.onClose();
			})
			.catch(() => {
				toast.error("Something went wrong!");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.TOUR_PART) return "Create";
		return "Next";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.LOCATION_PART) return undefined;
		return "Back";
	}, [step]);

	let bodyContent = (
		<div>
			<div>
				<Heading title="Choose the country!" />
				<CountrySelect
					value={country}
					onChange={(value) => setCustomValue("country", value)}
				/>
			</div>
			<div className="mt-5">
				<Heading title="Choose the State!" />
				<StateSelect
					value={state}
					onChange={(value) => setCustomValue("state", value)}
					country={country}
				/>
			</div>
			<div className="mt-5 mb-5">
				<Heading title="Choose the City!" />
				<CitySelect
					value={city}
					onChange={(value) => setCustomValue("city", value)}
					country={country}
					state={state}
				/>
			</div>
			<Map center={city} />
		</div>
	);

	if (step === STEPS.CATEGORY_PART) {
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
								onClick={(category) => setCustomValue("category", category)}
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

	if (step === STEPS.MAIN_PART) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading title="Share some basics about your tour" />
				<Input
					id="title"
					label="Title"
					register={register}
					errors={errors}
					disabled={isLoading}
					required
				/>
				<ImageUpload
					value={imageSrc}
					onChange={(value) => setCustomValue("imageSrc", value)}
				/>
				<Input
					id="description"
					label="Description"
					register={register}
					errors={errors}
					disabled={isLoading}
					required
				/>
				<Input
					id="price"
					label="Price"
					formatPrice
					type="number"
					register={register}
					errors={errors}
					disabled={isLoading}
					required
				/>
			</div>
		);
	}

	if (step === STEPS.EXPIERENCE_PART) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading title="Share some basics about your tour" />
				<div>
					<Heading title="Expierence" />
					<TextArea
						id="highlights"
						placeholder="Highlights"
						register={register}
						errors={errors}
						required
					/>
				</div>
				<div>
					<Heading title="Start Point" />
					<Input
						id="startPoint"
						label="Start Point"
						register={register}
						errors={errors}
						disabled={isLoading}
						required
					/>
				</div>
				<div>
					<Heading title="Important Information" />
					<TextArea
						id="information"
						placeholder="Important information"
						register={register}
						errors={errors}
						disabled={isLoading}
						required
					/>
				</div>
			</div>
		);
	}

	if (step === STEPS.TOUR_PART) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Share the tour guide!"
					subtitle="Keep it simple"
				/>
				<div className="grid grid-cols-1 md:grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto">
					{fields.map((field, index) => {
						return (
							<div
								className="col-span-1"
								key={field.id}
							>
								<GuideInput
									register={register}
									index={index}
									label="Title"
									type="text"
									errors={errors}
									disabled={isLoading}
									required
								/>
								<GuideTextArea
									placeholder="Write your description"
									register={register}
									index={index}
									errors={errors}
									disabled={isLoading}
									required
								/>
								{index > 0 && (
									<button
										type="button"
										onClick={() => remove(index)}
										className="p-1 bg-white border-2 rounded-md outline-none border-neutral-300 hover:border-neutral-400 transition"
									>
										Remove
									</button>
								)}
							</div>
						);
					})}
				</div>
				<button
					type="button"
					className="p-4 bg-white border-2 rounded-md outline-none border-neutral-300 hover:border-neutral-400 transition"
					onClick={() => append({ tourPartTitle: "", tourPartDescription: "" })}
				>
					add
				</button>
			</div>
		);
	}

	return (
		<Modal
			isOpen={createModal.isOpen}
			onClose={createModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.LOCATION_PART ? undefined : onBack}
			title="Open new vision for travelling"
			body={bodyContent}
		/>
	);
};

export default CreateModal;
