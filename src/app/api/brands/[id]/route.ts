import prismadb from '@/utils/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const res = await prismadb.brand.findFirst({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log('[BRANDS_ID_GET]', error);
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
    const res = await prismadb.brand.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        description,
        imageUrl,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log('[BRANDS_ID_PATCH]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const res = await prismadb.brand.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log('[BRANDS_ID_DELETE]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
