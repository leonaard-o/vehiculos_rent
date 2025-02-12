import Image from 'next/image'


export default function AuthLayout({children} : {children: React.ReactNode}) {
  return (
    <div className="grid lg:grid-cols-2 h-full items-center justify-center">
        <div className='felx justify-center items-center '>{children}</div>
        <div className='hidden lg:flex lg:bg-slate-300 h-full justify-center items-center lg:flex-col'>
            <Image src="/logo.svg" alt="logo" width={80} height={80} className='rounded-full
            ' />
            <h1 className='text-1xl font-bold text-slate-800 '>Rental Cars</h1>
        </div>
    </div>
  )
}

