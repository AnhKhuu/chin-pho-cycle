import prismadb from '@/utils/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, imageUrl } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    console.log('[START_COLLECTIONS_POST]');
    const res = await prismadb.collection.create({
      data: {
        name: name,
        description: description || '',
        imageUrl: imageUrl || '',
      },
    });
    console.log('[START_COLLECTIONS_POST]');

    return NextResponse.json(res);
  } catch (error) {
    console.log('[COLLECTIONS_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}