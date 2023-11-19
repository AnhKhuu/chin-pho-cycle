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
} from '@/components';
import { Checkbox } from '@/components/ui/checkbox';
import { TFilterItem, TFilterType, TInitialFilters } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const FormSchema = z.object({
  types: z.array(z.string()).optional(),
  brands: z.array(z.string()).optional(),
  genders: z.array(z.string()).optional(),
});
interface IFilterListProps {
  handleSubmit: (fields: z.infer<typeof FormSchema>) => void;
  filterList: TFilterItem[];
  initialFilters: TInitialFilters;
}

export function FilterList({
  handleSubmit,
  filterList,
  initialFilters,
}: IFilterListProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      types: initialFilters.types,
      brands: initialFilters.brands,
      genders: initialFilters.genders,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <Accordion type='multiple'>
          {filterList.map(({ filterType, fields, title }) => (
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
          ))}
        </Accordion>
        <div className='flex justify-end'>
          <Button
            variant='secondary'
            className='mr-4'
            onClick={() => form.reset()}
          >
            Clear Fields
          </Button>
          <Button type='submit'>Apply</Button>
        </div>
      </form>
    </Form>
  );
}
