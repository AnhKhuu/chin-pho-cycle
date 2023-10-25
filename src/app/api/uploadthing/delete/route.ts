import { NextRequest, NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');
    if (!key) {
      return new NextResponse('File key is required!', { status: 400 });
    }

    console.log('[START_UPLOADTHING_DELETE_IMAGE_POST]');
    const res = await utapi.deleteFiles(key);
    console.log('[FINISH_UPLOADTHING_DELETE_IMAGE_POST]');
    return NextResponse.json(res);
  } catch (error) {
    console.log('[UPLOADTHING_DELETE_IMAGE_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
