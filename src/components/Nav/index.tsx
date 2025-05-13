'use client';
import { cornerNavData, navData } from '@/data/nav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MainTitle from '@/components/MainTitle';
import { NavType } from '@/constants/enums';
import Button from '../Button';
import useIsAuthenticated from '@/hooks/useIsAuthenticated';

function Nav() {
  const pathname = usePathname();

  const isAuthenticated = useIsAuthenticated();

  const navItemFiltered = cornerNavData.filter((item) => {
    if (isAuthenticated) {
      return item.type !== NavType.notAuthenticated;
    }
    return item.type !== NavType.authenticated;
  });

  console.log({ navItemFiltered });

  return (
    <nav className="border-b border-customSecondary bg-customContentBg py-4 px-6 transition-all duration-200">
      <div className="max-w-7xl mx-auto">
        <ul className="flex items-center justify-between">
          {/* Left side - Logo and Main Nav */}
          <div className="flex items-center gap-8">
            <MainTitle title="Builds of Exiles" />
            <div className="flex items-center gap-6">
              {navData.map((navItem, index) => (
                <li key={navItem.link} className="relative group">
                  {navItem?.link ? (
                    <Link href={navItem.link}>
                      <div
                        className={`text-customTxtContent hover:text-customSecondary transition-all duration-200 flex items-center gap-2
                        ${
                          navItem.link === pathname
                            ? 'text-customSecondary font-medium'
                            : ''
                        }`}
                      >
                        {navItem.name}
                        {index !== navData.length - 1 && (
                          <span className="text-customHeaderTwo">•</span>
                        )}
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-customSecondary transition-all duration-200 group-hover:w-full"></div>
                      </div>
                    </Link>
                  ) : (
                    <Button text="testerson" />
                  )}
                </li>
              ))}
            </div>
          </div>

          {/* Right side - Auth and Create Build */}
          <div className="flex items-center gap-4">
            {navItemFiltered.map((navItem) => (
              <li key={navItem.name} className="relative">
                {navItem?.link ? (
                  <Link href={navItem.link}>
                    {navItem.name === 'Create Build' ? (
                      <div className="relative group">
                        <div
                          className="py-3 px-6 rounded-md bg-customBg border border-customSecondary text-customHeaderTwo 
                          transition-all duration-200 ease-in hover:bg-customSecondary hover:text-customBg
                          shadow-customBlockShadow hover:shadow-customBlockShadowHover"
                        >
                          <div className="text-lg font-medium">
                            {navItem.name}
                          </div>
                        </div>
                        <div className="absolute -inset-1 bg-customSecondary opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-200 rounded-md"></div>
                      </div>
                    ) : (
                      <div className="text-customTxtContent hover:text-customSecondary transition-all duration-200 relative group">
                        {navItem.name}
                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-customSecondary transition-all duration-200 group-hover:w-full"></div>
                      </div>
                    )}
                  </Link>
                ) : (
                  <button
                    className="text-customTxtContent hover:text-customSecondary transition-all duration-200 relative group"
                    onClick={navItem.onClick}
                  >
                    {navItem.name}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-customSecondary transition-all duration-200 group-hover:w-full"></div>
                  </button>
                )}
              </li>
            ))}
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
