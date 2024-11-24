import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
	text: string;
	width?: number;
	height?: number;
	color?: string;
	onClick?: () => any;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ text, color, type, width, height, onClick }: ButtonProps) {
	const widthVal = width ? `w-[${width}px]` : "w-full";
	const heightVal = height ? `h-[${height}px]` : "h-auto";

	console.log("@Button height:", height);
	console.log("@Button heightVal:", heightVal);
	return (
		<button
			type={type}
			className={`${widthVal} ${heightVal} rounded text-white bg-customContentBg hover:bg-customSecondary ${color ? color : "text-customSecondary"} hover:text-customTxtContent p-2 mt-8 hover:text-gray-500 transition`}
			onClick={onClick ? onClick : undefined}
		>
			{text}
		</button>
	);
}

export default Button;
