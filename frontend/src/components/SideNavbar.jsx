/* eslint-disable import/no-absolute-path */
import { Avatar, Sidebar } from 'flowbite-react';
import { HiUser, HiOutlineLogout } from 'react-icons/hi';
import { MdAccountBalanceWallet } from "react-icons/md";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { IoLogoUsd } from "react-icons/io";
import { AiFillLock } from "react-icons/ai";

// @images
import LogoWallet from "/assets/icon-digital-wallet.png";
import User1 from "/assets/avatar-example.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import { PROD, SERVER_LOCAL, SERVER_PROD } from '../utils/constants';

const SideNavbar = () => {
  const itemName = window.location.pathname;
  const { currentUser } = useAuth();

  return (
    <Sidebar className="w-80">
      <Sidebar.Logo
        href="#"
        img={LogoWallet}
        className="py-8"
        imgAlt="Digital wallet logo"
      >
      </Sidebar.Logo>
      <Sidebar.Items className="px-4">
        <Sidebar.ItemGroup className="flex flex-col h-[80vh] justify-between">
          <li className="flex flex-col gap-y-2">
            <li className="flex">
              <Link
                to="/"
                className={`nav-item ${itemName === "/" ? "text-secondary-c-500" : "text-gray-900"}`}
              >
              <MdAccountBalanceWallet
                className={`nav-icon-item ${itemName === "/" ? "text-secondary-c-500" : "text-gray-500"}`}
              />
                Mi Billetera
              </Link>
            </li>
            <li className="flex">
              <Link
                to="/reports"
                className={`nav-item ${itemName === "/reports" ? "text-secondary-c-500" : "text-gray-900"}`}
              >
              <BsFileEarmarkTextFill
                className={`nav-icon-item ${itemName === "/reports" ? "text-secondary-c-500" : "text-gray-500"}`}
              />
                Reportes
              </Link>
            </li>
            <li className="flex">
              <a
                href={`${PROD ? SERVER_PROD : SERVER_LOCAL}/corresponsalbancario/`}
                target="_blank"
                rel="noopener noreferrer"
                className={`nav-item ${itemName === "/charge_balance" ? "text-secondary-c-500" : "text-gray-900"}`}
              >
              <IoLogoUsd
                className={`nav-icon-item ${itemName === "/charge_balance" ? "text-secondary-c-500" : "text-gray-500"}`}
              />
                Recarga de fondos
              </a>
            </li>
            <li className="flex">
              <Link
                to="/security"
                className={`nav-item ${itemName === "/security" ? "text-secondary-c-500" : "text-gray-900"}`}
              >
              <AiFillLock
                className={`nav-icon-item ${itemName === "/security" ? "text-secondary-c-500" : "text-gray-500"}`}
              />
                Seguridad
              </Link>
            </li>
            <li className="flex">
              <Link
                to="/profile"
                className={`nav-item ${itemName === "/profile" ? "text-secondary-c-500" : "text-gray-900"}`}
              >
              <HiUser
                className={`nav-icon-item ${itemName === "/profile" ? "text-secondary-c-500" : "text-gray-500"}`}
              />
                Perfil
              </Link>
            </li>
            <li className="flex">
              <Link to="/logout" className="nav-item text-gray-900">
                <HiOutlineLogout className={`nav-icon-item ${itemName === "/logout" ? "text-secondary-c-500" : "text-gray-500"}`} />
                Salir
              </Link>
            </li>
          </li>
          <li>
            <div className="flex flex-wrap gap-2">
              <Avatar img={currentUser?.avatar || User1} rounded />
              <div>
                <h1 className="font-bold mt-2">
                  {`${currentUser?.user?.name}`}
                </h1>
                <p className="text-gray-700 text-sm">id: {currentUser?.user?.uuid_user.split("-")[0]}</p>
              </div>
            </div>
          </li>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideNavbar;
