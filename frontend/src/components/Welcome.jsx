/* eslint-disable import/no-absolute-path */
import ReportImage from "/assets/reports-img.png";

const Welcome = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between bg-terciary-c w-full h-full border rounded-3xl">
      <div className="p-8">
        <h1 className="text-3xl font-semibold uppercase">Bienvenido a digitalwallet</h1>
        <p className="text-xl py-4">Tu Billetera en Línea preferida, gestiona tus transacciones financieras de manera segura</p>
      </div>
      <img src={ReportImage} className="mx-8" alt="report layout image" />
    </div>
  );
};

export default Welcome;
