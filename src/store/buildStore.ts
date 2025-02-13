import { AscendancyClassEnum, BaseClass } from "@/constants/enums";
import { getRequest } from "@/lib/api/requestHelpers";
import { getAscendancyChoice } from "@/lib/utils/class";
import { ClassAscendancy } from "@/type/build.types";
import { create } from "zustand";

type BuildState = {
  step: number;
  buildName: string;
  buildDescription: string;
  baseClassSelection: ClassAscendancy | null;
  ascendancyClassSelection: ClassAscendancy | null;
  tagSelection: string | null;
  classes: ClassAscendancy[];
  ascendancies: ClassAscendancy[];

  setStep: (step: number) => void;
  setBuildName: (name: string) => void;
  setBuildDescription: (description: string) => void;
  setBaseClass: (classSelection: ClassAscendancy) => void;
  setAscendancyClass: (ascendancySelection: ClassAscendancy) => void;
  setTag: (tagSelection: string) => void;
  initializeClassAndAscendancies: () => void;
};

type ClassAndAscendanciesResponse = {
  classes: ClassAscendancy[];
  ascendancies: ClassAscendancy[];
};

export const useBuildStore = create<BuildState>((set, get) => ({
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

    console.log("@AscendanciesSelection response data:", data);

    const { classes, ascendancies } = data?.result || {};

    set({
      ascendancies,
    });

    set({
      classes,
    });

    // set base class as warrior

    if (!classes) return;

    const state = get();
    state.setBaseClass(classes[0]);
  },

  setStep: (step) => set({ step }),
  setBuildName: (name) => set({ buildName: name }),
  setBuildDescription: (description) => set({ buildDescription: description }),
  setBaseClass: (baseClassSelection) => {
    const state = get();
    set({ baseClassSelection });

    // also update ascendancy list to select the first one
    const ascendancies = state.ascendancies;

    console.log("@AscendanciesSelection ascendancies state:", ascendancies);

    if (!ascendancies) return;

    const correspondingAscendancies = getAscendancyChoice(
      baseClassSelection,
      ascendancies,
    );

    console.log(
      "updated correspondingAscendancies:",
      correspondingAscendancies,
    );

    if (!correspondingAscendancies) return;

    set({ ascendancyClassSelection: correspondingAscendancies[0] });
  },

  setAscendancyClass: (ascendancyClassSelection) =>
    set({ ascendancyClassSelection }),

  setTag: (tagSelection) => set({ tagSelection }),
}));
