"use client";
import Button from "@/components/Button";
import HeaderTwo from "@/components/Layout/Text/HeaderTwo";
import { BaseClass, baseClass } from "@/constants/enums";
import { useBuildStore } from "@/store/buildStore";
import { basename } from "node:path/win32";

function CreateBuildsPage() {
	const {
		step,
		buildName,
		buildDescription,
		baseClassSelection,
		ascendancyClassSelection,
		setStep,
		setBuildName,
		setBuildDescription,
		setBaseClass,
		setAscendancyClass,
	} = useBuildStore();

	const handleBuildName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBuildName(e.target.value);
	};

	const handleBuildDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBuildDescription(e.target.value);
	};

	const handleNextStep = (step: 2 | 3 | 4) => setStep(step);

	const renderStep = () => {
		switch (step) {
			case 1: {
				return (
					<>
						<HeaderTwo>STEP I - Choose a build name.</HeaderTwo>
						<div className="mt-5">
							Something as simple as{" "}
							<span className="text-customSecondary">
								&quot;Cyclone Warrior&quot;
							</span>{" "}
							or{" "}
							<span className="text-customSecondary">
								&quot;Boss Farmer&quot;
							</span>{" "}
							would do. Be creative!
							<div className="flex h-[400px] justify-center items-center">
								<input
									className="w-[280px] bg-transparent text-center text-customHeaderTwo text-2xl border-b border-customSecondary pb-1"
									placeholder="Name Your Build"
									onChange={handleBuildName}
								/>
							</div>
							<div className="flex justify-center">
								{buildName.length >= 6 && (
									<Button
										onClick={() => handleNextStep(2)}
										width={200}
										text="NEXT"
									/>
								)}
								{buildName.length > 0 && buildName.length < 6 && (
									<span className="text-customSecondary">
										Build name needs to be at least 6 characters long.
									</span>
								)}
							</div>
						</div>
					</>
				);
			}
			case 2: {
				return (
					<>
						<HeaderTwo>Step II - Class and Description </HeaderTwo>
						<div className="mt-6">
							Describe what your amazing build does in a short sentence.
						</div>

						<div className="justify-center mt-6">
							<input
								className="w-full bg-transparent text-center text-customHeaderTwo text-2xl border-b border-customSecondary pb-1 mb-3"
								placeholder="Build Description"
								onChange={handleBuildDescription}
							/>

							{buildDescription.length > 0 && buildDescription.length < 30 && (
								<span className="text-customSecondary">
									Build description needs to be at least 30 characters long.
								</span>
							)}
						</div>

						<div className="mt-6 text-center">
							Which <span className="text-customSecondary"> Class </span> is
							your Build for?
						</div>

						<div className="flex gap-4 mt-6">
							{[
								baseClass?.WARRIOR,
								baseClass?.SORCEROR,
								baseClass?.WITCH,
								baseClass?.MONK,
								baseClass?.MERCENARY,
								baseClass?.RANGER,
							].map((currentClass: BaseClass, index) => (
								<div
									key={currentClass + index}
									className={
										"duration-200 ease-in hover:text-customSecondary cursor-pointer" +
										(baseClassSelection === currentClass
											? " text-customSecondary"
											: "")
									}
									onClick={() => setBaseClass(currentClass)}
								>
									{currentClass}
								</div>
							))}
						</div>

						<div className="flex h-[300px] justify-center items-center"></div>

						<div className="flex justify-center">
							{buildName.length >= 6 && (
								<Button
									onClick={() => handleNextStep(3)}
									width={200}
									text="NEXT"
								/>
							)}
						</div>
					</>
				);
			}
		}
	};

	console.log("step:", step);
	console.log("buildName:", buildName);
	console.log("buildDescription:", buildDescription);
	console.log("baseClassSelection:", baseClassSelection);

	return (
		<div>
			<div className="mb-5">
				Create an entire build from scratch and join the community of awesome
				builds!
			</div>
			<div className="flex justify-center">
				<div className="flex flex-col items-center">
					{/* Render Current Build Create Step UI */}
					<div>{renderStep()}</div>
				</div>
			</div>
		</div>
	);
}

export default CreateBuildsPage;
