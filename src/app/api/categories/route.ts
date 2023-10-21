import prismadb from '@/utils/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { value } = body;

    if (!value) {
      return new NextResponse('Value is required', { status: 400 });
    }

    console.log('[START_CATEGORIES_POST]');
    const res = await prismadb.category.create({
      data: {
        value: value,
      },
    });
    console.log('[FINISH_CATEGORIES_POST]');

    return NextResponse.json(res);
  } catch (error) {
    console.log('[CATEGORIES_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
