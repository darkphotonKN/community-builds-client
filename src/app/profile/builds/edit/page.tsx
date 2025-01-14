import HeaderOne from '@/components/Layout/Text/HeaderOne';
import HeaderTwo from '@/components/Layout/Text/HeaderTwo';

function BuildEdit() {
  return (
    <div>
      <HeaderTwo>Build Editor</HeaderTwo>
      <div className="relative w-[700px] h-[500px] mt-[100px]">
        <div className="weapon absolute top-[0%] left-[0%] border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[300px]"></div>
        <div className="left-ring absolute top-[44%] left-[25%] border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]"></div>
        <div className="right-ring absolute top-[44%] left-[64%] border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]"></div>
        <div className="helmut absolute top-[-10%] left-[40%] border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]"></div>
        <div className="amulet absolute top-[-10%] left-[64%] border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[80px]"></div>
        <div className="body-armour absolute top-[25%] left-[40%] border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[250px]"></div>
        <div className="off-hand absolute top-[0%] right-[0%] border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[300px]"></div>
        <div className="gloves absolute top-[65%] left-[16%] border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]"></div>
        <div className="foots absolute top-[65%] left-[64%] border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[150px]"></div>
        <div className="belt absolute top-[79%] left-[40%] border cursor-pointer border-customSecondary rounded-lg w-[150px] h-[80px]"></div>
        <div className="life-flask absolute top-[100%] left-[21%] border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[150px]"></div>
        <div className="mana-flask absolute top-[100%] left-[69%] border cursor-pointer border-customSecondary rounded-lg w-[80px] h-[150px]"></div>
        <div className="charm absolute top-[105%] left-[36.5%] border cursor-pointer border-customSecondary rounded-lg w-[200px] h-[80px]"></div>
      </div>
    </div>
  );
}

export default BuildEdit;
