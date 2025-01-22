'use client';
import Button from '@/components/Button';
import ItemInfoCard from '@/components/Card/ItemInfoCard';
import HeaderOne from '@/components/Layout/Text/HeaderOne';
import HeaderThree from '@/components/Layout/Text/HeaderThree';
import HeaderTwo from '@/components/Layout/Text/HeaderTwo';
import { getRequest, postRequest } from '@/lib/api/requestHelpers';
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

  const handleCreateBuildSet = async () => {
    try {
      const res = await postRequest<any>(
        'http://localhost:5050/api/build/4f34c91b-8433-4eab-a1a5-bd3384ea24ca/updateSet',
        {
          weapon: buildItems.weapon.id,
          shield: buildItems.offhand.id,
          helmet: buildItems.helmet.id,
          bodyArmour: buildItems.bodyArmour.id,
          gloves: buildItems.gloves.id,
          belt: buildItems.belt.id,
          boots: buildItems.boots.id,
          amulet: buildItems.amulet.id,
          leftRing: buildItems.leftRing.id,
          rightRing: buildItems.rightRing.id,
        },
        true
      );
    } catch (error) {}
  };
  console.log('buildItems', buildItems);
  return (
    <div>
      <div className="h-[850px]">
        <HeaderOne>Build Editor</HeaderOne>
        <div className="flex gap-[100px]">
          <div>
            <HeaderOne>Build Items</HeaderOne>
            <div className="relative w-[700px] h-[500px] mt-[100px]">
              <div
                onClick={() => handleSetItemCategory('weapon', 'Weapon')}
                className="weapon group absolute top-[0%] left-[0%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[300px]"
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
                {buildItems['weapon']?.imageUrl && (
                  <ItemInfoCard data={buildItems['weapon']} />
                )}
              </div>
              <div
                onClick={() => handleSetItemCategory('leftRing', 'Rings')}
                className="left-ring group absolute top-[44%] left-[25%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]"
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
                {buildItems['leftRing']?.imageUrl && (
                  <ItemInfoCard data={buildItems['leftRing']} />
                )}
              </div>
              <div
                onClick={() => handleSetItemCategory('rightRing', 'Rings')}
                className="right-ring group absolute top-[44%] left-[64%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]"
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
                {buildItems['rightRing']?.imageUrl && (
                  <ItemInfoCard data={buildItems['rightRing']} />
                )}
              </div>
              <div
                onClick={() => handleSetItemCategory('helmet', 'Helmet')}
                className="helmet group absolute top-[-10%] left-[40%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]"
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
                {buildItems['helmet']?.imageUrl && (
                  <ItemInfoCard data={buildItems['helmet']} />
                )}
              </div>
              <div
                onClick={() => handleSetItemCategory('amulet', 'Amulet')}
                className="amulet group absolute top-[-10%] left-[64%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]"
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
                {buildItems['amulet']?.imageUrl && (
                  <ItemInfoCard data={buildItems['amulet']} />
                )}
              </div>
              <div
                onClick={() =>
                  handleSetItemCategory('bodyArmour', 'Body Armour')
                }
                className="body-armour group absolute top-[25%] left-[40%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[250px]"
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
                {buildItems['bodyArmour']?.imageUrl && (
                  <ItemInfoCard data={buildItems['bodyArmour']} />
                )}
              </div>
              <div
                onClick={() => handleSetItemCategory('offHand', 'Shield')}
                className="off-hand group absolute top-[0%] right-[0%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[300px]"
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
                {buildItems['offHand']?.imageUrl && (
                  <ItemInfoCard data={buildItems['offHand']} />
                )}
              </div>
              <div
                onClick={() => handleSetItemCategory('gloves', 'Gloves')}
                className="gloves group absolute top-[65%] left-[16%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]"
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
                {buildItems['gloves']?.imageUrl && (
                  <ItemInfoCard data={buildItems['gloves']} />
                )}
              </div>
              <div
                onClick={() => handleSetItemCategory('boots', 'Boots')}
                className="boots group absolute top-[65%] left-[64%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]"
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
                {buildItems['boots']?.imageUrl && (
                  <ItemInfoCard data={buildItems['boots']} />
                )}
              </div>
              <div
                onClick={() => handleSetItemCategory('belt', 'Belt')}
                className="belt group absolute top-[79%] left-[40%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[80px]"
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
                {buildItems['belt']?.imageUrl && (
                  <ItemInfoCard data={buildItems['belt']} />
                )}
              </div>
              <div
                onClick={() => handleSetItemCategory('lifeFlask', 'Flask')}
                className="life-flask group absolute top-[100%] left-[21%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[150px]"
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
                {buildItems['lifeFlask']?.imageUrl && (
                  <ItemInfoCard data={buildItems['lifeFlask']} />
                )}
              </div>
              <div
                onClick={() => handleSetItemCategory('manaFlask', 'Flask')}
                className="mana-flask group absolute top-[100%] left-[69%] flex items-center justify-center text-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[150px]"
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
                {buildItems['manaFlask']?.imageUrl && (
                  <ItemInfoCard data={buildItems['manaFlask']} />
                )}
              </div>
              <div
                onClick={() => handleSetItemCategory('charm', 'Charm')}
                className="charm group absolute top-[105%] left-[36%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[210px] h-[70px]"
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
      <div className="flex justify-center">
        <Button
          onClick={handleCreateBuildSet}
          width={200}
          text="Create item Set"
        />
      </div>
    </div>
  );
}

export default BuildEdit;
