import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { client } from "../utils/constants";

const FormWithdraw = ({ saldo }) => {
  const [formWithdraw, setFormWithdraw] = useState({});
  const [error, setError] = useState(false);
  const [code, setCode] = useState({
    success: false
  });

  const handleChange = (name, value) => {
    setFormWithdraw({
      ...formWithdraw,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    setError(false);
    e.preventDefault();
    client.post(
      "/api/v1/retiro/",
      {
        identification_number: formWithdraw?.cedula,
        value: +formWithdraw?.cantity
      }
    ).then(res => {
      setCode({
        ...code,
        ...res?.data,
        success: true
      });
    }).catch(({ response }) => {
      if (response.status === 404) {
        setError(true);
        setCode({
          ...code,
          success: false
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label
              htmlFor="cantity"
              value="Cantidad"
            />
          </div>
          <input
            id="cantity"
            name="cantity"
            placeholder="0.00 USD"
            required
            step=".01"
            min={0}
            className="w-full rounded-lg text-sm p-2.5"
            max={saldo}
            type="number"
            onChange={(e) => handleChange("cantity", e.target.value)}
          />
        </div>
        <legend className="text-md font-medium mb-4">
          Datos
        </legend>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label
              htmlFor="cedula"
              value="Número de cédula"
            />
          </div>
          <TextInput
            id="cedula"
            name="cedula"
            placeholder="1241597554"
            required
            min={0}
            type="text"
            color={"secondary-c"}
            onChange={(e) => handleChange("cedula", e.target.value)}
          />
          {error && <p className="text-sm text-red-400">Número de cédula incorrecto.</p>}
        </div>
      </fieldset>
      {code?.success && (
        <div className="bg-gray-100 text-center py-4 rounded-3xl my-8">
          <h1 className="mb-3">Solicitud de retiro exitosa.</h1>
          <p className="text-sm text-gray-400 my-4">
            usa este código para retirar en cualquiera de nuestros aliados.
          </p>
          <p className="py-2 my-4 bg-slate-200 w-32 mx-auto">{ code?.code_validation }</p>
        </div>
      )}
      <div className="mb-4 flex justify-center">
        <Button
          type="submit"
          disabled={!formWithdraw?.cantity || !formWithdraw?.cedula}
          className="bg-secondary-c-500 enabled:hover:bg-secondary-c focus:ring-secondary-c-200 dark:bg-secondary-c-500 dark:enabled:hover:bg-secondary-c-500 dark:focus:ring-secondary-c-200 rounded-lg focus:ring-2"
        >
          Solicitar retiro
        </Button>
      </div>
    </form>
  );
};

export default FormWithdraw;
