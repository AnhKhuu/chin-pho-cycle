import prismadb from '@/utils/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const value = req.nextUrl.searchParams.get('name');
    if (value) {
      const res = await prismadb.category.findFirst({
        where: {
          value: {
            equals: value,
            mode: 'insensitive',
          },
        },
        include: {
          subCategories: true,
        },
      });
      return NextResponse.json(res);
    } else {
      const res = await prismadb.category.findMany({
        orderBy: {
          value: 'asc',
        },
      });
      return NextResponse.json(res);
    }
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
