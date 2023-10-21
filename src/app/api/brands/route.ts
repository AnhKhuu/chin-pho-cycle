import prismadb from '@/utils/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, imageUrl } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const res = await prismadb.brand.create({
      data: {
        name: name,
        description: description || '',
        imageUrl: imageUrl || '',
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.log('[BRANDS_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
