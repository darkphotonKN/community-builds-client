/**
 * All class and ascendancy related logic and helpers.
 **/

import {
  ascendancyClass,
  AscendancyClassEnum,
  baseClass,
  BaseClass,
} from '@/constants/enums';
import { ClassAscendancy } from '@/type/build.types';

export function getAscendancyChoice(
  classChoice: ClassAscendancy | undefined,
  ascendancies: ClassAscendancy[] | undefined
): ClassAscendancy[] | undefined {
  console.log('classChoice', classChoice);
  console.log('ascendancies', ascendancies);
  if (!classChoice?.name || !ascendancies) return;

  const gemlingLegionnaire = ascendancies.find((ascendancy) => {
    console.log('@AscendanciesSelection ascendancies check:', ascendancy);

    return ascendancy.name === ascendancyClass.GemlingLegionnaire;
  });

  const witchHunter = ascendancies.find(
    (ascendancy) => ascendancy.name === ascendancyClass.Witchhunter
  );

  const titan = ascendancies.find(
    (ascendancy) => ascendancy.name === ascendancyClass.Titan
  );

  const warbringer = ascendancies.find(
    (ascendancy) => ascendancy.name === ascendancyClass.Warbringer
  );

  const infernalist = ascendancies.find(
    (ascendancy) => ascendancy.name === ascendancyClass.Infernalist
  );

  const bloodMage = ascendancies.find(
    (ascendancy) => ascendancy.name === ascendancyClass.BloodMage
  );

  const deadEye = ascendancies.find(
    (ascendancy) => ascendancy.name === ascendancyClass.Deadeye
  );

  const pathFinder = ascendancies.find(
    (ascendancy) => ascendancy.name === ascendancyClass.Pathfinder
  );

  const invoker = ascendancies.find(
    (ascendancy) => ascendancy.name === ascendancyClass.Invoker
  );

  const acolyteOfChayula = ascendancies.find(
    (ascendancy) => ascendancy.name === ascendancyClass.AcolyteOfChayula
  );

  const stormWeaver = ascendancies.find(
    (ascendancy) => ascendancy.name === ascendancyClass.Stormweaver
  );

  const chronomancer = ascendancies.find(
    (ascendancy) => ascendancy.name === ascendancyClass.Chronomancer
  );

  if (
    !gemlingLegionnaire ||
    !witchHunter ||
    !titan ||
    !warbringer ||
    !infernalist ||
    !bloodMage ||
    !deadEye ||
    !pathFinder ||
    !invoker ||
    !acolyteOfChayula ||
    !stormWeaver ||
    !chronomancer
  )
    return;

  console.log('@AscendanciesSelection classChoice:', classChoice);

  console.log('classChoice.name', classChoice.name);
  switch (classChoice.name) {
    case baseClass.MERCENARY: {
      return [gemlingLegionnaire, witchHunter];
    }

    case baseClass.MONK: {
      return [invoker, acolyteOfChayula];
    }

    case baseClass.RANGER: {
      return [deadEye, pathFinder];
    }

    case baseClass.WITCH: {
      return [infernalist, bloodMage];
    }

    case baseClass.WARRIOR: {
      return [titan, warbringer];
    }

    case baseClass.SORCEROR: {
      return [stormWeaver, chronomancer];
    }
  }

  return;
}
