'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  RadioGroup,
  RadioGroupItem,
} from '@/components';
import { Checkbox } from '@/components/ui/checkbox';
import { I18nTermsSearch, Routes } from '@/utils/constant';
import { capitalizeFirstLetter } from '@/utils/fn';
import {
  TFilterItem,
  TFilterType,
  TInitialFilters,
  TSort,
} from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const FormSchema = z.object({
  types: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  brands: z.array(z.string()).optional(),
  genders: z.array(z.string()).optional(),
  sortBy: z.string().optional(),
});
interface IFilterListProps {
  handleSubmit: (fields: z.infer<typeof FormSchema>) => void;
  filterList: TFilterItem[];
  sortList: TSort[];
  initialFilters: TInitialFilters;
}

export function FilterList({
  handleSubmit,
  filterList,
  sortList,
  initialFilters,
}: IFilterListProps) {
  const t = useTranslations('Search');
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      types: initialFilters.types,
      sizes: initialFilters.sizes,
      brands: initialFilters.brands,
      genders: initialFilters.genders,
      sortBy: initialFilters.sortBy as string,
    },
  });

  useEffect(() => {
    form.reset({
      types: initialFilters.types,
      sizes: initialFilters.sizes,
      brands: initialFilters.brands,
      genders: initialFilters.genders,
      sortBy: initialFilters.sortBy as string,
    });
  }, [
    form,
    initialFilters.brands,
    initialFilters.genders,
    initialFilters.sizes,
    initialFilters.sortBy,
    initialFilters.types,
    pathname,
  ]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <Accordion
          type='multiple'
          defaultValue={filterList.map(({ filterType }) => filterType)}
        >
          <AccordionItem value={'sort'}>
            <AccordionTrigger className='justify-start font-semibold underline-offset-4'>
              {capitalizeFirstLetter(t(I18nTermsSearch.SORT_BY))}:
              <span className='text-white'>a</span>
              <span className='mr-auto font-normal'>
                {
                  sortList.find((field) => field.value === form.watch('sortBy'))
                    ?.label
                }
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name={'sortBy'}
                render={({ field }) => {
                  return (
                    <FormItem className='my-2 flex items-start space-x-3'>
                      <FormControl className='peer'>
                        <RadioGroup
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          {sortList.map((item) => (
                            <div
                              className='flex items-center space-x-2'
                              key={item.value}
                            >
                              <RadioGroupItem
                                className='peer h-7 w-7'
                                value={item.value}
                                id={item.value}
                              />
                              <FormLabel
                                htmlFor={item.value}
                                className='font-normal underline-offset-4 peer-hover:cursor-pointer peer-hover:underline'
                              >
                                {item.label}
                              </FormLabel>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </AccordionContent>
          </AccordionItem>
          {filterList.map(
            ({ filterType, fields, title }) =>
              fields.length > 0 && (
                <AccordionItem value={filterType} key={filterType}>
                  <AccordionTrigger className='font-semibold underline-offset-4'>
                    {title}
                  </AccordionTrigger>
                  <AccordionContent>
                    {fields.map((item) => (
                      <FormField
                        key={item.value}
                        control={form.control}
                        name={filterType as TFilterType}
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.value}
                              className='my-2 flex items-start space-x-3'
                            >
                              <FormControl className='peer'>
                                <Checkbox
                                  className='h-7 w-7'
                                  checked={field.value?.includes(item.value)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...(field.value as string[]),
                                          item.value,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className='font-normal underline-offset-4 peer-hover:cursor-pointer peer-hover:underline'>
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )
          )}
        </Accordion>
        <div className='flex items-center justify-end'>
          <div
            className='mr-6 font-medium hover:cursor-pointer hover:underline hover:underline-offset-4'
            onClick={() => {
              form.reset({
                brands: [],
                genders: [],
                sizes: [],
                types: [],
              });
              router.push(Routes.SEARCH);
            }}
          >
            {capitalizeFirstLetter(t(I18nTermsSearch.CLEAR_FILTERS))}
          </div>
          <Button type='submit'>
            {capitalizeFirstLetter(t(I18nTermsSearch.APPLY))}
          </Button>
        </div>
      </form>
    </Form>
  );
}
