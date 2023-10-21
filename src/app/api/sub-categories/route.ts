import prismadb from '@/utils/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { value, categoryId } = body;

    if (!value) {
      return new NextResponse('Value is required', { status: 400 });
    }

    const res = await prismadb.subCategory.create({
      data: {
        value: value,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.log('[SUB_CATEGORIES_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
