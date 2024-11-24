"use client";

import HeaderOne from "@/components/Layout/Text/HeaderOne";
import HeaderThree from "@/components/Layout/Text/HeaderThree";
import HeaderTwo from "@/components/Layout/Text/HeaderTwo";

const Home = () => {
  return (
    <div>
      <HeaderOne>Main Header</HeaderOne>
      <HeaderTwo>Secondary Header</HeaderTwo>
      <HeaderThree>Tertiary Header</HeaderThree>
      {/* Main text color */}
      <div className="text-customTxtContent">
        Content Home - List of featured community builds, explanation of the
        site, and a general welcome.
      </div>
    </div>
  );
};

export default Home;
