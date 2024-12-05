import { AscendancyClass, BaseClass } from "@/constants/enums";
import { create } from "zustand";

type BuildState = {
	step: number;
	buildName: string;
	buildDescription: string;
	baseClassSelection: BaseClass | null;
	ascendancyClassSelection: AscendancyClass | null;

	setStep: (step: number) => void;
	setBuildName: (name: string) => void;
	setBuildDescription: (description: string) => void;
	setBaseClass: (classSelection: BaseClass) => void;
	setAscendancyClass: (ascendancySelection: AscendancyClass) => void;
};

export const useBuildStore = create<BuildState>((set) => ({
	// state
	step: 1,
	buildName: "",
	buildDescription: "",
	baseClassSelection: null,
	ascendancyClassSelection: null,

	// methods
	setStep: (step) => set({ step }),
	setBuildName: (name) => set({ buildName: name }),
	setBuildDescription: (description) => set({ buildDescription: description }),
	setBaseClass: (baseClassSelection) => set({ baseClassSelection }),
	setAscendancyClass: (ascendancyClassSelection) =>
		set({ ascendancyClassSelection }),
}));
