import React from "react";

interface Props {
  data: any;
}
const ItemInfoCard = ({ data }: Props) => {
  const { name, type, damage, crit, additional, stats, description } = data;
  return (
    <div className="absolute hidden group-hover:block bg-black text-[#aaa] border p-2 mt-2 left-[0px] w-[500px] z-10">
      {name && <div className="text-white">{name}</div>}
      {type && <div className="text-white">{type}</div>}
      {damage && <div className="mt-2">{`Damage: ${damage}`}</div>}
      {crit && <div className="mt-2">{`Critical Chance: ${crit}`}</div>}
      {additional && <div className="mt-2">{additional}</div>}
      {stats && (
        <div className="mt-4">
          {stats.map((stat: string, index: number) => (
            <div key={index} className="mt-1 text-blue-400">
              {stat}
            </div>
          ))}
        </div>
      )}
      {description && <div className="mt-4">{description}</div>}
    </div>
  );
};

export default ItemInfoCard;
