import { TextProps } from "./HeaderOne";

function HeaderTwo({ children }: TextProps) {
	return (
		<div className="text-customHeaderTwo text-2xl font-medium mt-2">
			{children}
		</div>
	);
}

export default HeaderTwo;
