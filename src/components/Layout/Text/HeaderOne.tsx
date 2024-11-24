import { ReactNode } from "react";

export type TextProps = { children: ReactNode };

function HeaderOne({ children }: TextProps) {
	return (
		<div className="text-customHeaderOne text-3xl font-semibold">
			{children}
		</div>
	);
}

export default HeaderOne;
