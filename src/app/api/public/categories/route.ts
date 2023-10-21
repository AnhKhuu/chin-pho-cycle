import prismadb from '@/utils/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const value = req.nextUrl.searchParams.get('name');
    if (value) {
      console.log('[START_CATEGORIES_GET]');
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
      console.log('[FINISH_CATEGORIES_GET]');

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
