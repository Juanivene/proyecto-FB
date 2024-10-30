import { useForm } from "react-hook-form";
import InputF from "../ui/InputF";
import Grid from "../Grid/grid";
import { Link } from "react-router-dom";
import { Customer } from "./Customer";
import PropTypes from "prop-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getflightSelectedFn, postCustomerFn } from "../../api/flight";
import { toast } from "sonner";

const FormDataClient = (props) => {
  const { id } = props;

  const { data: flightSelected } = useQuery({
    queryKey: [`flights-${id}`],
    queryFn: () => getflightSelectedFn(id),
  });

  const queryClient = useQueryClient();

  const { mutate: postCustomer } = useMutation({
    mutationFn: postCustomerFn,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Entrada guardada");

      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
    onError: (e) => {
      toast.dismiss();
      toast.warning(e.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    const {
      name,
      lastname,
      birthdate,
      dni,
      email,
      genre,
      nationality,
      phonenumber,
    } = data;
    const customer = new Customer(
      name,
      lastname,
      birthdate,
      dni,
      email,
      genre,
      nationality,
      phonenumber,
      flightSelected
    );
    postCustomer(customer);
  };
  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="card bg-yellow-100 shadow-lg rounded"
    >
      <div className="card-body ">
        <h2 className="card-title text-xl font-bold text-gray-800">
          Ingresá tus datos personales
        </h2>
        <p>
          Igual a como aparece en el DNI o Pasaporte con el que vas a viajar
        </p>

        <Grid container gap={2} className={`mb-3`}>
          <Grid item xs={12} md={6} lg={6}>
            <InputF
              error={errors.name}
              placeHolder={`Nombre`}
              name="name"
              register={register}
              options={{
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                minLength: {
                  value: 3,
                  message: "Debe contener al menos 3 caracteres",
                },
                maxLength: {
                  value: 30,
                  message: "Debe contener 20 caracteres como maximo",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputF
              error={errors.lastname}
              placeHolder={`Apellido`}
              name="lastname"
              options={{
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                minLength: {
                  value: 3,
                  message: "Debe contener al menos 3 caracteres",
                },
                maxLength: {
                  value: 30,
                  message: "Debe contener 20 caracteres como maximo",
                },
              }}
              register={register}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputF
              error={errors.birthdate}
              placeHolder={`Fecha de nacimiento`}
              name="birthdate"
              type={`date`}
              options={{
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              }}
              register={register}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <select
              name="nationality"
              className="select select-bordered w-full"
              defaultValue="Nacionalidad"
              {...register("nationality", {
                required: "Este campo es requerido",
              })}
            >
              <option value="">Nacionalidad</option>
              <option value="argentina">Argentina</option>
              <option value="brasil">Brasil</option>
              <option value="chile">Chile</option>
              <option value="uruguay">Uruguay</option>
              <option value="bolivia">Bolivia</option>
            </select>
          </Grid>
          <Grid item xs={12}>
            <p>
              ¿Este pasajero tiene alguna discapacidad o condicion que debamos
              tener en cuenta?
            </p>
            <a
              href="https://homers-webpage.vercel.app/"
              className="link link-warning"
            >
              Consulta nuestra web sobre accesebilidad para esta informacion
            </a>
          </Grid>
        </Grid>
      </div>
      <div className="divider">🛩</div>
      <div className="card-body ">
        <h2 className="card-title text-xl font-bold text-gray-800">
          Documentacion
        </h2>
        <p>
          Debe ser el mismo documento con el que vas a viajar.Ingresa pasaporte
          o dni
        </p>
        {/* <div className="flex gap-20">
          <RadioF value="dni" label="DNI" {...register("dnitrue")} />
          <RadioF   
            value="pasaporte"
            label="Pasaporte"
            {...register("dnifalse")}
          />
        </div> */}
        <InputF
          error={errors.dni}
          placeHolder={`Numero`}
          name="dni"
          options={{
            required: {
              value: true,
              message: "Campo requerido",
            },
          }}
          register={register}
        />
      </div>
      <div className="divider">🧦</div>
      <div className="card-body">
        <h2 className="card-title text-xl font-bold text-gray-800">Genero</h2>
        <select
          name="genre"
          className="select select-bordered w-full"
          defaultValue="Genero"
          {...register("genre", {
            required: "Este campo es requerido",
          })}
        >
          <option value="">Genero</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>
        <p>¿Por qué queremos saber esto?</p>
        <a
          href="https://homers-webpage.vercel.app/"
          className="link link-warning"
        >
          Consulta nuestra web sobre accesebilidad para esta informacion
        </a>
      </div>
      <div className="divider">🍕</div>
      <div className="card-body">
        <h2 className="card-title text-xl font-bold text-gray-800">
          Tus datos de contacto
        </h2>
        <p>
          Datos que usaremos para comunicarnos contigo ante cualquier aviso o
          inconveniente
        </p>
        <Grid container gap={2}>
          <Grid item xs={6}>
            <InputF
              error={errors.telefono}
              placeHolder={`Numero de telefono`}
              name="phonenumber"
              options={{
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              }}
              register={register}
            />
          </Grid>
          <Grid item xs={6}>
            <InputF
              error={errors.email}
              placeHolder={`Email`}
              name="email"
              type={`email`}
              options={{
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              }}
              register={register}
            />
          </Grid>
        </Grid>
        <div className="divider">🍔</div>
        <div className="flex justify-center md:justify-between px-3 pt-4">
          <Link to="/" className="link link-warning hidden md:block">
            Cambiar fecha
          </Link>
          <button type="submit" className="btn btn-active btn-wide ">
            Continuar
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormDataClient;
FormDataClient.propTypes = {
  id: PropTypes.string.isRequired,
};