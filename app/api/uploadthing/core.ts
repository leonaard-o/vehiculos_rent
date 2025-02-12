import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Middleware para autenticar
const handleAuth = async () => {
    const { userId } = await auth(); // Resolvemos la promesa
    if (!userId) throw new Error("Unauthorized");
    return { userId }; // Devuelve un objeto
};

export const ourFileRouter = {
  photo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => await handleAuth()) // Middleware devuelve un objeto
    .onUploadComplete(({ metadata }) => {
        console.log("Upload complete:", metadata);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
