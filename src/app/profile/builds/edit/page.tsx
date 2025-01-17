'use client';
import HeaderOne from '@/components/Layout/Text/HeaderOne';
import HeaderThree from '@/components/Layout/Text/HeaderThree';
import HeaderTwo from '@/components/Layout/Text/HeaderTwo';
import { getRequest } from '@/lib/api/requestHelpers';
import Image from 'next/image';
import { useState } from 'react';

const WIKI_DOMAIN = 'https://www.poewiki.net';
function BuildEdit() {
  const [itemCategory, setItemCategory] = useState('');
  const [itemItems, setItems] = useState([]);
  const [itemOptions, setItemOptions] = useState<
    { key: string; value: string }[]
  >([]);
  const [buildItems, setBuildItems] = useState<{ [key: string]: any }>({
    weapon: {},
    bodyArmour: {},
    helmet: {},
    leftRing: {},
    rightRing: {},
    amulet: {},
    boots: {},
    gloves: {},
    offHand: {},
    belt: {},
    lifeFlask: {},
    manaFlask: {},
    charm1: {},
    charm2: {},
    charm3: {},
  });

  const handleSetItemCategory = (key: string, slot: string) => {
    setItemCategory(key);
    handleGetBaseItems(slot);
  };

  const handleGetBaseItems = async (slot: string) => {
    const res = await getRequest<any>(`/item?slot=${slot}`, null, {
      auth: true,
    });
    if (res?.statusCode === 200) {
      const options = res.result.map((item: any) => ({
        key: item.id,
        value: item.name,
      }));
      setItems(res.result);
      setItemOptions(options);
    }
  };

  const handleSelectItem = (event: any) => {
    // event.target.value
    const targetItem = itemItems.find(
      (item: any) => item.id === event.target.value
    );
    setBuildItems((prev) => ({
      ...prev,
      [itemCategory]: targetItem,
    }));
  };

  return (
    <div>
      <HeaderOne>Build Editor</HeaderOne>
      <div className="flex gap-[100px]">
        <div>
          <HeaderOne>Build Items</HeaderOne>
          <div className="relative w-[700px] h-[500px] mt-[100px]">
            <div
              onClick={() => handleSetItemCategory('weapon', 'Weapon')}
              className="weapon absolute top-[0%] left-[0%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[300px]"
            >
              {buildItems['weapon']?.imageUrl ? (
                <Image
                  src={WIKI_DOMAIN + buildItems['weapon']?.imageUrl}
                  className="w-[fit-content]"
                  alt=""
                  width={150}
                  height={300}
                ></Image>
              ) : (
                'Weapon'
              )}
            </div>
            <div
              onClick={() => handleSetItemCategory('leftRing', 'Rings')}
              className="left-ring absolute top-[44%] left-[25%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]"
            >
              {buildItems['leftRing']?.imageUrl ? (
                <Image
                  src={WIKI_DOMAIN + buildItems['leftRing']?.imageUrl}
                  className="w-[fit-content]"
                  alt=""
                  width={150}
                  height={300}
                ></Image>
              ) : (
                'L Ring'
              )}
            </div>
            <div
              onClick={() => handleSetItemCategory('rightRing', 'Rings')}
              className="right-ring absolute top-[44%] left-[64%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]"
            >
              {buildItems['rightRing']?.imageUrl ? (
                <Image
                  src={WIKI_DOMAIN + buildItems['rightRing']?.imageUrl}
                  className="w-[fit-content]"
                  alt=""
                  width={150}
                  height={300}
                ></Image>
              ) : (
                'R Ring'
              )}
            </div>
            <div
              onClick={() => handleSetItemCategory('helmet', 'Helmet')}
              className="helmet absolute top-[-10%] left-[40%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]"
            >
              {buildItems['helmet']?.imageUrl ? (
                <Image
                  src={WIKI_DOMAIN + buildItems['helmet']?.imageUrl}
                  className="w-[fit-content]"
                  alt=""
                  width={150}
                  height={300}
                ></Image>
              ) : (
                'Helmet'
              )}
            </div>
            <div
              onClick={() => handleSetItemCategory('amulet', 'Amulet')}
              className="amulet absolute top-[-10%] left-[64%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]"
            >
              {buildItems['amulet']?.imageUrl ? (
                <Image
                  src={WIKI_DOMAIN + buildItems['amulet']?.imageUrl}
                  className="w-[fit-content]"
                  alt=""
                  width={150}
                  height={300}
                ></Image>
              ) : (
                'Amulet'
              )}
            </div>
            <div
              onClick={() => handleSetItemCategory('bodyArmour', 'Body Armour')}
              className="body-armour absolute top-[25%] left-[40%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[250px]"
            >
              {buildItems['bodyArmour']?.imageUrl ? (
                <Image
                  src={WIKI_DOMAIN + buildItems['bodyArmour']?.imageUrl}
                  className="w-[fit-content]"
                  alt=""
                  width={150}
                  height={300}
                ></Image>
              ) : (
                'Body Armour'
              )}
            </div>
            <div
              onClick={() => handleSetItemCategory('offHand', 'Shield')}
              className="off-hand absolute top-[0%] right-[0%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[300px]"
            >
              {buildItems['offHand']?.imageUrl ? (
                <Image
                  src={WIKI_DOMAIN + buildItems['offHand']?.imageUrl}
                  className="w-[fit-content]"
                  alt=""
                  width={150}
                  height={300}
                ></Image>
              ) : (
                'Off Hand'
              )}
            </div>
            <div
              onClick={() => handleSetItemCategory('gloves', 'Gloves')}
              className="gloves absolute top-[65%] left-[16%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]"
            >
              {buildItems['gloves']?.imageUrl ? (
                <Image
                  src={WIKI_DOMAIN + buildItems['gloves']?.imageUrl}
                  className="w-[fit-content]"
                  alt=""
                  width={150}
                  height={300}
                ></Image>
              ) : (
                'Gloves'
              )}
            </div>
            <div
              onClick={() => handleSetItemCategory('boots', 'Boots')}
              className="boots absolute top-[65%] left-[64%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]"
            >
              {buildItems['boots']?.imageUrl ? (
                <Image
                  src={WIKI_DOMAIN + buildItems['boots']?.imageUrl}
                  className="w-[fit-content]"
                  alt=""
                  width={150}
                  height={300}
                ></Image>
              ) : (
                'Boots'
              )}
            </div>
            <div
              onClick={() => handleSetItemCategory('belt', 'Belt')}
              className="belt absolute top-[79%] left-[40%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[80px]"
            >
              {buildItems['belt']?.imageUrl ? (
                <Image
                  src={WIKI_DOMAIN + buildItems['belt']?.imageUrl}
                  className="w-[fit-content]"
                  alt=""
                  width={150}
                  height={300}
                ></Image>
              ) : (
                'Belt'
              )}
            </div>
            <div
              onClick={() => handleSetItemCategory('lifeFlask', 'Flask')}
              className="life-flask absolute top-[100%] left-[21%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[150px]"
            >
              {buildItems['lifeFlask']?.imageUrl ? (
                <Image
                  src={WIKI_DOMAIN + buildItems['lifeFlask']?.imageUrl}
                  className="w-[fit-content]"
                  alt=""
                  width={150}
                  height={300}
                ></Image>
              ) : (
                'Life Flask'
              )}
            </div>
            <div
              onClick={() => handleSetItemCategory('manaFlask', 'Flask')}
              className="mana-flask absolute top-[100%] left-[69%] flex items-center justify-center text-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[150px]"
            >
              {buildItems['manaFlask']?.imageUrl ? (
                <Image
                  src={WIKI_DOMAIN + buildItems['manaFlask']?.imageUrl}
                  className="w-[fit-content]"
                  alt=""
                  width={150}
                  height={300}
                ></Image>
              ) : (
                'Mana Flask'
              )}
            </div>
            <div
              onClick={() => handleSetItemCategory('charm', 'Charm')}
              className="charm absolute top-[105%] left-[36%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[210px] h-[70px]"
            >
              Charm
            </div>
          </div>
        </div>

        {itemCategory && (
          <div className="flex-1">
            <div>
              <HeaderOne>Add Item</HeaderOne>

              <HeaderThree>{itemCategory}</HeaderThree>
              <div>
                Base Item <br />
                <select name="stats" id="stats">
                  <option value="">Increased % Maximize Mana</option>
                  <option value="">Increased % Maximize Life</option>
                  {/* {itemOptions?.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.value}
                    </option>
                  ))} */}
                </select>
              </div>
              <div className="border border-customSecondary w-[100%] h-[1px] my-[20px]"></div>
              <div>
                <div>
                  state 1 <br />
                  <select name="stats" id="stats">
                    <option value="">Increased % Maximize Mana</option>
                    <option value="">Increased % Maximize Life</option>
                  </select>
                </div>
                <div>
                  state 2 <br />
                  <select name="stats" id="stats">
                    <option value="">Increased % Maximize Mana</option>
                    <option value="">Increased % Maximize Life</option>
                  </select>
                </div>
                <div>
                  state 3 <br />
                  <select name="stats" id="stats">
                    <option value="">Increased % Maximize Mana</option>
                    <option value="">Increased % Maximize Life</option>
                  </select>
                </div>
                <div>
                  state 4 <br />
                  <select name="stats" id="stats">
                    <option value="">Increased % Maximize Mana</option>
                    <option value="">Increased % Maximize Life</option>
                  </select>
                </div>
                <div>
                  state 5 <br />
                  <select name="stats" id="stats">
                    <option value="">Increased % Maximize Mana</option>
                    <option value="">Increased % Maximize Life</option>
                  </select>
                </div>
                <div>
                  state 6 <br />
                  <select name="stats" id="stats">
                    <option value="">Increased % Maximize Mana</option>
                    <option value="">Increased % Maximize Life</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="border border-customSecondary w-[100%] h-[1px] my-[20px]"></div>
            <div>
              Unique Item <br />
              <select name="unique" id="unique" onChange={handleSelectItem}>
                {itemOptions?.map((item: any) => (
                  <option key={item.key} value={item.key}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BuildEdit;
