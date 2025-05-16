'use client';
import Button from '@/components/Button';
import PrimaryInput from '@/components/Input/PrimaryInput';
import HeaderOne from '@/components/Layout/Text/HeaderOne';
import HeaderTwo from '@/components/Layout/Text/HeaderTwo';
import { isErrorResponse, postRequest } from '@/lib/api/requestHelpers';
import { getAscendancyChoice } from '@/lib/utils/class';
import { useBuildStore } from '@/store/buildStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    const tagIds = [tagSelection];
    const res = await postRequest<any>(
      '/build',
      {
        title: buildName,
        description: buildDescription,
        skillId: '00000000-0000-0000-0000-000000000012',
        tagIds,
        classId: baseClassSelection?.id,
        ascendancyId: ascendancyClassSelection?.id,
      },
      true
    );

    console.log('response after initial build creation:', res);

    if (isErrorResponse(res)) {
      // TODO: update popup styling
      alert(res.result);
      return;
    }

    router.push('/profile/builds/edit');
  };

  const ascendancyChoices = baseClassSelection
    ? getAscendancyChoice(baseClassSelection, ascendancies)
    : [];

  console.log('@SubmitInfo ', {
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
            <HeaderOne>Step I - Choose a build name.</HeaderOne>
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
            <HeaderOne>Step II - Class and Description</HeaderOne>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Description Section */}
              <div className="bg-customContentBg p-6 rounded-lg shadow-customBlockShadow hover:shadow-customBlockShadowHover transition-all">
                <HeaderTwo>Description</HeaderTwo>
                <div className="mt-4 text-customTxtContent text-center">
                  Describe what your build does in a short sentence.
                </div>
                <div className="mt-4 flex justify-center">
                  <PrimaryInput
                    placeHolder="Enter description"
                    handleChangeFn={handleBuildDescription}
                    value={buildDescription}
                    validation={{ length: 10 }}
                  />
                </div>
              </div>

              {/* Main Skill Section */}
              <div className="bg-customContentBg p-6 rounded-lg shadow-customBlockShadow hover:shadow-customBlockShadowHover transition-all">
                <HeaderTwo>Main Skill</HeaderTwo>
                <div className="mt-4 text-customTxtContent text-center">
                  What&apos;s the{' '}
                  <span className="text-customSecondary">Core Skill</span> of
                  your Build?
                </div>
                <div className="mt-2 text-sm text-center text-customHeaderOne">
                  This will be used for{' '}
                  <span className="text-customSecondary">advertising</span> your
                  build.
                </div>
                <div className="flex flex-wrap gap-4 mt-4 justify-center">
                  Skills Selection here
                </div>
              </div>

              {/* Class Section */}
              <div className="bg-customContentBg p-6 rounded-lg shadow-customBlockShadow hover:shadow-customBlockShadowHover transition-all">
                <HeaderTwo>Class</HeaderTwo>
                <div className="mt-4 text-customTxtContent text-center">
                  Which <span className="text-customSecondary">Class</span> is
                  your Build for?
                </div>
                <div className="flex flex-wrap gap-4 mt-4 justify-center">
                  {classes.map((currentClass) => (
                    <div
                      key={currentClass.id}
                      className={`px-4 py-2 rounded-md duration-200 ease-in hover:bg-customSecondary hover:text-customBg cursor-pointer ${
                        baseClassSelection === currentClass
                          ? 'bg-customSecondary text-customBg'
                          : 'text-customTxtContent'
                      }`}
                      onClick={() => setBaseClass(currentClass)}
                    >
                      {currentClass.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ascendancy Section */}
              <div className="bg-customContentBg p-6 rounded-lg shadow-customBlockShadow hover:shadow-customBlockShadowHover transition-all">
                <HeaderTwo>Ascendancy</HeaderTwo>
                <div className="mt-4 text-customTxtContent text-center">
                  Which{' '}
                  <span className="text-customSecondary">Ascendancy Class</span>{' '}
                  is your Build for?
                </div>
                <div className="flex flex-wrap gap-4 mt-4 justify-center">
                  {ascendancyChoices?.map((ascendancyChoice) => (
                    <div
                      key={ascendancyChoice.id}
                      className={`px-4 py-2 rounded-md duration-200 ease-in hover:bg-customSecondary hover:text-customBg cursor-pointer ${
                        ascendancyChoice.name === ascendancyClassSelection?.name
                          ? 'bg-customSecondary text-customBg'
                          : 'text-customTxtContent'
                      }`}
                      onClick={() => setAscendancyClass(ascendancyChoice)}
                    >
                      {ascendancyChoice.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Section */}
              <div className="bg-customContentBg p-6 rounded-lg shadow-customBlockShadow hover:shadow-customBlockShadowHover transition-all md:col-span-2">
                <HeaderTwo>Tags</HeaderTwo>
                <div className="mt-4 text-customTxtContent text-center">
                  Which <span className="text-customSecondary">Tags</span>{' '}
                  should your Build have?
                </div>
                <div className="mt-2 text-sm text-center text-customHeaderOne">
                  These will be used to{' '}
                  <span className="text-customSecondary">categorize</span> your
                  build and make it appear in the correct{' '}
                  <span className="text-customSecondary">filter options</span>.
                </div>
                <div className="flex flex-wrap gap-4 mt-4 justify-center">
                  {tags &&
                    tags.map((tag) => (
                      <div
                        key={tag.id}
                        className={`px-4 py-2 rounded-md duration-200 ease-in hover:bg-customSecondary hover:text-customBg cursor-pointer ${
                          tagSelection === tag.id
                            ? 'bg-customSecondary text-customBg'
                            : 'text-customTxtContent'
                        }`}
                        onClick={() => setTagSelection(tag.id)}
                      >
                        {tag.name}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
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
            <HeaderOne>Step III - Create Build</HeaderOne>
            <div className="mt-6">
              Describe what your amazing build does in a short sentence.
            </div>
            <Button onClick={() => {}} width={200} text="Create Item" />
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
          </>
        );
      }
      case 4: {
        return (
          <>
            <HeaderOne>Step IV - Create Build Or Create Item</HeaderOne>
            <div className="mt-6">
              Describe what your amazing build does in a short sentence.
            </div>
            <div className="flex mt-[20px] gap-[20px]">
              <div className="flex-1 text-center cursor-pointer border border-customSecondary rounded-lg p-[40px] hover:bg-customSecondary">
                Create Build
              </div>
            </div>
          </>
        );
      }
    }
  };

  return (
    <div>
      <div className="mb-5">
        Create an entire build from scratch and join the community of awesome
        builds!
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <div>{renderStep()}</div>
        </div>
      </div>
    </div>
  );
}

export default CreateBuildsPage;
