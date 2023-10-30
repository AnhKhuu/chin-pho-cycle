import { type ClassValue, clsx } from 'clsx';
import { createHash } from 'crypto';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(text: string): string {
  const words = text.toLowerCase().split(' ');
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
}

export function getPublicIdFromUrl(url: string) {
  const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function generateSHA1(data: string) {
  const hash = createHash('sha1');
  hash.update(data);
  return hash.digest('hex');
}

export function generateSignature(publicId: string, apiSecret: string) {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
}
