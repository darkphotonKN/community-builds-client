import { AscendancyClass, BaseClass, Tag } from "@/constants/enums";
import { getAscendancyChoice } from "@/lib/utils/class";
import { create } from "zustand";

type BuildState = {
  step: number;
  buildName: string;
  buildDescription: string;
  baseClassSelection: BaseClass | null;
  ascendancyClassSelection: AscendancyClass | null;
  tagSelection: Tag | null;

  setStep: (step: number) => void;
  setBuildName: (name: string) => void;
  setBuildDescription: (description: string) => void;
  setBaseClass: (classSelection: BaseClass) => void;
  setAscendancyClass: (ascendancySelection: AscendancyClass) => void;
  setTag: (tagSelection: Tag) => void;
};

export const useBuildStore = create<BuildState>((set) => ({
  // state
  step: 1,
  buildName: "",
  buildDescription: "",
  baseClassSelection: null,
  ascendancyClassSelection: null,
  tagSelection: null,

  // methods
  setStep: (step) => set({ step }),
  setBuildName: (name) => set({ buildName: name }),
  setBuildDescription: (description) => set({ buildDescription: description }),
  setBaseClass: (baseClassSelection) => {
    set({ baseClassSelection });

    // also update ascendancy list
    const ascendancies = getAscendancyChoice(baseClassSelection);

    if (!ascendancies) return;

    set({ ascendancyClassSelection: ascendancies[0] });
  },
  setAscendancyClass: (ascendancyClassSelection) =>
    set({ ascendancyClassSelection }),
  setTag: (tagSelection) => set({ tagSelection }),
}));
