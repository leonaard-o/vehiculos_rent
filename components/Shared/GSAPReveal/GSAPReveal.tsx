"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GSAPRevealProps } from "./GSAPReveal.types";

export const GSAPReveal: React.FC<GSAPRevealProps & { initial?: string }> = ({
  children,
  className,
  
  position = "top",
  delay = 0.5,
  initial = "hidden",
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    // Inicializar el estado del elemento en "hidden" (completamente oculto) al cargar la página
    if (initial === "hidden" && element) {
      gsap.set(element, {
        opacity: 0, // Oculto al principio
        y: position === "bottom" ? 80 : position === "top" ? -80 : 0,
        x: position === "right" ? 80 : position === "left" ? -80 : 0,
        scale: 0.9,
      });
    }

    // Crear el Intersection Observer para detectar cuando el elemento se vuelve visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Cuando el elemento entra en la vista, cambia el estado
          }
        });
      },
      {
        threshold: 0.4, // El elemento debe estar al menos 40% visible para iniciar la animación
      }
    );

    // Empezar a observar el elemento
    if (element) observer.observe(element);

    // Limpiar el observer cuando el componente se desmonte
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [initial, position]);

  useEffect(() => {
    if (isVisible) {
      const element = elementRef.current;

      if (element) {
        // Iniciar la animación de visibilidad
        const toVars = {
          opacity: 1,    // Hacer visible el elemento
          y: 0,          // Restaurar la posición Y
          x: 0,          // Restaurar la posición X
          scale: 1,      // Restaurar la escala
          duration: 1.5, // Duración de la animación
          delay: delay,  // Retardo antes de que comience la animación
          ease: "power3.out", // Efecto de suavizado en la animación
        };

        gsap.to(element, toVars); // Aplicar la animación con gsap
      }
    }
  }, [isVisible, position, delay]);

  return (
    <div
      ref={elementRef}
      className={`${className} transition-all duration-100 hover:shadow-2xl hover:scale-105 hover:bg-blue/90 hover:text-gray-800`}
    >
      {children}
    </div>
  );
};
