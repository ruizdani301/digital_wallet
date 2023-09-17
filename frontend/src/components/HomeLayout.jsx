import { useEffect, useState } from "react";
import PillsTabs from "./PillTabs";
import Wallet from "./Wallet";
import Welcome from "./Welcome";
import { client } from "../utils/constants";
import { useAuth } from "../context/auth";

const HomeLayout = () => {
  const { currentUser } = useAuth();
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    client.get(`/api/v1/saldo/${currentUser?.user?.id}`)
      .then(res => {
        if (res.status === 200) {
          setSaldo(+res?.data?.balance);
        }
      });
  }, [currentUser]);

  return (
    <div>
      <Welcome />
      <div className="py-8">
        <h1 className="text-3xl font-semibold">Mi Billetera</h1>
      </div>
      <div className="flex">
        <Wallet saldo={saldo}/>
        <div className="mx-4 flex-1 p-4 max-w-lg border rounded-3xl border-collapse">
          <PillsTabs saldo={saldo}/>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
