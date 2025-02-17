"use client";
import Button from "@/components/Button";
import PrimaryInput from "@/components/Input/PrimaryInput";
import HeaderTwo from "@/components/Layout/Text/HeaderTwo";
import { isErrorResponse, postRequest } from "@/lib/api/requestHelpers";
import { getAscendancyChoice } from "@/lib/utils/class";
import { useBuildStore } from "@/store/buildStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function CreateBuildsPage() {
  const router = useRouter();

  const {
    ascendancies,
    classes,
    step,
    buildName,
    buildDescription,
    baseClassSelection,
    ascendancyClassSelection,
    tags,
    tagSelection,
    setStep,
    setBuildName,
    setBuildDescription,
    setBaseClass,
    setAscendancyClass,
    setTagSelection,
    initializeBuildData,
  } = useBuildStore();

  // fetch and intialize data required for generating the build creation process
  useEffect(() => {
    initializeBuildData();
  }, []);

  const handleBuildName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildName(e.target.value);
  };

  const handleBuildDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuildDescription(e.target.value);
  };

  const handleNextStep = (step: 2 | 3 | 4) => setStep(step);
  const handleCreateBuild = async () => {
    const res = await postRequest<any>(
      "/build",
      {
        title: buildName,
        description: buildDescription,
        skillId: "00000000-0000-0000-0000-000000000012",
        tagIds: [
          "10000000-0000-0000-0000-000000000000",
          "40000000-0000-0000-0000-000000000000",
        ],
        classId: baseClassSelection?.id,
        ascendancyId: ascendancyClassSelection?.id,
      },
      true,
    );

    console.log("response after initial build creation:", res);

    if (isErrorResponse(res)) {
      // TODO: update popup styling
      alert(res.result);
      return;
    }

    router.push("/profile/builds/edit");
  };

  const ascendancyChoices = baseClassSelection
    ? getAscendancyChoice(baseClassSelection, ascendancies)
    : [];

  console.log("@SubmitInfo ", {
    ascendancyClassSelection,
    baseClassSelection,
    buildDescription,
    buildName,
  });

  const renderStep = () => {
    switch (step) {
      case 1: {
        return (
          <>
            <HeaderTwo>Step I - Choose a build name.</HeaderTwo>
            <div className="mt-5">
              <div className="flex h-[400px] justify-center items-center">
                <PrimaryInput
                  placeHolder="Name Your Build"
                  value={buildName}
                  handleChangeFn={handleBuildName}
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
            <HeaderTwo>Description</HeaderTwo>

            <div className="mt-6">
              Describe what your build does in a short sentence.
            </div>
            <div className="justify-center mt-6">
              <PrimaryInput
                placeHolder="Enter description"
                handleChangeFn={handleBuildDescription}
                value={buildDescription}
                validation={{ length: 10 }}
              />
            </div>

            <div className="text-xl text-customHeaderTwo mt-6">Class</div>
            <div className="mt-6 text-center">
              Which <span className="text-customSecondary"> Class </span> is
              your Build for?
            </div>
            <div className="flex gap-4 mt-6">
              {classes.map((currentClass) => (
                <div
                  key={currentClass.id}
                  className={
                    "duration-200 ease-in hover:text-customSecondary cursor-pointer" +
                    (baseClassSelection === currentClass
                      ? " text-customSecondary"
                      : "")
                  }
                  onClick={() => setBaseClass(currentClass)}
                >
                  {currentClass.name}
                </div>
              ))}
            </div>

            <div className="text-xl text-customHeaderTwo mt-6">Ascendancy</div>

            <div className="mt-6 text-center">
              Which{" "}
              <span className="text-customSecondary"> Ascendancy Class </span>{" "}
              is your Build for?
            </div>
            <div className="flex gap-4 mt-6">
              {ascendancyChoices?.map((ascendancyChoice) => (
                <div
                  key={ascendancyChoice.id}
                  className={
                    "duration-200 ease-in hover:text-customSecondary cursor-pointer" +
                    (ascendancyChoice.name === ascendancyClassSelection?.name
                      ? " text-customSecondary"
                      : "")
                  }
                  onClick={() => setAscendancyClass(ascendancyChoice)}
                >
                  {ascendancyChoice.name}
                </div>
              ))}
            </div>

            <div className="text-xl text-customHeaderTwo mt-6">Tag</div>

            <div className="mt-6 text-center">
              Which <span className="text-customSecondary"> Tags </span> should
              your Build have?
            </div>
            <div className="flex gap-4 mt-6">
              {tags &&
                tags.map((tag) => (
                  <div
                    key={tag.id}
                    className={
                      "duration-200 ease-in hover:text-customSecondary cursor-pointer" +
                      (tagSelection === tag.name ? " text-customSecondary" : "")
                    }
                    onClick={() => setTagSelection(tag.name)}
                  >
                    {tag.name}
                  </div>
                ))}
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
            <div className="mt-6">
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
            <div className="mt-6">
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

  console.log({ tags });

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
