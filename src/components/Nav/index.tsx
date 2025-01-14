"use client";
import { cornerNavData, navData } from "@/data/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MainTitle from "@/components/MainTitle";

function Nav() {
  const pathname = usePathname();

  return (
    <nav className="border-customContentBg bg-customContentBg rounded-md py-3 px-6 transition-colors duration-200">
      <ul className="flex items-center gap-2">
        <MainTitle title="Builds of Exiles" />
        <div className="w-screen flex justify-between">
          <div className="flex items-center gap-2">
            {navData.map((navItem, index) => (
              <li
                key={navItem.link}
                className={`transition-colors duration-200 ease-in
							hover:customSecondary cursor-pointer ${navItem.link === pathname ? "font-medium" : ""}`}
              >
                <Link href={navItem.link}>
                  <div className="hover:text-customSecondary">
                    {navItem.name} {index != navData.length - 1 && " ."}
                  </div>
                </Link>
              </li>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {cornerNavData.map((navItem) => (
              <li
                key={navItem.link}
                className={`transition-colors duration-200 ease-in
							hover:customSecondary cursor-pointer ${navItem.link === pathname ? "font-medium" : ""}`}
              >
                <Link href={navItem.link}>
                  {navItem.name === "Create Build" ? (
                    <div className="py-2 px-3 rounded-md bg-customBg mr-4 text-customHeaderTwo transition-all duration-200 ease-in hover:bg-customSecondary hover:text-customBg">
                      <div>{navItem.name}</div>
                    </div>
                  ) : (
                    <div className="hover:text-customSecondary">
                      {navItem.name}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </div>
        </div>
      </ul>
    </nav>
  );
}

export default Nav;
