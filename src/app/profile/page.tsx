"use client";
import HeaderOne from "@/components/Layout/Text/HeaderOne";
import HeaderTwo from "@/components/Layout/Text/HeaderTwo";
import useData from "@/hooks/useData";
import { Build } from "@/type/build.types";
import BuildsTable from "../table/BuildsTable";

function Profile() {
  const { response, error } = useData<Build[], null>("/build", undefined, true);

  console.log("response:", response);
  console.log("error:", error);

  return (
    <div>
      <HeaderOne>User Profile</HeaderOne>
      <HeaderTwo>Basic Information</HeaderTwo>

      <div>Name: Nick Peng</div>
      <div>Age: 47</div>

      <HeaderTwo>Builds</HeaderTwo>

      <BuildsTable builds={response?.result} />
    </div>
  );
}

export default Profile;
