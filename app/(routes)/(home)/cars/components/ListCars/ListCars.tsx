"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Fuel, Gauge, Gem, Heart, Users, Wrench } from "lucide-react";
import { ModalAddReservation } from "@/components/Shared/ModalAddReservation";
import Link from "next/link";
import { Car } from "@prisma/client";
import { useLovedCars } from "@/hooks/use-loved-cars";
import { useAuth } from "@clerk/nextjs";
import { ListCarsProps } from "./listCars.types";
import { SkeletonCars } from "@/components/Shared/SkeletonCars";


export function ListCars(props: ListCarsProps) {
  const { cars } = props;
  const { userId } = useAuth();
  const { addLoveItem, lovedItems, removeLoveItem } = useLovedCars();
  if (!cars) {
    return <SkeletonCars />;
  }
  return (
    <>
      {cars.length === 0 && (
        <p>No se han encontrado vehiculos con estos filtros </p>
      )}
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-4">
        {cars.map((car: Car) => {
          const {
            priceDay,
            photo,
            name,
            type,
            transmission,
            people,
            engine,
            cv,
            id,
          } = car;
          const likedCar = lovedItems.some((item) => item.id === car.id);
          return (
            <div key={id} className="p-1 rounded-lg shadow-md hover:shadow-lg">
              <Image
                src={photo}
                alt={name} // Cambié el alt a {name} para mejorar la accesibilidad
                width={400}
                height={600}
                className="rounded-lg h-[11em] lg:h-[11em] object-cover p-2"
              />

              <div className="p-3">
                <div className="flex flex-col mb-3 gap-x-4">
                  <p className="text-xl min-h-16 lg:min-h-fit">{name}</p>
                  <p>{priceDay}</p>
                </div>
                <p className="flex items-center">
                  <Gem
                    className="w-4 h-4 mr-2 text-emerald-600"
                    strokeWidth={2}
                  />
                  {type}
                </p>
                <p className="flex items-center">
                  <Wrench
                    className="w-4 h-4 mr-2 text-emerald-600"
                    strokeWidth={2}
                  />
                  {transmission}
                </p>
                <p className="flex items-center">
                  <Users
                    className="w-4 h-4 mr-2 text-emerald-600"
                    strokeWidth={2}
                  />
                  {people}
                </p>
                <p className="flex items-center">
                  <Fuel
                    className="w-4 h-4 mr-2 text-emerald-600"
                    strokeWidth={2}
                  />
                  {engine}
                </p>
                <p className="flex items-center">
                  <Gauge
                    className="w-4 h-4 mr-2 text-emerald-600"
                    strokeWidth={2}
                  />
                  {cv} CV
                </p>
                {userId ? (
                  <div className="flex items-center jus4 gap-x-3">
                    <ModalAddReservation car={car} />
                    <Heart
                      className={`mt-2 cursor-pointer ${likedCar ? "fill-black" : ""}`}

                      onClick={
                        likedCar
                          ? () => removeLoveItem(car.id)
                          : () => addLoveItem(car)
                      }
                    />
                  </div>
                ) : (
                  <div className="w-full mt-2 text-center">
                    <Link href="/sign-in">
                      <Button className="" variant="outline">
                        Iniciar sessión para reservar
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
