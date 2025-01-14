"use client";
import Button from "@/components/Button";
import HeaderThree from "@/components/Layout/Text/HeaderThree";
import HeaderTwo from "@/components/Layout/Text/HeaderTwo";
import {
  BaseClass,
  baseClass,
  AscendancyClass,
  tag,
  Tag,
} from "@/constants/enums";
import { postRequest } from "@/lib/api/requestHelpers";
import { getAscendancyChoice } from "@/lib/utils/class";
import { useBuildStore } from "@/store/buildStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

function CreateBuildsPage() {
  const SUGGESTION_DELAY = 3700;
  const [showSuggestions, setShowSuggestions] = useState(false);

  const router = useRouter();

  const {
    step,
    buildName,
    buildDescription,
    baseClassSelection,
    ascendancyClassSelection,
    tagSelection,
    setStep,
    setBuildName,
    setBuildDescription,
    setBaseClass,
    setAscendancyClass,
    setTag,
  } = useBuildStore();

  // show suggestions after a user starts writing the name + a delay timer
  useEffect(() => {
    if (buildName.length > 0 && buildName.length < 6) {
      setTimeout(() => {
        setShowSuggestions(true);
      }, SUGGESTION_DELAY);
    }
  }, [buildName]);
  const handleBuildName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildName(e.target.value);
  };

  const handleBuildDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildDescription(e.target.value);
  };

  const handleNextStep = (step: 2 | 3 | 4) => setStep(step);

  const handleCreateBuild = async () => {
    const res = await postRequest<any>(
      "http://localhost:5050/api/build",
      {
        title: buildName,
        description: buildDescription,
        skillId: "00000000-0000-0000-0000-000000000012",
        tagIds: ["3ac52fac-f3d8-47bf-bb8c-311fca50d53d"],
        classId: "66666666-6666-6666-6666-666666666666",
        ascendancyId: "66666666-6666-6666-6666-666666666667",
      },
      true,
    );

    router.push("/profile/builds/edit");
  };

  const renderStep = () => {
    switch (step) {
      case 1: {
        return (
          <>
            <HeaderTwo>Step I - Choose a build name.</HeaderTwo>
            <div className="mt-5">
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
                  <div className="text-center">
                    <div className="text-customSecondary">
                      Build name needs to be at least 6 characters long.
                    </div>

                    {/* Show humorous suggestions after few seconds.*/}
                    <motion.div animate={{ opacity: showSuggestions ? 1 : 0 }}>
                      <div className="mt-5 fade-in">
                        Pro Suggestions:{" "}
                        <span className="text-customSecondary">
                          &quot;Temporalis Farmer&quot;
                        </span>{" "}
                        or{" "}
                        <span className="text-customSecondary">
                          &quot;Ingenius Ingenuity&quot;
                        </span>{" "}
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </>
        );
      }

      case 2: {
        // find underlying ascendancy array based on class selection
        const ascendancyChoices = getAscendancyChoice(baseClassSelection) || [];

        console.log("ascendancyChoices:", ascendancyChoices);

        return (
          <>
            <HeaderTwo>Step II - Class and Description </HeaderTwo>
            <div className="mt-10">
              <HeaderThree>
                Provide a short{" "}
                <span className="text-customSecondary">overview</span> of your
                build.
              </HeaderThree>
            </div>

            <div className="justify-center mt-10">
              <input
                className="w-full bg-transparent text-center text-customHeaderTwo text-xl border-b border-customSecondary pb-1 mb-3"
                placeholder="Build Description"
                onChange={handleBuildDescription}
              />

              {buildDescription.length > 0 && buildDescription.length < 10 && (
                <span className="text-customSecondary">
                  Build description needs to be at least 10 characters long.
                </span>
              )}
            </div>

            {/* --- Class --- */}

            <div className="mt-10 text-center">
              <HeaderThree>
                Choose a <span className="text-customSecondary">Class </span>
              </HeaderThree>
            </div>
            <div className="flex gap-4 mt-5">
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
                  onClick={() => {
                    setBaseClass(currentClass);
                  }}
                >
                  {currentClass}
                </div>
              ))}
            </div>

            {/* --- Ascendancy --- */}

            <div className="mt-10 text-center">
              <HeaderThree>
                Choose an
                <span className="text-customSecondary"> Ascendancy </span>{" "}
              </HeaderThree>
            </div>

            <div className="flex gap-4 mt-5 justify-center">
              {ascendancyChoices?.map(
                (currentAscendancyClass: AscendancyClass, index) => (
                  <div
                    key={currentAscendancyClass + index}
                    className={
                      "duration-200 ease-in hover:text-customSecondary cursor-pointer" +
                      (ascendancyClassSelection === currentAscendancyClass
                        ? " text-customSecondary"
                        : "")
                    }
                    onClick={() => setAscendancyClass(currentAscendancyClass)}
                  >
                    {currentAscendancyClass}
                  </div>
                ),
              )}
            </div>
            <div className="mt-10 text-center">
              <HeaderThree>
                Add some <span className="text-customSecondary"> Tags </span>{" "}
                that fit your build
              </HeaderThree>
            </div>
            <div className="flex gap-4 mt-5">
              {[tag?.END_GAME, tag?.LEVELING, tag?.RANGER, tag?.WARRIOR].map(
                (tag: Tag, index) => (
                  <div
                    key={tag + index}
                    className={
                      "duration-200 ease-in hover:text-customSecondary cursor-pointer" +
                      (tagSelection === tag ? " text-customSecondary" : "")
                    }
                    onClick={() => setTag(tag)}
                  >
                    {tag}
                  </div>
                ),
              )}
            </div>
            <div className="flex h-[300px] justify-center items-center"></div>
            <div className="flex justify-center">
              {buildName.length >= 6 && (
                <Button onClick={handleCreateBuild} width={200} text="NEXT" />
              )}
            </div>
          </>
        );
      }

      case 3: {
        return (
          <>
            <HeaderTwo>Step III - Create Build</HeaderTwo>
            <div className="mt-10">
              Describe what your amazing build does in a short sentence.
            </div>
            <Button onClick={() => { }} width={200} text="Create Item" />
            <div className="flex mt-[20px] gap-[20px] flex-wrap">
              <div className="flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[200px] h-[200px]">
                Helmet
              </div>
              <div className="flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[200px] h-[200px]">
                BodyArmour
              </div>
              <div className="flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[200px] h-[200px]">
                Weapon
              </div>
              <div className="flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[200px] h-[200px]">
                Shield
              </div>
              <div className="flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[200px] h-[200px]">
                Gloves
              </div>
              <div className="flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[200px] h-[200px]">
                Belt
              </div>
              <div className="flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[200px] h-[200px]">
                Boots
              </div>
              <div className="flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[200px] h-[200px]">
                Amulet
              </div>
              <div className="flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[200px] h-[200px]">
                Ring
              </div>
              <div className="flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[200px] h-[200px]">
                Ring
              </div>
            </div>
            <div className="flex mt-[20px] gap-[20px]">
              {/* <button
                onClick={() => handleNextStep(4)}
                className="flex-1 text-center cursor-pointer border border-customSecondary rounded-lg p-[40px] hover:bg-customSecondary"
              >
                Create Build
              </button> */}
              {/* <div className="flex-1 text-center cursor-pointer border border-customSecondary rounded-lg p-[40px] hover:bg-customSecondary">
                Create Item
              </div> */}
            </div>
          </>
        );
      }
      case 4: {
        return (
          <>
            <HeaderTwo>Step IIII - Create Build Or Create Item</HeaderTwo>
            <div className="mt-10">
              Describe what your amazing build does in a short sentence.
            </div>

            <div className="flex mt-[20px] gap-[20px]">
              <div className="flex-1 text-center cursor-pointer border border-customSecondary rounded-lg p-[40px] hover:bg-customSecondary">
                Create Build
              </div>
              {/* <div className="flex-1 text-center cursor-pointer border border-customSecondary rounded-lg p-[40px] hover:bg-customSecondary">
                Create Item
              </div> */}
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
