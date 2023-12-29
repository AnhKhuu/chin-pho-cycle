import { type ClassValue, clsx } from 'clsx';
import queryString from 'query-string';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import { PAGE_SIZE } from './constant';
import { TQueryParamsList } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(text: string): string {
  const words = text?.toLowerCase().split(' ');
  return words
    ?.map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
}

export function renderLimitText({
  text,
  maxWords,
}: {
  text: string;
  maxWords: number;
}) {
  if (text.length > maxWords) {
    return text.slice(0, maxWords) + '...';
  }
  return text;
}

export function getPublicIdFromUrl(url: string) {
  const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function generateSignature(publicId: string, apiSecret: string) {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
}

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

interface IParseSearchParamsProps {
  searchParams: SearchParams;
  defaultColumn?: string;
  defaultOrder?: 'asc' | 'desc';
}

export function prepareQueryString(params: TQueryParamsList) {
  const queryParams = {};
  getObjectKeys(params).forEach((item) => {
    if (params[item] !== undefined) {
      queryParams[item] = params[item];
    }
  });
  return queryString.stringify(
    { ...queryParams },
    {
      arrayFormat: 'comma',
    }
  );
}

export function formatPrice(price: number) {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getObjectKeys(obj) {
  return Object.keys(obj ?? {});
}

export function parseSearchParams({
  searchParams,
  defaultColumn,
  defaultOrder,
}: IParseSearchParamsProps) {
  const searchParamsSchema = z.object({
    page: z.string().default('1'),
    perPage: z.string().default(PAGE_SIZE.toString()),
    sort: z.string().optional(),
  });

  // Parse search params using zod schema
  const { page, perPage, sort } = searchParamsSchema.parse(searchParams);

  // Fallback page for invalid page numbers
  const pageAsNumber = Number(page);
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  // Number of items per page
  const perPageAsNumber = Number(perPage);
  const fallbackPerPage = isNaN(perPageAsNumber) ? PAGE_SIZE : perPageAsNumber;

  // Number of items to take
  const limit = isNaN(perPageAsNumber) ? PAGE_SIZE : perPageAsNumber;
  // Number of items to skip
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;

  // Column and order to sort by
  // Split the sort string by "." to get the column and order
  // Example: "price.desc" => ["price", "desc"]
  const [column, order] = sort
    ? (sort.split('.') as [string | undefined, 'asc' | 'desc' | undefined])
    : [defaultColumn, defaultOrder];

  return { fallbackPage, fallbackPerPage, offset, limit, column, order };
}

export function calculatePages(totalItems: number) {
  if (totalItems === undefined) return 0;
  return Math.ceil(totalItems / PAGE_SIZE);
}
