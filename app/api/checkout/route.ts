// import {Stripe } from "stripe";

// import { db } from "@/lib/db";

// import { stripe } from '@/lib/stripe';
// import { NextResponse } from "next/server";
// import {auth} from "@clerk/nextjs/server"
 
// const corsHeaders = {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//     "Access-Control-Allow-Headers": "Content-Type, Authorization",
// }

// export async function POST(req: Request, { params }: { params: any }) {
//     const { userId } = await auth();
//     let { carId, priceDay, startDate, endDate, carName } = await req.json();

//     if (!userId) {
//         return new NextResponse("Unauthorized", { status: 401 });
//     }

//     // Resetear valores si están vacíos o inválidos
//     carId = carId || null;
//     startDate = startDate ? new Date(startDate) : null;
//     endDate = endDate ? new Date(endDate) : null;
//     priceDay = priceDay ? Number(priceDay) : 0;

//     // Si falta algún dato requerido
//     if (!carId || !startDate || !endDate || !priceDay) {
//         return new NextResponse("Invalid data", { status: 400 });
//     }

//     // Calcular días y monto total
//     const numberOfDays = Math.ceil(
//         (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
//     );

//     const totalAmount = priceDay * numberOfDays;
//     const totalAmountStripe = priceDay * 100 * numberOfDays;

//     // Crear el pedido
//     const order = await db.order.create({
//         data: {
//             carId,
//             carName,
//             userId,
//             status: "confirmed",
//             totalAmount: totalAmount.toString(),
//             orderDate: startDate.toISOString(),
//             orderEndDate: endDate.toISOString(),
//         },
//     });

//     // Configurar la sesión de Stripe
//     const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
//         {
//             quantity: 1,
//             price_data: {
//                 currency: "usd",
//                 product_data: {
//                     name: carName,
//                 },
//                 unit_amount: totalAmountStripe,
//             },
//         },
//     ];

//     const session = await stripe.checkout.sessions.create({
//         line_items,
//         mode: "payment",
//         billing_address_collection: "required",
//         phone_number_collection: { enabled: true },
//         success_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/order-confirmation`,
//         cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/order-error`,
//         metadata: {
//             orderId: order.id,
//             carId,
//             endDate: endDate.toISOString(),
//             numberOfDays,
//         },
//     });

//     return NextResponse.json({ url: session.url });
// }
       
    



    import {Stripe } from "stripe";

import { db } from "@/lib/db";
import {auth} from "@clerk/nextjs/server"
import { stripe } from '@/lib/stripe';
import { NextResponse } from "next/server";

 
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}



export async function POST(req: Request) {
    const { carId, priceDay, startDate, endDate, carName } = await req.json();

    // Obtén el userId desde Clerk
    const { userId } = await auth();  // Esta función te da el userId si el usuario está autenticado

    if (!userId) {
        return new NextResponse("User not authenticated", { status: 400 });
    }

    if (!carId || !priceDay || !startDate || !endDate || !carName) {
        return new NextResponse("All fields are required", { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const numberOfDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    const totalAmount = Number(priceDay) * numberOfDays;
    const totalAmountStripe = Number(priceDay) * 100 * numberOfDays; // Stripe usa la cantidad en centavos

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [{
        quantity: 1,
        price_data: {
            currency: "usd",
            product_data: {
                name: carName,
            },
            unit_amount: totalAmountStripe,
        },
    }];

    // Guardamos el pedido en la base de datos
    const order = await db.order.create({
        data: {
            carId,
            carName,
            userId, // Aquí se pasa correctamente el userId extraído desde auth()
            status: "confirmed",
            totalAmount: totalAmount.toString(),
            orderDate: startDate,
            orderEndDate: endDate,
        },
    });

    // Aquí continúas con la creación de la sesión de Stripe y la respuesta
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        billing_address_collection: "required",
        phone_number_collection: {
            enabled: true,
        },
        success_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/order-error`,
        metadata: {
            orderId: order.id,
            carId,
            startDate,
            endDate,
            numberOfDays,
        },
    });

    return NextResponse.json({ url: session.url }, { headers: corsHeaders });
}





    





    
