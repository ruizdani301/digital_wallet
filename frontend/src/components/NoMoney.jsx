import { RiEmotionUnhappyLine } from "react-icons/ri";

const NoMoney = () => {
  return (
      <div className="h-full flex flex-col items-center text-terciary-c">
          <RiEmotionUnhappyLine className="w-16 h-16"/>
          <div className=" text-center my-8">
            <h1>¡Uppsss!</h1>
            <p>No cuentas con saldo disponible</p>
          </div>
      </div>
  );
};

export default NoMoney;
