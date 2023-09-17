import { Button, Label, TextInput } from "flowbite-react";

const FormSecurity = () => {
  return (
    <>
      <div className="max-w-xl">
        <div className="text-primario-c-500 mb-4">
          <h1 className="text-3xl">Cambiar Contraseña</h1>
        </div>
        <form className="flex flex-1 mx-auto flex-col gap-4">
          <div className="max-w-sm">
            <div className="my-2">
              <div className="mb-2 block">
                <Label
                  htmlFor="password"
                  value="Contraseña actual"
                />
              </div>
              <TextInput
                id="password"
                required
                shadow
                placeholder="******************"
                type="password"
                color="secondary-c"
              />
            </div>
            <div className="my-2">
              <div className="mb-2 block">
                <Label
                  htmlFor="new_password"
                  value="Nueva Contraseña"
                />
              </div>
              <TextInput
                id="new_password"
                required
                shadow
                name="new_password"
                placeholder="******************"
                type="password"
                color="secondary-c"
              />
            </div>
            <div className="my-2">
              <div className="mb-2 block">
                <Label
                  htmlFor="confirm_new_password"
                  value="Confirmar Nueva Contraseña"
                />
              </div>
              <TextInput
                id="confirm_new_password"
                required
                shadow
                placeholder="******************"
                type="password"
                color="secondary-c"
              />
            </div>
            <Button
                type="submit"
                fullSized
                className="bg-secondary-c-500 enabled:hover:bg-secondary-c focus:ring-secondary-c-200 dark:bg-secondary-c-500 dark:enabled:hover:bg-secondary-c-500 dark:focus:ring-secondary-c-200 rounded-lg focus:ring-2 mt-6"
            >
                Actualizar
            </Button>
          </div>
        </form>
      </div>
      {/* <div className="mt-16 mx-auto">
        <img src="./src/assets/icon-digital-wallet.png" alt="logo digital wallet"/>
      </div> */}
    </>
  );
};

export default FormSecurity;
