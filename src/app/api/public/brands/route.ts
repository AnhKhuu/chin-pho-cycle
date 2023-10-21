import prismadb from '@/utils/prismadb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('[START_BRANDS_GET]');
    const res = await prismadb.brand.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    console.log('[FINISH_BRANDS_GET]');
    return NextResponse.json(res);
  } catch (error) {
    console.log('[BRANDS_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
