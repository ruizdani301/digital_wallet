import React from "react";
import { MdAccountBalanceWallet } from "react-icons/md";

const Wallet = ({ saldo }) => {
  return (
    <div className="bg-primario-c-400 w-96 border rounded-3xl h-80">
      <MdAccountBalanceWallet className="mx-auto my-8 w-14 h-14 text-primario-c-200"/>
      <div className="flex flex-col items-center">
        <div className="text-white text-lg">
          <p className="py-2">Tu saldo actual</p>
          <span className="text-2xl">$ {`${saldo?.toFixed(2)}`} USD</span>
        </div>
        <button
        type="button"
        className="text-primario-c-200 hover:text-white border-2 border-primario-c-200 hover:bg-primario-c-200 focus:ring-2 focus:ring-primario-c-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-primario-c-200 dark:text-primario-c-200 dark:hover:text-white dark:hover:bg-primario-c-200 dark:focus:ring-secondary-c-800 mt-12"
      >
        Recargar saldo
      </button>
      </div>
    </div>
  );
};

export default Wallet;
