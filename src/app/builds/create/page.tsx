import HeaderTwo from "@/components/Layout/Text/HeaderTwo";

function CreateBuildsPage() {
  return (
    <div>
      Create an entire build from scratch and join the community of awesome
      builds!
      <div>
        Let&apos;s start with the very first step of creating your build.
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <HeaderTwo>STEP I - Choose a build name.</HeaderTwo>
          <div className="mt-5">
            Something as simple as &quot;Earthquake Jugg&quot; or &quot;Boss
            Farmer&quot; will do.
            <div className="flex h-[400px] justify-center items-center">
              <input
                className="w-[280px] bg-transparent text-center text-customHeaderTwo text-2xl border-b border-customSecondary pb-1"
                placeholder="Name Your Build"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBuildsPage;
