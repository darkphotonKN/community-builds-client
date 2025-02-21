import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
	text: string;
	width?: number;
	height?: number;
	color?: string;
	marginTop?: number;
	onClick?: () => any;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
	text,
	color,
	type,
	width,
	height,
	marginTop,
	onClick,
}: ButtonProps) {
	const widthVal = width ? `${width}px` : "100%";
	const heightVal = height ? `${height}px` : "40px";

	console.log("@Button marginTop:", marginTop);
	return (
		<button
			type={type}
			className={`rounded text-white bg-customContentBg hover:bg-customSecondary ${color ? color : "text-customSecondary"} hover:text-customBg p-2 ${marginTop !== undefined ? `mt-[${marginTop}]` : "mt-8"} hover:customBg transition`}
			onClick={onClick ?? undefined}
			style={{ height: heightVal, width: widthVal }}
		>
			{text}
		</button>
	);
}

export default Button;
