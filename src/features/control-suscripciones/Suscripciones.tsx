import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Separator } from "../../components/Separator";

export const Suscripciones = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "images/suscripcion/01.png",
    "images/suscripcion/02.png",
    "images/suscripcion/03.png",
    "images/suscripcion/04.png",
  ];

  const handlePrevio = () => {
    setCurrentImageIndex((prev) => prev - 1);
  };

  const handleSiguiente = () => {
    setCurrentImageIndex((prev) => prev + 1);
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Descripción</h1>

          <p className="font-thin">
            Aplicación full-stack para registrar y administrar suscripciones
            personales con recordatorios automáticos por correo antes de cada
            fecha de renovación. El sistema es completamente autónomo — una vez
            registrada una suscripción, los recordatorios se envían solos sin
            ninguna intervención del usuario.
          </p>

          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">Cómo funciona</h1>

            <p className="font-thin">
              Los usuarios registran sus suscripciones con nombre, precio,
              frecuencia de cobro y método de pago. El sistema calcula
              automáticamente la próxima fecha de renovación según la frecuencia
              configurada (semanal, mensual, anual) y la actualiza en cada
              ciclo.
            </p>

            <p className="font-thin">
              Los recordatorios funcionan con una arquitectura de tres piezas:
            </p>

            <ol className="font-thin">
              <li className="list-decimal ml-10">
                AWS EventBridge Scheduler — dispara una función Lambda según un
                horario definido, independientemente del estado del servidor.
              </li>
              <li className="list-decimal ml-10">
                AWS Lambda — recibe el trigger de EventBridge y hace una llamada
                HTTP al endpoint del backend que procesa los recordatorios del
                día.
              </li>
              <li className="list-decimal ml-10">
                Backend (Node/Express en EC2) — al recibir la llamada, consulta
                MongoDB en busca de suscripciones próximas a vencer y dispara
                los emails correspondientes.
              </li>
            </ol>

            <img src="images/suscripcion/subs_diagram.png" alt="" />

            <p className="font-thin">
              Este diseño desacopla completamente el scheduler del servidor — si
              el proceso Node se reinicia o el servidor tiene downtime,
              EventBridge sigue corriendo y Lambda reintentará la llamada.
            </p>
          </div>
        </div>

        <div className="px-5">
          <h1 className="text-xl font-bold">Autenticación con OTP</h1>
          <p className="font-thin">
            El flujo de autenticación va más allá de un simple usuario y
            contraseña. Al registrarse o iniciar sesión, el sistema genera un
            código OTP de un solo uso que se envía al correo del usuario. El
            código se almacena temporalmente en Redis con un TTL corto — si el
            usuario no lo verifica en ese tiempo, expira automáticamente y debe
            solicitar uno nuevo.
          </p>

          <p className="font-thin">
            Redis es ideal para esto por dos razones: la expiración automática
            con TTL elimina la necesidad de limpiar códigos viejos manualmente,
            y las lecturas son en memoria, la verificación es prácticamente
            instantánea
          </p>
          <img
            className="mt-5"
            src="images/suscripcion/subs_diagram_2.png"
            alt=""
          />
        </div>
      </div>

      <Separator className="my-10" />

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl">Galería</h1>

          <div className="flex flex-col justify-center mt-5">
            <img
              src={images[currentImageIndex]}
              alt=""
              className="w-full rounded-xl"
              width={100}
              height={200}
            />

            <div className="mt-5 w-full flex gap-4 items-center justify-between">
              <button
                disabled={currentImageIndex <= 0}
                className="flex-1 flex justify-center gap-1 items-center uppercase disabled:bg-gray-900"
                onClick={handlePrevio}
              >
                <FaChevronLeft />
                Previo
              </button>

              <button
                disabled={currentImageIndex >= images.length - 1}
                className="flex-1 flex justify-center gap-1 items-center uppercase disabled:bg-gray-900"
                onClick={handleSiguiente}
              >
                Siguiente
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
