import { Navbar } from '@/components/Shared/Navbar/Navbar'
import { Button } from '@/components/ui/button'
import  Link  from 'next/link'
import React from 'react'

export default function OrderConfirmationPage() {
  return (
    <div>
        <Navbar/>
       <div className='p-6 mx-auto max-w7xl'>
        <div className='flex flex-col items-center justify-center gap-4 text-center'>
            <h1 className='text-3xl font-bold'>¡Thank you to belive in us!🚀</h1>
            <p>We will send you an email with the details of your order</p>
            <p>You can check your order status in the dashboard</p>
            <Link className='text-blue-500' href='/'>
            <Button>
              Return to vehicles Selection
            </Button>
                </Link>
        </div>

       </div>
        
     </div>
  )
}
