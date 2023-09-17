import React from "react";

const ButtonOutline = ({ text = "Crear cuenta" }) => {
  return (
      <button
        type="button"
        className="text-secondary-c-500 hover:text-white border-2 border-secondary-c-500 hover:bg-secondary-c-500 focus:ring-2 focus:ring-secondary-c-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-secondary-c-500 dark:text-secondary-c-500 dark:hover:text-white dark:hover:bg-secondary-c-500 dark:focus:ring-secondary-c-800"
      >
        { text }
    </button>
  );
};

export default ButtonOutline;
