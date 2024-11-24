"use client";
import { navData } from "@/data/nav";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MainTitle from "@/components/MainTitle";

function Nav() {
  const pathname = usePathname();

  return (
    <nav className="border-customContentBg bg-customContentBg rounded-md p-3">
      <ul className="flex items-center gap-2">
        <MainTitle title="Community Builds" />
        {navData.map((navItem, index) => (
          <li
            key={navItem.link}
            className={`transition-colors duration-200 ease-in
							hover:customSecondary cursor-pointer ${navItem.link === pathname ? "font-medium" : ""}`}
          >
            <Link href={navItem.link}>
              <div>
                {navItem.name} {index != navData.length - 1 && " ."}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
