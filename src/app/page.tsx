"use client";

import HeaderOne from "@/components/Layout/Text/HeaderOne";
import HeaderTwo from "@/components/Layout/Text/HeaderTwo";

const Home = () => {
  return (
    <div>
      <HeaderOne>Welcome Exile!</HeaderOne>
      <HeaderTwo>Create. Share. Rate.</HeaderTwo>
      <div className="text-customTxtContent mt-4">
        This is the best place to share your beloved Path of Exile 2 creation.
      </div>
    </div>
  );
};

export default Home;
