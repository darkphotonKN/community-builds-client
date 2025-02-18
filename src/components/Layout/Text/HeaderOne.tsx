import { ReactNode } from "react";

export type TextProps = { children: ReactNode };

function HeaderOne({ children }: TextProps) {
  return (
    <div className="text-customHeaderOne text-3xl font-medium mt-2">
      {children}
    </div>
  );
}

export default HeaderOne;
