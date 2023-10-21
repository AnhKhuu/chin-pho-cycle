import { generateSHA1, generateSignature } from '@/utils/fn';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publicId = searchParams.get('id');
    if (!publicId) {
      return new NextResponse('Public ID is required', { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return new NextResponse('Missing Cloudinary credentials!', {
        status: 500,
      });
    }

    const timestamp = new Date().getTime();
    const signature = generateSHA1(generateSignature(publicId, apiSecret));
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

    const data = {
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    };

    console.log('[CLOUDINARY_DELETE_IMAGE_POST]', url);
    const res = await axios.post(url, data);
    console.log('[CLOUDINARY_DELETE_IMAGE_POST]', res.data);
    return NextResponse.json(res.data);
  } catch (error) {
    console.log('[CLOUDINARY_DELETE_IMAGE_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
