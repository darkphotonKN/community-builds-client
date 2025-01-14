'use client';
import HeaderOne from '@/components/Layout/Text/HeaderOne';
import HeaderTwo from '@/components/Layout/Text/HeaderTwo';
import { useState } from 'react';

function BuildEdit() {
  const [itemCategory, setItemCategory] = useState('');

  const handleSetItemCategory = (itemCategory: string) => {
    setItemCategory(itemCategory);
  };
  return (
    <div>
      <HeaderOne>Build Editor</HeaderOne>
      <div className="flex gap-[100px]">
        <div>
          <HeaderOne>Build Items</HeaderOne>
          <div className="relative w-[700px] h-[500px] mt-[100px]">
            <div
              onClick={() => handleSetItemCategory('Weapon')}
              className="weapon absolute top-[0%] left-[0%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[300px]"
            >
              Weapon
            </div>
            <div
              onClick={() => handleSetItemCategory('Left Ring')}
              className="left-ring absolute top-[44%] left-[25%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]"
            >
              L Ring
            </div>
            <div
              onClick={() => handleSetItemCategory('Right Ring')}
              className="right-ring absolute top-[44%] left-[64%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]"
            >
              R Ring
            </div>
            <div
              onClick={() => handleSetItemCategory('Helmut')}
              className="helmut absolute top-[-10%] left-[40%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]"
            >
              Helmut
            </div>
            <div
              onClick={() => handleSetItemCategory('Amulet')}
              className="amulet absolute top-[-10%] left-[64%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]"
            >
              Amulet
            </div>
            <div
              onClick={() => handleSetItemCategory('Body Armour')}
              className="body-armour absolute top-[25%] left-[40%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[250px]"
            >
              Body Armour
            </div>
            <div
              onClick={() => handleSetItemCategory('Off Hand')}
              className="off-hand absolute top-[0%] right-[0%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[300px]"
            >
              Off Hand
            </div>
            <div
              onClick={() => handleSetItemCategory('Gloves')}
              className="gloves absolute top-[65%] left-[16%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]"
            >
              Gloves
            </div>
            <div
              onClick={() => handleSetItemCategory('Foots')}
              className="foots absolute top-[65%] left-[64%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]"
            >
              Foots
            </div>
            <div
              onClick={() => handleSetItemCategory('Belt')}
              className="belt absolute top-[79%] left-[40%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[80px]"
            >
              Belt
            </div>
            <div
              onClick={() => handleSetItemCategory('Life Flask')}
              className="life-flask absolute top-[100%] left-[21%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[150px]"
            >
              Life Flask
            </div>
            <div
              onClick={() => handleSetItemCategory('Mana Flask')}
              className="mana-flask absolute top-[100%] left-[69%] flex items-center justify-center text-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[150px]"
            >
              Mana Flask
            </div>
            <div
              onClick={() => handleSetItemCategory('Charm')}
              className="charm absolute top-[105%] left-[36.5%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[200px] h-[80px]"
            >
              Charm
            </div>
          </div>
        </div>

        {itemCategory && (
          <div className="flex-1">
            <div>
              <HeaderOne>Add Item</HeaderOne>

              <HeaderTwo>{itemCategory}</HeaderTwo>
              <div>
                Base Item <br />
                <select name="stats" id="stats">
                  <option value="">Increased % Maximize Mana</option>
                  <option value="">Increased % Maximize Life</option>
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
              <select name="unique" id="unique">
                <option value="">unique 1</option>
                <option value="">unique 2</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BuildEdit;
