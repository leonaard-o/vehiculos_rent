"use client";

import { Button } from "@/components/ui/button";
import { useLovedCars } from "@/hooks/use-loved-cars";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Heart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const { userId } = useAuth();
  const { lovedItems } = useLovedCars();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-screen z-50 backdrop-blur-md ${
        isScrolled ? "bg-white/90 shadow-lg" : "bg-transparent"
      } transition-all duration-500`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo con animación y gradiente */}
          <Link
            href="/"
            className="flex items-center gap-x-2 transform hover:scale-105 transition-transform duration-300"
          >
            <div className="relative w-14 h-14">
              <Image
                src="/logo.svg"
                alt="Rental Cars Logo"
                layout="fill"
                className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1.5 animate-gradient-xy"
              />
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-text">
            Rental Vehicles
            </span>
          </Link>

          {/* Menú de navegación */}
          <nav className="flex items-center gap-x-8">
            <Link
              href="/cars"
              className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-300 relative group"
            >
              List of Vehicles
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/dashboard"
              className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors duration-300 relative group"
            >
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {/* Icono de favoritos con animación */}
            {userId && (
              <Link
                href="/loved-cars"
                className="relative p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Heart
                  strokeWidth={3}
                  className={`w-6 h-6 text-white ${
                    lovedItems.length > 0 && "fill-white"
                  }`}
                />
                {lovedItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 animate-pulse">
                    {lovedItems.length}
                  </span>
                )}
              </Link>
            )}

            {/* Botón de usuario o inicio de sesión */}
            {userId ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link href="/sign-in">
                <Button className="flex items-center gap-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                  Sign in
                  <User className="w-5 h-5" strokeWidth={2} />
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}