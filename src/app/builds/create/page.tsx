import HeaderThree from "@/components/Layout/Text/HeaderThree";
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBuildsPage;
