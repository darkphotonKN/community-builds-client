import HeaderOne from '@/components/Layout/Text/HeaderOne';
import HeaderTwo from '@/components/Layout/Text/HeaderTwo';

function BuildEdit() {
  return (
    <div>
      <HeaderTwo>Build Editor</HeaderTwo>
      <div className="flex gap-[100px]">
        <div>
          <HeaderTwo>Build Items</HeaderTwo>
          <div className="relative w-[700px] h-[500px] mt-[100px]">
            <div className="weapon absolute top-[0%] left-[0%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[300px]">
              Weapon
            </div>
            <div className="left-ring absolute top-[44%] left-[25%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]">
              L Ring
            </div>
            <div className="right-ring absolute top-[44%] left-[64%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]">
              R Ring
            </div>
            <div className="helmut absolute top-[-10%] left-[40%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]">
              Helmut
            </div>
            <div className="amulet absolute top-[-10%] left-[64%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]">
              Amulet
            </div>
            <div className="body-armour absolute top-[25%] left-[40%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[250px]">
              Body Armour
            </div>
            <div className="off-hand absolute top-[0%] right-[0%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[300px]">
              Off Hand
            </div>
            <div className="gloves absolute top-[65%] left-[16%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]">
              Gloves
            </div>
            <div className="foots absolute top-[65%] left-[64%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]">
              Foots
            </div>
            <div className="belt absolute top-[79%] left-[40%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[80px]">
              Belt
            </div>
            <div className="life-flask absolute top-[100%] left-[21%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[150px]">
              Life Flask
            </div>
            <div className="mana-flask absolute top-[100%] left-[69%] flex items-center justify-center text-center border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[150px]">
              Mana Flask
            </div>
            <div className="charm absolute top-[105%] left-[36.5%] flex items-center justify-center border cursor-pointer border-customSecondary rounded-lg w-[200px] h-[80px]">
              Charm
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div>
            <HeaderTwo>Add Item</HeaderTwo>
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
      </div>
    </div>
  );
}

export default BuildEdit;
