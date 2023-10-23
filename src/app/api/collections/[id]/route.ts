import prismadb from '@/utils/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('[START_COLLECTIONS_ID_GET]');
    const res = await prismadb.collection.findFirst({
      where: {
        id: params.id,
      },
    });
    console.log('[FINISH_COLLECTIONS_ID_GET]');

    return NextResponse.json(res);
  } catch (error) {
    console.log('[COLLECTIONS_ID_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, description, imageUrl } = body;
    console.log('[START_COLLECTIONS_ID_PATCH]');
    const res = await prismadb.collection.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        description,
        imageUrl,
      },
    });
    console.log('[FINISH_COLLECTIONS_ID_PATCH]');

    return NextResponse.json(res);
  } catch (error) {
    console.log('[COLLECTIONS_ID_PATCH]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('[START_COLLECTIONS_ID_DELETE]');
    const res = await prismadb.collection.delete({
      where: {
        id: params.id,
      },
    });
    console.log('[FINISH_COLLECTIONS_ID_DELETE]');

    return NextResponse.json(res);
  } catch (error) {
    console.log('[COLLECTIONS_ID_DELETE]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
