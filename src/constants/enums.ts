/**
Build Enums
**/
export const baseClass = {
  WARRIOR: "Warrior",
  SORCEROR: "Sorceror",
  WITCH: "Witch",
  MONK: "Monk",
  MERCENARY: "Mercenary",
  RANGER: "Ranger",
} as const;
export type BaseClass = (typeof baseClass)[keyof typeof baseClass];

export const ascendancyClass = {
  Stormweaver: "Stormweaver",
  Chronomancer: "Chronomancer",
  Titan: "Titan",
  Warbringer: "Warbringer",
  Deadeye: "Deadeye",
  Pathfinder: "Pathfinder",
  BloodMage: "Blood Mage",
  Infernalist: "Infernalist",
  Witchhunter: "Witchhunter",
  GemlingLegionnaire: "Gemling Legionnaire",
  Invoker: "Invoker",
  AcolyteOfChayula: "Acolyte Of Chayula",
} as const;

export type AscendancyClassEnum =
  (typeof ascendancyClass)[keyof typeof ascendancyClass];
