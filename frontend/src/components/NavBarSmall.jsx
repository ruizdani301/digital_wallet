/* eslint-disable import/no-absolute-path */
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import brandImage from "/assets/icon-digital-wallet.png";

export default function NavbarWithDropdown () {
  return (
    <Navbar fluid rounded className='md:hidden'>
      <Navbar.Brand href="#">
        <img
          alt="Flowbite React Logo"
          className="mr-3 h-9"
          src={brandImage}
        />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          inline
          label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded/>}
        >
          <Dropdown.Header>
            <span className="block text-sm">
              Bonnie Green
            </span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
            <Dropdown.Item> Perfil</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item> Log out </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          color={"secondary-c"}
          href="#"
        >
          <p>
            Home
          </p>
        </Navbar.Link>
        <Navbar.Link href="#">
          About
        </Navbar.Link>
        <Navbar.Link href="#">
          Services
        </Navbar.Link>
        <Navbar.Link href="#">
          Pricing
        </Navbar.Link>
        <Navbar.Link href="#">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
