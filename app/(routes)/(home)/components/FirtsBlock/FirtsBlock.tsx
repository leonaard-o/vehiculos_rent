
"use client";
import { Reveal } from "@/components/Shared/Reveal/Reveal";
import Image from "next/image";

export function FirtsBlock() {
  return (
    <div className="grid lg:grid-cols-2 lg:px-0 lg:py-24 items-center ">
      <Reveal className="p-6 lg:pl-40" position="bottom">
        <h1 className="text-4xl lg:text-7xl font-bold">
          Premiun
          <span className="block">Rental Vehicles</span>
          in the World
        </h1>
        <p className="text-lg mt-2 lg:mt-5 lg:text-xl max-w-sm">
          Dont deney yourself pleasure of driving the best premiun vehicles in
          the world
        </p>
      </Reveal>
      <Reveal className="flex justify-end" position="right" delay={0.5}>
        <Image
          src="/images/macerati.png"
          alt="car"
          width={800}
          height={800}
          priority
          />
        </Reveal>

    </div>
  );
}
