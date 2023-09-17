import { useState } from 'react';
import NoMoney from './NoMoney';
import FormCommitPays from './FormCommitPays';
import FormWithdraw from "./FormWithdraw";

const PillsTabs = ({ saldo }) => {
  const [active, setActive] = useState(0);

  const Items = [
    {
      label: 'Realizar pagos',
      id: "pago"
    },
    {
      label: 'Retirar dinero',
      id: "dinero"
    }
  ];

  const formLayout = {
    0: <FormCommitPays saldo={saldo}/>,
    1: <FormWithdraw saldo={saldo}/>
  };

  return (
    <>
      <div className='flex justify-between'>
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {Items.map((item, idx) => (
          <li className="mr-2" key={idx} onClick={() => setActive(idx)}>
            <button
              className={`inline-block p-4 rounded-lg ${idx === active ? "active" : "hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"}`}
              id={item.id}
              type="button"
              role="tab"
              aria-controls="profile-example"
              aria-selected="false"
              data-tabs-target="#pago"
            >
              {item.label}
            </button>
          </li>
        ))}
        </ul>
      </div>
      <div>
        {Items.map((item, idx) => (
          <div
            key={idx}
            className={`mt-2 p-4 rounded-lg ${idx !== active && "hidden"}`}
            id={item.id}
            role="tabpanel"
          >
            {saldo > 0
              ? formLayout[active]
              : <NoMoney/>
            }
          </div>
        ))}
      </div>
    </>
  );
};

export default PillsTabs;
