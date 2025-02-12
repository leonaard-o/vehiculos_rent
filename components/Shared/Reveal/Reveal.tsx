"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { RevealProps } from "./Reveal.types";

export function Reveal({
  children,
  className = "",
  position = "right",
  delay = 0,
  initial = "hidden", // Added initial prop with default value
}: RevealProps & { initial?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (initial === "hidden" && element) {
      gsap.set(element, {
        opacity: 0,
        scale: 0.8,
        rotate: position === "right" ? 15 : -15,
        x: position === "right" ? 300 : 0,
        y: position === "bottom" ? 100 : 0,
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.4 }
    );

    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [initial, position]);

  useEffect(() => {
    if (isVisible) {
      gsap.to(ref.current, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        x: 0,
        y: 0,
        duration: 1.8,
        delay: delay,
        ease: "power4.out",
      });
    }
  }, [isVisible, delay]);

  return (
    <div ref={ref} className={className} style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {children}
    </div>
  );
}
