import prismadb from '@/utils/prismadb';
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
