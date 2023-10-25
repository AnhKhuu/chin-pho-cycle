import { auth as clerkAuth } from '@clerk/nextjs';
import { type FileRouter, createUploadthing } from 'uploadthing/next';

const f = createUploadthing();

const auth = (req: Request) => {
  const { userId }: { userId: string | null } = clerkAuth();

  // If you throw, the user will not be able to upload
  if (!userId) throw new Error('Unauthorized');
  // Whatever is returned here is accessible in onUploadComplete as `metadata`
  return { userId };
};

export const ourFileRouter = {
  singleImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('singleImage: ', data);
    }),

  productImages: f({ image: { maxFileSize: '2MB', maxFileCount: 10 } })
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('productImages: ', data);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
