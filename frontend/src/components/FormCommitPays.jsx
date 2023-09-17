import { Alert, Button, Label, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import { client } from "../utils/constants";
import { useAuth } from "../context/auth";
import { HiInformationCircle } from "react-icons/hi";

const FormCommitPays = ({ saldo }) => {
  const [formPay, setFormPay] = useState();
  const [info, setInfo] = useState({
    success: false,
    processing: false,
    error: false
  });
  const { currentUser } = useAuth();

  const handleChange = (name, value) => {
    setFormPay({
      ...formPay,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    setInfo({ ...info, processing: true });
    e.preventDefault();
    client.post("/api/v1/pago/",
      {
        amount: +formPay?.cantity,
        details: formPay?.details,
        transaction_type: formPay?.pay_type,
        reference: formPay?.referencia,
        reference_name: formPay?.referencia_name,
        user: currentUser?.user?.id
      }
    )
      .then(res => setInfo({
        ...info,
        success: true,
        processing: false,
        error: false
      }))
      .catch(_ => setInfo({
        ...info,
        success: false,
        processing: false,
        error: true
      }));
    setInfo({ ...info, processing: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="flex max-w-md gap-4">
        <legend className="text-md font-medium mb-4">
          Categoria
        </legend>
        <div className="flex items-center mb-4">
          <input
            id="persona"
            type="radio"
            name="pay_type"
            value="persona"
            required
            className="w-4 h-4 border-gray-300 focus:ring-2 checked:bg-terciary-c focus:ring-terciary-c dark:bg-gray-700 dark:checked:bg-terciary-c dark:border-gray-600"
            onChange={(e) => handleChange("pay_type", e.target.value)}
          />
          <label htmlFor="persona" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Persona
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input
            id="factura"
            type="radio"
            name="pay_type"
            value="factura"
            required
            className="w-4 h-4 border-gray-300 focus:ring-2 checked:bg-terciary-c focus:ring-terciary-c dark:bg-gray-700 dark:checked:bg-terciary-c dark:border-gray-600"
            onChange={(e) => handleChange("pay_type", e.target.value)}
          />
          <label htmlFor="factura" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Factura
          </label>
        </div>
      </fieldset>
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
            type="number"
            onChange={(e) => handleChange("cantity", e.target.value)}
            step=".01"
            min={0}
            className="w-full rounded-lg text-sm p-2.5"
            max={saldo}
          />
        </div>
        <legend className="text-md font-medium mb-4">
          Datos
        </legend>
        <div className="flex">
          <div className="mb-4 mr-3">
            <div className="mb-2 block">
              <Label
                htmlFor="referencia"
                value="Referencia o CC"
              />
            </div>
            <TextInput
              id="referencia"
              name="referencia"
              placeholder="1241597554"
              required
              type="number"
              min={0}
              color={"secondary-c"}
              onChange={(e) => handleChange("referencia", e.target.value)}
            />
          </div>
          <div className="mb-4">
          <div className="mb-2 block">
            <Label
              htmlFor="referencia_name"
              value="nombre referencia"
            />
          </div>
          <TextInput
            id="referencia_name"
            name="referencia_name"
            placeholder="falabella, Oscar Woss..."
            type="text"
            color={"secondary-c"}
            onChange={(e) => handleChange("referencia_name", e.target.value)}
          />
        </div>
        </div>
      </fieldset>
      <fieldset>
        <div className="max-w-md mb-2" id="textarea">
          <div className="mb-2 block">
            <Label
              htmlFor="comment"
              value="Your message"
            />
          </div>
          <Textarea
            id="comment"
            name="details"
            placeholder="Escribe los detalles del pago..."
            color={"secondary-c"}
            rows={2}
            onChange={(e) => handleChange("details", e.target.value)}
          />
        </div>
      </fieldset>
      {info?.success && (
        <Alert color="success">
          <span>
            <p>Pago realizado con éxito</p>
          </span>
        </Alert>
      )}
      {info?.error && (
        <Alert color="failure" icon={HiInformationCircle}>
          <span>
            <p>Algo salió mal!, por favor intente de nuevo.</p>
          </span>
        </Alert>
      )}
      <div className="my-4 flex justify-center">
        <Button
          type="submit"
          disabled={
            !formPay?.referencia ||
            !formPay?.cantity
          }
          className="bg-secondary-c-500 enabled:hover:bg-secondary-c focus:ring-secondary-c-200 dark:bg-secondary-c-500 dark:enabled:hover:bg-secondary-c-500 dark:focus:ring-secondary-c-200 rounded-lg focus:ring-2"
        >
          {info?.processing ? "Procesando pago..." : "Enviar pago"}
        </Button>
      </div>
    </form>
  );
};

export default FormCommitPays;
