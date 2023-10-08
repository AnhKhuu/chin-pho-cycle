import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const product = await prismadb.testObject.create({
      data: {
        msg: name,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
