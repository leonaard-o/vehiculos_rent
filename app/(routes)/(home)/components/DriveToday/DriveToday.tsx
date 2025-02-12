"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Shared/Reveal/Reveal";

export function DriveToday() {
    return (
      <div className="p-4 lg:my-22 max-w-7xl mx-auto ">
        <div
          className="bg-[url('/images/background-2.jpg')] bg-center bg-cover bg-no-repeat rounded-xl p-12 lg:p-32 relative"
        >
          <div>
            <h3 className="text-white text-4xl">Drive your dream vehicle today</h3>
            <p>Register and Explore the world of premiun vehicles</p>
            <Link href="/sign-in">
            <Button variant='outline' size='lg'>
                Register here
            </Button>
            </Link>

          </div>
          <Reveal className="lg:absolute lg:-right-32 top-5" position="right">
            <Image 
              src="/images/cars/bugatti-b.png" 
              alt="Car Drive"
              width={550} 
              height={250}
              className="rounded-xl  h-[380px] w-[640px] object-cover"
            />

          </Reveal>
        </div>
      </div>
    );
  
}
