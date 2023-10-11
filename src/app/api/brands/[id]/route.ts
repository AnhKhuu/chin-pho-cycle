import prismadb from '@/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';

// TODO: refactor to AXIOS requests, implement handlers
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return new NextResponse('Invalid input', { status: 400 });
  }

  try {
    const res = await prismadb.brand.findFirst({
      where: {
        id: id,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log('[BRANDS_ID_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return new NextResponse('Invalid input', { status: 400 });
  }

  try {
    const body = await req.json();
    const res = await prismadb.brand.update({
      where: {
        id: id,
      },
      data: {
        ...body,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log('[BRANDS_ID_PUT]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return new NextResponse('Invalid input', { status: 400 });
  }

  try {
    const res = await prismadb.brand.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.log('[BRANDS_ID_DELETE]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
