import React from "react";
import FormRegister from "../components/FormRegister";

const Register = () => {
  return (
    <section className="dark:bg-gray-900">
      <div className="h-full w-full flex flex-col px-6 py-8 mx-auto md:h-screen lg:py-0 items-center justify-center">
        <FormRegister />
      </div>
    </section>
  );
};

export default Register;
