import { Table } from "flowbite-react";
import Welcome from "./Welcome";
import { HiUser } from "react-icons/hi";
import { BsFileEarmarkTextFill, BsArrowUpRight } from "react-icons/bs";
import { useAuth } from "../context/auth";
import { useEffect, useState } from "react";
import { client } from "../utils/constants";

const ReportsLayout = () => {
  const { currentUser } = useAuth();
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    client.get(`api/v1/reporte/${currentUser?.user?.id}`)
      .then(res => {
        if (res.status === 200) {
          setHistorial(res?.data);
        }
      });
  }, []);

  return (
    <div>
      <Welcome />
      <div className="py-8">
        <h1 className="text-3xl font-semibold">Reportes</h1>
        <p className="text-xl py-2">Conoce paso a paso las transacciones que realizas</p>
      </div>
      <Table striped className="mt-5">
      <Table.Head>
        <Table.HeadCell className="py-5 text-white text-sm bg-primario-c-500">
          Categoría
        </Table.HeadCell>
        <Table.HeadCell className="py-5 text-white text-sm bg-primario-c-500">
          Fecha
        </Table.HeadCell>
        <Table.HeadCell className="py-5 text-white text-sm bg-primario-c-500">
          cantidad
        </Table.HeadCell>
        <Table.HeadCell className="py-5 text-white text-sm bg-primario-c-500">
          <span className="sr-only">
            Edit
          </span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {historial.filter((_, idx) => idx <= 4).sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date)).map((item, idx) => {
          const date = new Date(item?.transaction_date);
          const dateString = date.toLocaleDateString();
          return (
            <Table.Row key={idx} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap text-lg font-bold">
              <div className="flex">
                {item?.categoria === "pago_persona"
                  ? <HiUser className="mx-2 my-1 text-gray-900 dark:text-white"/>
                  : <BsFileEarmarkTextFill className="mx-2 my-1 text-gray-900 dark:text-white"/>
                }
                <span>
                  <p className="text-gray-900 dark:text-white">
                    {item?.reference_name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {item?.transaction_type}
                  </p>
                </span>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap text-lg font-bold">
              <p className="text-gray-900 dark:text-white">
                {dateString}
              </p>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap text-lg font-bold">
              <p className="text-gray-900 dark:text-white">
                {`${item?.amount} USD`}
              </p>
            </Table.Cell>
            <Table.Cell>
              <a
                className="font-bold text-lg text-terciary-c hover:underline dark:text-terciary-c"
                href="#"
              >
                <p>
                  <BsArrowUpRight/>
                </p>
              </a>
            </Table.Cell>
          </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
    </div>
  );
};

export default ReportsLayout;
