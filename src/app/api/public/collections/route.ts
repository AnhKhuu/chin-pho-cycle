import prismadb from '@/utils/prismadb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('[START_COLLECTIONS_GET]');
    const res = await prismadb.collection.findMany({
      include: {
        products: true,
      },
    });
    console.log('[FINISH_COLLECTIONS_GET]');

    return NextResponse.json(res);
  } catch (error) {
    console.log('[COLLECTIONS_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
