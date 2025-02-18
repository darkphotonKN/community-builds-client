import { getRequest } from "@/lib/api/requestHelpers";
import { getAscendancyChoice } from "@/lib/utils/class";
import {
  ClassAndAscendanciesResponse,
  ClassAscendancy,
  TagApiData,
} from "@/type/build.types";
import { create } from "zustand";

type BuildState = {
  step: number;
  buildName: string;
  buildDescription: string;
  baseClassSelection: ClassAscendancy | null;
  ascendancyClassSelection: ClassAscendancy | null;
  classes: ClassAscendancy[];
  ascendancies: ClassAscendancy[];
  tags: TagApiData[] | null;
  tagSelection: string | null;

  setStep: (step: number) => void;
  setBuildName: (name: string) => void;
  setBuildDescription: (description: string) => void;
  setBaseClass: (classSelection: ClassAscendancy) => void;
  setAscendancyClass: (ascendancySelection: ClassAscendancy) => void;
  setTagSelection: (tagSelection: string) => void;
  setTags: (tags: TagApiData[]) => void;
  initializeBuildData: () => void;
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
  tags: [],

  // methods

  // initializes classes via api request from the server
  initializeBuildData: async () => {
    const classData = await getRequest<ClassAndAscendanciesResponse>("/class");

    const { classes, ascendancies } = classData?.result || {};
    console.log('@ascendanciesggggggg',ascendancies)
    set({
      ascendancies,
    });

    set({
      classes,
    });

    // set base class as warrior

    if (!classes) return;

    const state = get();

    state.setBaseClass(classes[0]); // note this function also automatically sets ascendancies to the first choice of that class

    const tagData = await getRequest<TagApiData[]>("/tag");

    state.setTags(tagData?.result ?? []);
  },

  setStep: (step) => set({ step }),
  setBuildName: (name) => set({ buildName: name }),
  setBuildDescription: (description) => set({ buildDescription: description }),
  setTagSelection: (tagSelection: string) => set({ tagSelection }),
  setTags: (tags: TagApiData[]) => set({ tags }),
  setBaseClass: (baseClassSelection) => {
    const state = get();
    set({ baseClassSelection });

    // also update ascendancy list to select the first one
    const ascendancies = state.ascendancies;

    console.log("@Ascendanciesggg", ascendancies);

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
}));
