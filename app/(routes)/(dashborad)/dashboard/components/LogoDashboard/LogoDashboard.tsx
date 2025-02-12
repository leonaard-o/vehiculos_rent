import Image from "next/image";
import Link from "next/link";


export function LogoDashboard() {
    return (
        <Link href="/" className="flex px-6 items-center h-20 gap-2  border-slate-800 cursor-pointer min-h-20">
            <Image src="/logo.svg" alt="logo" width={50} height={50} priority className='rounded-full p-1 bg-blue-500
            ' />
      <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-indigo-800 to-gray-800">
  Rental Vehicles
</h1>

        </Link>
    )
}
