import { AscendancyClass, BaseClass, Tag } from "@/constants/enums";
import { getRequest } from "@/lib/api/requestHelpers";
import { getAscendancyChoice } from "@/lib/utils/class";
import { create } from "zustand";

type BuildState = {
  step: number;
  buildName: string;
  buildDescription: string;
  baseClassSelection: BaseClass | null;
  ascendancyClassSelection: ClassAscendancy | null;
  tagSelection: Tag | null;
  classes: ClassAscendancy[];
  ascendancies: ClassAscendancy[];

  setStep: (step: number) => void;
  setBuildName: (name: string) => void;
  setBuildDescription: (description: string) => void;
  setBaseClass: (classSelection: BaseClass) => void;
  setAscendancyClass: (ascendancySelection: ClassAscendancy) => void;
  setTag: (tagSelection: Tag) => void;
  initializeClassAndAscendancies: () => void;
};

type ClassAscendancy = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  imageUrl: string;
};

type ClassAndAscendanciesResponse = {
  classes: ClassAscendancy[];
  ascendancies: ClassAscendancy[];
};

export const useBuildStore = create<BuildState>((set) => ({
  // state
  step: 1,
  buildName: "",
  buildDescription: "",
  classes: [],
  baseClassSelection: null,
  ascendancies: [],
  ascendancyClassSelection: null,
  tagSelection: null,

  // methods

  // initializes classes via api request from the server
  initializeClassAndAscendancies: async () => {
    const data = await getRequest<ClassAndAscendanciesResponse>("/class");

    set({
      ascendancies: data?.result.ascendancies,
    });

    set({
      classes: data?.result.classes,
    });
  },

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
