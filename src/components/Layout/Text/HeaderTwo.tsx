import { TextProps } from "./HeaderOne";

function HeaderTwo({ children }: TextProps) {
	return (
		<div className="text-customHeaderTwo text-2xl font-medium">{children}</div>
	);
}

export default HeaderTwo;
