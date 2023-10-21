import prismadb from '@/utils/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('[START_CATEGORIES_ID_GET]');
    const res = await prismadb.category.findFirst({
      where: {
        id: params.id,
      },
      include: {
        subCategories: true,
      },
    });
    console.log('[FINISH_CATEGORIES_ID_GET]');

    return NextResponse.json(res);
  } catch (error) {
    console.log('[CATEGORIES_ID_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { value } = body;

    console.log('[START_CATEGORIES_ID_PATCH]');
    const res = await prismadb.category.update({
      where: {
        id: params.id,
      },
      data: {
        value: value,
      },
    });
    console.log('[FINISH_CATEGORIES_ID_PATCH]');

    return NextResponse.json(res);
  } catch (error) {
    console.log('[CATEGORIES_ID_PATCH]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('[START_CATEGORIES_ID_DELETE]');
    const res = await prismadb.category.delete({
      where: {
        id: params.id,
      },
    });
    console.log('[FINISH_CATEGORIES_ID_DELETE]');

    return NextResponse.json(res);
  } catch (error) {
    console.log('[CATEGORIES_ID_DELETE]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
