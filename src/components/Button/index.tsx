import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
	text: string;
	width?: number;
	height?: number;
	color?: string;
	onClick?: () => any;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ text, color, type, width, height, onClick }: ButtonProps) {
	const widthVal = width ? `${width}px` : "100%";
	const heightVal = height ? `${height}px` : "40px";

	console.log("@Button height:", height);
	console.log("@Button heightVal:", heightVal);
	return (
		<button
			type={type}
			className={`rounded text-white bg-customContentBg hover:bg-customSecondary ${color ? color : "text-customSecondary"} hover:text-customTxtContent p-2 mt-8 hover:text-gray-500 transition`}
			onClick={onClick ? onClick : undefined}
			style={{ height: heightVal, width: widthVal }}
		>
			{text}
		</button>
	);
}

export default Button;
