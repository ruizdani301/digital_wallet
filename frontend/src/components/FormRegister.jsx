import { Alert, Button, Label, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import countriesCode from "../data/code_country.json";

// @constants
import { client } from "../utils/constants";

const FormRegister = () => {
  const [createUser, setCreateUser] = useState({
    indentification_type: "cedula",
    country_code: 57
  });
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [passwordNoMatch, setPasswordNoMatch] = useState(false);
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setCreateUser({
      ...createUser,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordNoMatch(false);
    setProcessing(true);
    console.log(createUser);
    if (createUser?.password !== createUser?.password_confirmation) {
      setPasswordNoMatch(true);
      return;
    }

    client.post(
      "/register",
      {
        password: createUser.password,
        name: `${createUser.first_name} ${createUser.last_name}`,
        email: createUser.email,
        identification_number: createUser.indentification_number,
        phone_number: createUser.phone_number,
        country_code: createUser.country_code,
        identification_type: createUser.indentification_type
      }
    ).then(res => {
      setUserCreated(true);
      console.log(res.statusText);
      setTimeout(() => {
        return navigate("/login");
      }, 2000);
    }).catch(err => {
      setError(true);
      console.log(err);
    });
    setProcessing(false);
  };

  return (
    <div className="w-full bg-blanco-c rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl mb-8 font-bold text-center leading-tight tracking-tight text-primario-c-500 md:text-2xl dark:text-white">
          Crear cuenta
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div className="flex">
            <div className="mb-1 mr-3 flex-1">
              <Label htmlFor="first_name" value="Nombre" />
              <TextInput
                id="first_name"
                placeholder="John"
                type="text"
                color={"secondary-c"}
                onChange={(e) => handleChange("first_name", e.target.value)}
              />
            </div>
            <div className="mb-1 flex-1">
              <Label htmlFor="last_name" value="Apellido" />
              <TextInput
                id="last_name"
                placeholder="Doe"
                type="text"
                color={"secondary-c"}
                onChange={(e) => handleChange("last_name", e.target.value)}
              />
            </div>
          </div>
          <div className="flex">
            <div className="mb-2 mr-3 flex-1">
              <Label htmlFor="code_country_phone" value="Código de países" />
              <Select
                id="code_country_phone"
                required
                name="code_country_phone"
                color="secondary-c"
                onChange={(e) => handleChange("country_code", e.target.value)}
              >
                {countriesCode.map(({ country, code }) => (
                  <option value={code} key={code} selected={code === 57}>
                    {`(+${code}) ${country}`}
                  </option>
                ))}
              </Select>
            </div>
            <div className="mb-2 flex-1">
              <Label htmlFor="phone_number" value="Número de celular" />
              <TextInput
                id="phone_number"
                placeholder="3126977415"
                color="secondary-c"
                type="number"
                onChange={(e) => handleChange("phone_number", e.target.value)}
              />
            </div>
          </div>
          <div className="flex">
            <div className="mb-2 mr-3 flex-1">
              <Label htmlFor="indentification_type" value="Tipo de documento" />
              <Select
                id="indentification_type"
                color="secondary-c"
                onChange={(e) =>
                  handleChange("indentification_type", e.target.value)
                }
              >
                <option value="cedula">Cédula</option>
                <option value="pasaporte">Pasaporte</option>
                <option value="identidad">Identidad</option>
              </Select>
            </div>
            <div className="mb-2 flex-1">
              <Label htmlFor="id" value="Número de identificación" />
              <TextInput
                id="id"
                placeholder="1020497722"
                color="secondary-c"
                type="number"
                onChange={(e) =>
                  handleChange("indentification_number", e.target.value)
                }
              />
            </div>
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="email" value="E-mail *" />
            </div>
            <TextInput
              id="email"
              placeholder="rosa@digitalwallet.com"
              required
              type="email"
              color={"secondary-c"}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="password" value="Contraseña *" />
            </div>
            <TextInput
              id="password"
              placeholder="***********"
              required
              type="password"
              color={"secondary-c"}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
          <div>
            <div className="mb-1 block">
              <Label
                htmlFor="password_confirm"
                value="Confirmación de contraseña *"
              />
            </div>
            <TextInput
              id="password_confirm"
              placeholder="***********"
              required
              type="password"
              color={"secondary-c"}
              onChange={(e) =>
                handleChange("password_confirmation", e.target.value)
              }
            />
          </div>
          <Button
            type="submit"
            className="bg-secondary-c-500 enabled:hover:bg-secondary-c focus:ring-secondary-c-200 dark:bg-secondary-c-500 dark:enabled:hover:bg-secondary-c-500 dark:focus:ring-secondary-c-200 rounded-lg focus:ring-2"
            fullSized
          >
            {processing ? "Creando usuario..." : "Crear"}
          </Button>
          {error && (
            <Alert color="failure" icon={HiInformationCircle}>
              <span>
                <p>Algo salió mal!, por favor intente de nuevo.</p>
              </span>
            </Alert>
          )}
          {userCreated && (
            <Alert color="success">
              <span>
                <p>Usuario creado con éxito</p>
              </span>
            </Alert>
          )}
          {passwordNoMatch && (
            <Alert color="failure" icon={HiInformationCircle}>
            <span>
              <p>Contraseñas no coinciden.</p>
            </span>
          </Alert>
          )}
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Ya tiene una cuenta?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default FormRegister;
