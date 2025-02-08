/**
 * All class and ascendancy related logic and helpers.
 **/

import {
  ascendancyClass,
  AscendancyClassEnum,
  baseClass,
  BaseClass,
} from "@/constants/enums";

export function getAscendancyChoice(
  classChoice: BaseClass | null,
): AscendancyClassEnum[] | null {
  switch (classChoice) {
    case baseClass.MERCENARY: {
      return [ascendancyClass.GemlingLegionnaire, ascendancyClass.Witchhunter];
    }

    case baseClass.MONK: {
      return [ascendancyClass.Invoker, ascendancyClass.AcolyteOfChayula];
    }

    case baseClass.RANGER: {
      return [ascendancyClass.Deadeye, ascendancyClass.Pathfinder];
    }

    case baseClass.WITCH: {
      return [ascendancyClass.Infernalist, ascendancyClass.BloodMage];
    }

    case baseClass.WARRIOR: {
      return [ascendancyClass.Titan, ascendancyClass.Warbringer];
    }

    case baseClass.SORCEROR: {
      return [ascendancyClass.Stormweaver, ascendancyClass.Chronomancer];
    }
  }

  return null;
}
