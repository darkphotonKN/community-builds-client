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
  BloodMage: "BloodMage",
  Infernalist: "Infernalist",
  Witchhunter: "Witchhunter",
  GemlingLegionnaire: "GemlingLegionnaire",
  Invoker: "Invoker",
  AcolyteOfChayula: "AcolyteOfChayula",
} as const;

export type AscendancyClass =
  (typeof ascendancyClass)[keyof typeof ascendancyClass];

export const tag = {
  END_GAME: "end game",
  LEVELING: "leveling",
  RANGER: "ranger",
  WARRIOR: "warrior",
} as const;

export type Tag = (typeof tag)[keyof typeof tag];
