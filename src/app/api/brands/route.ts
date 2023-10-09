import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await prismadb.brand.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log('[BRANDS_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, imageUrl } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const res = await prismadb.brand.create({
      data: {
        name: name,
        imageUrl: imageUrl,
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.log('[BRANDS_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
