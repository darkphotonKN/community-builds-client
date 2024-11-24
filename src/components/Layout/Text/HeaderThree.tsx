import { TextProps } from "./HeaderOne";

function HeaderThree({ children }: TextProps) {
	return <div className="text-customHeaderThree text-xl mt-2">{children}</div>;
}

export default HeaderThree;
