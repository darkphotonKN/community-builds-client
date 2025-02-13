'use client';
import Button from '@/components/Button';
import ItemInfoCard from '@/components/Card/ItemInfoCard';
import HeaderOne from '@/components/Layout/Text/HeaderOne';
import HeaderThree from '@/components/Layout/Text/HeaderThree';
import HeaderTwo from '@/components/Layout/Text/HeaderTwo';
import {
  getRequest,
  patchRequest,
  postRequest,
} from '@/lib/api/requestHelpers';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const WIKI_DOMAIN = 'https://www.poewiki.net';
function BuildEdit() {
  const [itemCategory, setItemCategory] = useState('');
  const [items, setItems] = useState([]);
  const [itemOptions, setItemOptions] = useState<
    { key: string; value: string }[]
  >([]);

  const [baseItems, setBaseItems] = useState([]);
  console.log('baseItems', baseItems);
  const [baseItemOptions, setBaseItemOptions] = useState<
    { key: string; value: string }[]
  >([]);
  console.log('baseItemOptions', baseItemOptions);

  const [itemMods, setItemMods] = useState([]);
  console.log('itemMods', itemMods);
  const [itemModOptions, setItemModOptions] = useState<
    { key: string; value: string }[]
  >([]);
  console.log('itemModOptions', itemModOptions);

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

  const [rareItems, setRareItem] = useState<{ [key: string]: any }>({});
  console.log('rareItems', rareItems);
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
    const targetItem = items.find(
      (item: any) => item.id === event.target.value
    );
    setBuildItems((prev) => ({
      ...prev,
      [itemCategory]: targetItem,
    }));
  };

  const handleCreateBuildSet = async () => {
    console.log('handleCreateBuildSet buildItems', buildItems);
    try {
      const res = await patchRequest<any>(
        '/build/96a39db4-2dc6-4291-8f11-8a81f66c4fca/update-set',
        {
          weapon: buildItems.weapon.id,
          shield: buildItems.offHand.id,
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
      console.log('res', res);
    } catch (error) {
      console.log('err', error);
    }
  };
  console.log('buildItems', buildItems);

  const handleRareItem = (event: any) => {
    // event.target.value
    const targetItem: any = baseItems.find(
      (item: any) => item.id === event.target.value
    );

    setRareItem((prev) => {
      return {
        ...prev,
        ...targetItem,
      };
    });
  };

  const handleSetRareItemMod = (event: any, index: number) => {
    // event.target.value
    const targetItem: any = itemMods.find(
      (item: any) => item.id === event.target.value
    );

    setRareItem((prev) => {
      let newStats: string[] = [];

      if (index !== null && targetItem) {
        if (prev.stats) {
          newStats = [...prev.stats];
        }
        newStats[index] = targetItem.stat;
      }

      return {
        ...prev,
        stats: newStats,
      };
    });
  };

  const handleCreateRareItem = async (toList: boolean) => {
    // setBuildItems(rareItems)
    console.log('rareItems', rareItems);
    const payload = {
      baseItemId: rareItems.id,
      states: rareItems.stats,
      ...(toList && { toList: true }),
    };
    const res = await postRequest<any>(`/item/rare-item`, payload, true);
    if (res?.statusCode === 200) {
      setBuildItems((prev) => ({
        ...prev,
        [itemCategory]: { ...rareItems, id: res.result },
      }));
    }
  };

  useEffect(() => {
    const getBaseItems = async () => {
      const res = await getRequest<any>(`/item/base-items`, null, {
        auth: true,
      });
      if (res?.statusCode === 200) {
        const options = res.result.map((item: any) => ({
          key: item.id,
          value: item.name,
        }));
        setBaseItems(res.result);
        setBaseItemOptions(options);
      }
    };

    const getItemMods = async () => {
      const res = await getRequest<any>(`/item/item-mods`, null, {
        auth: true,
      });
      if (res?.statusCode === 200) {
        const options = res.result.map((item: any) => ({
          key: item.id,
          value: item.stat,
        }));
        setItemMods(res.result);
        setItemModOptions(options);
      }
    };

    getBaseItems();
    getItemMods();
  }, []);

  return (
    <div>
      <div className="h-[850px]">
        <HeaderOne>Build Editor</HeaderOne>
        <div className="flex gap-[100px]">
          <div>
            <HeaderOne>Build Items</HeaderOne>
            <div className="relative w-[700px] h-[500px] mt-[100px]">
              <div
                onClick={() => handleSetItemCategory('weapon', 'weapon')}
                className="weapon group absolute top-[0%] left-[0%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[300px]"
              >
                {buildItems['weapon']?.imageUrl ? (
                  <Image
                    src={buildItems['weapon']?.imageUrl}
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
                onClick={() => handleSetItemCategory('leftRing', 'rings')}
                className="left-ring group absolute top-[44%] left-[25%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]"
              >
                {buildItems['leftRing']?.imageUrl ? (
                  <Image
                    src={buildItems['leftRing']?.imageUrl}
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
                onClick={() => handleSetItemCategory('rightRing', 'rings')}
                className="right-ring group absolute top-[44%] left-[64%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]"
              >
                {buildItems['rightRing']?.imageUrl ? (
                  <Image
                    src={buildItems['rightRing']?.imageUrl}
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
                onClick={() => handleSetItemCategory('helmet', 'helmet')}
                className="helmet group absolute top-[-10%] left-[40%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]"
              >
                {buildItems['helmet']?.imageUrl ? (
                  <Image
                    src={buildItems['helmet']?.imageUrl}
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
                onClick={() => handleSetItemCategory('amulet', 'amulet')}
                className="amulet group absolute top-[-10%] left-[64%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]"
              >
                {buildItems['amulet']?.imageUrl ? (
                  <Image
                    src={buildItems['amulet']?.imageUrl}
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
                  handleSetItemCategory('bodyArmour', 'body Armour')
                }
                className="body-armour group absolute top-[25%] left-[40%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[250px]"
              >
                {buildItems['bodyArmour']?.imageUrl ? (
                  <Image
                    src={buildItems['bodyArmour']?.imageUrl}
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
                onClick={() => handleSetItemCategory('offHand', 'shield')}
                className="off-hand group absolute top-[0%] right-[0%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[300px]"
              >
                {buildItems['offHand']?.imageUrl ? (
                  <Image
                    src={buildItems['offHand']?.imageUrl}
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
                onClick={() => handleSetItemCategory('gloves', 'gloves')}
                className="gloves group absolute top-[65%] left-[16%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]"
              >
                {buildItems['gloves']?.imageUrl ? (
                  <Image
                    src={buildItems['gloves']?.imageUrl}
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
                onClick={() => handleSetItemCategory('boots', 'boots')}
                className="boots group absolute top-[65%] left-[64%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]"
              >
                {buildItems['boots']?.imageUrl ? (
                  <Image
                    src={buildItems['boots']?.imageUrl}
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
                onClick={() => handleSetItemCategory('belt', 'belt')}
                className="belt group absolute top-[79%] left-[40%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[80px]"
              >
                {buildItems['belt']?.imageUrl ? (
                  <Image
                    src={buildItems['belt']?.imageUrl}
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
                onClick={() => handleSetItemCategory('lifeFlask', 'flask')}
                className="life-flask group absolute top-[100%] left-[21%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[150px]"
              >
                {buildItems['lifeFlask']?.imageUrl ? (
                  <Image
                    src={buildItems['lifeFlask']?.imageUrl}
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
                onClick={() => handleSetItemCategory('manaFlask', 'flask')}
                className="mana-flask group absolute top-[100%] left-[69%] flex items-center justify-center text-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[150px]"
              >
                {buildItems['manaFlask']?.imageUrl ? (
                  <Image
                    src={buildItems['manaFlask']?.imageUrl}
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
                onClick={() => handleSetItemCategory('charm', 'charm')}
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
                  <select
                    name="stats"
                    id="stats"
                    onChange={(e) => handleRareItem(e)}
                  >
                    {baseItemOptions?.map((item: any) => (
                      <option key={item.key} value={item.key}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="border border-customSecondary w-[100%] h-[1px] my-[20px]"></div>
                <div>
                  <div>
                    state 1 <br />
                    <select
                      name="stats"
                      id="stats"
                      onChange={(e) => handleSetRareItemMod(e, 0)}
                    >
                      {itemModOptions?.map((item: any) => (
                        <option key={item.key} value={item.key}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    state 2 <br />
                    <select
                      name="stats"
                      id="stats"
                      onChange={(e) => handleSetRareItemMod(e, 1)}
                    >
                      {itemModOptions?.map((item: any) => (
                        <option key={item.key} value={item.key}>
                          {item.value}
                        </option>
                      ))}
                      <option value="">Increased % Maximize Life</option>
                    </select>
                  </div>
                  <div>
                    state 3 <br />
                    <select
                      name="stats"
                      id="stats"
                      onChange={(e) => handleSetRareItemMod(e, 2)}
                    >
                      {itemModOptions?.map((item: any) => (
                        <option key={item.key} value={item.key}>
                          {item.value}
                        </option>
                      ))}
                      <option value="">Increased % Maximize Life</option>
                    </select>
                  </div>
                  <div>
                    state 4 <br />
                    <select
                      name="stats"
                      id="stats"
                      onChange={(e) => handleSetRareItemMod(e, 3)}
                    >
                      {itemModOptions?.map((item: any) => (
                        <option key={item.key} value={item.key}>
                          {item.value}
                        </option>
                      ))}
                      <option value="">Increased % Maximize Life</option>
                    </select>
                  </div>
                  <div>
                    state 5 <br />
                    <select
                      name="stats"
                      id="stats"
                      onChange={(e) => handleSetRareItemMod(e, 4)}
                    >
                      {itemModOptions?.map((item: any) => (
                        <option key={item.key} value={item.key}>
                          {item.value}
                        </option>
                      ))}
                      <option value="">Increased % Maximize Life</option>
                    </select>
                  </div>
                  <div>
                    state 6 <br />
                    <select
                      name="stats"
                      id="stats"
                      onChange={(e) => handleSetRareItemMod(e, 5)}
                    >
                      {itemModOptions?.map((item: any) => (
                        <option key={item.key} value={item.key}>
                          {item.value}
                        </option>
                      ))}
                      <option value="">Increased % Maximize Life</option>
                    </select>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={() => handleCreateRareItem(false)}
                      width={200}
                      text="Create Rare Item"
                    />
                    <Button
                      onClick={() => handleCreateRareItem(true)}
                      width={200}
                      text="Create Rare Item To List"
                    />
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
