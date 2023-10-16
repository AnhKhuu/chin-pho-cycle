import prismadb from '@/utils/prismadb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await prismadb.category.findMany({
      orderBy: {
        value: 'asc',
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log('[CATEGORIES_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { value } = body;

    if (!value) {
      return new NextResponse('Value is required', { status: 400 });
    }

    const res = await prismadb.category.create({
      data: {
        value: value,
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.log('[CATEGORIES_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
