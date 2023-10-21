import prismadb from '@/utils/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { value } = body;

    console.log('[START_SUB_CATEGORIES_ID_PATCH]');
    const res = await prismadb.subCategory.update({
      where: {
        id: params.id,
      },
      data: {
        value: value,
      },
    });
    console.log('[FINISH_SUB_CATEGORIES_ID_PATCH]');

    return NextResponse.json(res);
  } catch (error) {
    console.log('[SUB_CATEGORIES_ID_PATCH]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('[START_SUB_CATEGORIES_ID_DELETE]');
    const res = await prismadb.subCategory.delete({
      where: {
        id: params.id,
      },
    });
    console.log('[FINISH_SUB_CATEGORIES_ID_DELETE]');

    return NextResponse.json(res);
  } catch (error) {
    console.log('[SUB_CATEGORIES_ID_DELETE]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
