/**
Build Enums
**/
export const baseClass = {
	WARRIOR: "warrior",
	SORCEROR: "sorceror",
	WITCH: "witch",
	MONK: "monk",
	MERCENARY: "mercenary",
	RANGER: "ranger",
} as const;
export type BaseClass = (typeof baseClass)[keyof typeof baseClass];

const ascendancyClass = {
	CHAMPION: "champion",
	GLADIATOR: "gladiator",
	JUGGERNAUT: "juggernaut",
	INQUISITOR: "inquisitor",
	HIEROPHANT: "hierophant",
	GUARDIAN: "guardian",
} as const;

export type AscendancyClass =
	(typeof ascendancyClass)[keyof typeof ascendancyClass];
