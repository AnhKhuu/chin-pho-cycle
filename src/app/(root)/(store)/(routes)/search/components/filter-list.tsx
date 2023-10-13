'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components';
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const FormSchema = z.object({
  items: z.array(z.string()),
});

type FilterItem = {
  filterType: string;
  fields: {
    value: string;
    label: string;
  }[];
};

interface ICheckboxListProps {
  handleSubmit: (data: z.infer<typeof FormSchema>) => void;
  filterList: FilterItem[];
}

export function FilterList({ handleSubmit, filterList }: ICheckboxListProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ data });
    handleSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='items'
          render={() => (
            <FormItem>
              <Accordion type='multiple'>
                {filterList.map(({ filterType, fields }) => (
                  <AccordionItem value={filterType} key={filterType}>
                    <AccordionTrigger className='font-semibold underline-offset-4'>
                      {filterType}
                    </AccordionTrigger>
                    <AccordionContent>
                      {fields.map((item) => (
                        <FormField
                          key={item.value}
                          control={form.control}
                          name='items'
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
                                            ...field.value,
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
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
