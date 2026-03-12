import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const Loteria = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "images/loteria/01.jpg",
    "images/loteria/02.jpg",
    "images/loteria/03.jpg",
  ];

  const handlePrevio = () => {
    setCurrentImageIndex((prev) => prev - 1);
  };

  const handleSiguiente = () => {
    setCurrentImageIndex((prev) => prev + 1);
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Descripción</h1>

          <p className="font-thin">
            Implementación full-stack del clásico juego de Lotería Mexicana con
            partidas multijugador en tiempo real. Los jugadores crean salas
            privadas con código único o se unen a una existente, y juegan
            simultáneamente con el mazo siendo emitido carta por carta desde el
            servidor.
          </p>

          <p className="font-thin">
            La característica más importante del diseño es que el servidor es la
            única fuente de verdad. El mazo se baraja y se controla
            completamente desde el backend — los clientes solo reciben eventos y
            renderizan. Esto elimina cualquier posibilidad de que un cliente
            manipule el estado del juego.
          </p>

          <p className="font-thin">
            La comunicación en tiempo real se maneja con Socket.io, con eventos
            bien definidos para cada acción del juego: unirse a sala, marcar
            carta, declarar ganador. El estado de cada sala vive en memoria en
            el servidor, aislado del resto de partidas activas. Stack: Next.js,
            Node.js + Express, Socket.io, WebSockets, Vercel, AWS EC2 + Nginx.
          </p>

          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">Retos y Aprendizajes</h1>

            <p className="font-thin">
              El reto principal fue manejar desconexiones inesperadas sin romper
              la partida. Si un jugador se desconecta, el servidor debe
              notificar al resto, preservar el estado de la sala y decidir si la
              partida puede continuar o debe pausarse. Esto requiere escuchar el
              evento disconnect de Socket.io y limpiar el estado correctamente.
            </p>

            <p className="font-thin">
              El deployment fue el segundo gran aprendizaje. Nginx actúa como
              reverse proxy frente al proceso Node en EC2 y requiere
              configuración explícita para el upgrade de protocolo HTTP →
              WebSocket — sin eso, Socket.io cae silenciosamente a long-polling
              y la latencia se dispara.
            </p>

            <p className="font-thin">
              Esto me enseñó la diferencia práctica entre una arquitectura
              request/response (REST) y una event-driven (WebSockets) — cuándo
              cada una tiene sentido y cómo conviven en el mismo proyecto.
            </p>
          </div>
        </div>

        <div className="px-5">
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
