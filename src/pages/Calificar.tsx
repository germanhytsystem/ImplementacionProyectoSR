import useCreateRating from "@/core/basehex/application/useCreateRating";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { Rating } from "@/core/basehex/domain/Rating";
import RatingRequest from "@/core/basehex/domain/RatingRequest";
import { swalAlertInfo } from "@/core/helpers/SwalHelper";

const Calificar = (): JSX.Element => {
  const { id } = useParams();
  const localtion = useLocation();
  const navigate = useNavigate();

  const { title, genres, prediction } = localtion.state;
  console.log(title, genres, prediction, id);

  const formik = useFormik<Rating>({
    initialValues: {
      movieId: String(id),
      userId: "1",
      rating: 0,
    },
    onSubmit: (values) => {
      // Calculo aleatorio para userId entre 1 y 7045
      const userId = Math.floor(Math.random() * (7045 - 1 + 1)) + 1;
      values.userId = String(userId);

      void saveRating(values);
    },
  });

  const { mutateAsync: mutateAsyncCreate } = useCreateRating();

  const saveRating = async (payload: RatingRequest): Promise<void> => {
    try {
      await mutateAsyncCreate(payload);
      navigate("/");
      swalAlertInfo("Rating guardada correctamente");
    } catch (error) {
      swalAlertInfo("Error al guardar el Rating");
      console.log("Error", error);
    }
  };

  return (
    <>
      <section className="w-full container mx-auto my-8 sm:my-10">
        <div className="flex ">
          <div className="px-20">
            <img
              src="https://res.cloudinary.com/dvammrjzi/image/upload/v1708229239/DAVID-PORTFOLIO/gratis-png-tira-de-pelicula-formato-psd_n88lir.png"
              className="rounded-xl w-full border-none object-cover"
              alt="Single Project"
            />
          </div>
          <div className="">
            <div className="flex gap-4">
              <button
                className="
                text-primary-dark
                border-2
                border-primary-dark
                font-bold
                py-2
                px-4
                rounded-md"
                type="button"
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancelar
              </button>
              <button
                className="
                bg-primary-dark
                text-primary-light
                font-bold
                py-2
                px-4
                rounded-md"
                type="button"
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                Guardar
              </button>
            </div>
            <div className="h-full flex flex-col gap-8 justify-center items-start">
              <div className="flex flex-col gap-4">
                <div className="text-2xl ">
                  <span className="font-bold">Título:</span> <br />{" "}
                  {title ?? "No encontrado"}
                </div>
                <div className="text-2xl ">
                  <span className="font-bold">Género:</span> <br />{" "}
                  {genres ?? "No encontrado"}
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-4 bg-primary-light border-2 border-primary-dark px-4 py-6 rounded-lg">
                <span className="font-bold">
                  Calificar ({formik.values.rating})
                </span>
                <div className="flex gap-4">
                  <input
                    type="range"
                    name="rating"
                    min={0}
                    max={5}
                    step={0.5}
                    value={formik.values.rating}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="italic">
                Nota: Para fines de prueba el userId
                <br />
                será asignado por defecto en base
                <br />a los datos ya existemtes en base de datos.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Calificar;
