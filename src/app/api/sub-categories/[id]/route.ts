import prismadb from '@/utils/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { value } = body;
    const res = await prismadb.subCategory.update({
      where: {
        id: params.id,
      },
      data: {
        value,
      },
    });
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
    const res = await prismadb.subCategory.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log('[SUB_CATEGORIES_ID_DELETE]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
