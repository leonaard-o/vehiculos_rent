"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface ShineImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const ShineFilters: React.FC<ShineImageProps> = ({
  src,
  alt,
  width = 200,
  height = 200,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (shineRef.current) {
      // Inicializamos el brillo fuera de la vista
      gsap.set(shineRef.current, {
        x: "-150%",
        scaleX: 2, // Ajustamos el ancho del brillo
        opacity: 0,
        rotation: 0,
        skewX: -10, // Ajustamos el ángulo del brillo
      });

      // Creamos la línea de tiempo para el efecto
      const tl = gsap.timeline({
        repeat: -1, // Repetición infinita
        repeatDelay: 1.5, // Retraso entre repeticiones
        defaults: { ease: "power2.inOut" }, // Easing más suave
      });

      // Animación del brillo
      tl.to(
        shineRef.current,
        {
          x: "150%", // Movimiento horizontal
          opacity: 0.8, // Brillo más visible
          duration: 1.5, // Duración más rápida
          skewX: 0, // Corrección del ángulo
        },
        "+=0.5" // Pequeño retraso antes de iniciar
      )
        .to(
          shineRef.current,
          {
            opacity: 0, // Desvanecimiento gradual
            duration: 0.5, // Tiempo de desvanecimiento
          },
          "+=0.3" // Pequeño retraso antes de desvanecer
        );
    }
  }, []);

  return (
   

    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl  shadow-[0_0_25px_12px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out hover:scale-105  ${
        className || "lg:h-[10em] lg:w-full"
      }`}
    >
      <div className=" flex items-center justify-center lg:w-full  shadow-[0_0_25px_12px_rgba(0,0,0,0.25)]">
        {/* Imagen principal */}
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="rounded-3xl h-[8em] lg:h-[10em] object-cover   hover:shadow-xl hover:brightness-110 lg:w-full"
        />

        {/* Efecto de brillo */}
        <div
          ref={shineRef}
          className="absolute inset-0 bg-gradient-to-r 
                     from-transparent via-white/70 to-transparent 
                     pointer-events-none z-30
                     mask-radial"
        />
      </div>
    </div>
    
  );
};

export default ShineFilters;