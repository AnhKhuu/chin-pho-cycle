import { Form, FormControl, FormField, FormItem, Input } from '@/components';
import { I18nTermsFooter } from '@/utils/constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Facebook, Instagram, MoveRight, MoveUp, Youtube } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function Footer() {
  const t = useTranslations('Footer');
  const formSchema = z.object({
    email: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };
  return (
    <footer className='relative grid grid-cols-3 gap-32 bg-primary px-6 py-20'>
      <div className='col-span-1'>
        <Image
          src='/images/CPC-footer.png'
          width={217}
          height={69}
          sizes='100vw'
          alt='logo'
          className='mb-12'
        />
        <p className='mb-12 max-w-[217px] font-bold text-white'>
          {t(I18nTermsFooter.COMPANY_ADDRESS)}
        </p>
        <Link
          href='tel: 0905188344'
          className='block font-normal text-white underline-offset-4 hover:underline'
        >
          Phone: 0905 188 344
        </Link>
        <Link
          href='mailto:chinphocyclevietnam@gmail.com'
          className='mb-24 block font-normal text-white underline-offset-4 hover:underline'
        >
          Email: chinphocyclevietnam@gmail.com
        </Link>
        <p className='mb-6 max-w-[350px] font-bold text-gray-300'>
          {t(I18nTermsFooter.KEEP_UP)}
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl className='hidden lg:block'>
                    <div className='relative w-80'>
                      <Input
                        type='text'
                        placeholder={t(I18nTermsFooter.ENTER_EMAIL)}
                        className='rounded border-none bg-slate-300 pl-4 pr-4'
                        {...field}
                      />
                      <MoveRight className='absolute bottom-0 right-3 top-2 text-black' />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className='col-span-2 grid grid-cols-4 gap-2 text-gray-300 '>
        <div className='col-span-1'>
          <p className='mb-16 mt-7 font-normal'>
            {t(I18nTermsFooter.CUSTOMER_SERVICE).toUpperCase()}
          </p>
          <div className='mb-32 font-bold'>
            <Link href={'/'} className='mb-4 block'>
              {t(I18nTermsFooter.FAQ)}
            </Link>
            <Link href={'/'} className='mb-4 block'>
              {t(I18nTermsFooter.RETURNS)}
            </Link>
            <Link href={'/'} className='mb-4 block'>
              {t(I18nTermsFooter.SHIPPING)}
            </Link>
            <Link href={'/'} className='mb-4 block'>
              {t(I18nTermsFooter.CRASH_REPLACEMENT)}
            </Link>
            <Link href={'/'} className='mb-4 block'>
              {t(I18nTermsFooter.CARE_GUIDE)}
            </Link>
          </div>
          <div className='flex items-center text-white'>
            <Link href={'/'} className='mr-4'>
              <Facebook />
            </Link>
            <Link href={'/'} className='mr-4'>
              <Instagram />
            </Link>
            <Link href={'/'} className='mr-4'>
              <Youtube />
            </Link>
          </div>
        </div>
        <div className='col-span-1'>
          <p className='mb-16 mt-7 font-normal'>
            {t(I18nTermsFooter.ABOUT_US).toUpperCase()}
          </p>
          <div className='font-bold'>
            <Link href={'/'} className='mb-4 block'>
              {t(I18nTermsFooter.ABOUT)}
            </Link>
            <Link href={'/'} className='mb-4 block'>
              {t(I18nTermsFooter.STORE)}
            </Link>
            <Link href={'/'} className='mb-4 block'>
              {t(I18nTermsFooter.OUR_COMMUNITY)}
            </Link>
            <Link href={'/'} className='mb-4 block'>
              {t(I18nTermsFooter.POLICY)}
            </Link>
            <Link href={'/'} className='mb-4 block'>
              {t(I18nTermsFooter.TERM_AND_CONDITION)}
            </Link>
          </div>
        </div>
        <div className='col-span-2 h-48'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15677.327891273693!2d106.6749339!3d10.7858662!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ff70edc76f5%3A0xff9a9cfdcba820a4!2sChinPho%20Cycle%20VietNam!5e0!3m2!1sen!2s!4v1701008819627!5m2!1sen!2s'
            width='400'
            height='300'
            style={{ border: 0 }}
            allowFullScreen={false}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
          <p className='mt-32 text-xs font-light'>
            © 2023 Chin Pho Cycle Vietnam. All rights reserved.
          </p>
        </div>
      </div>
      <div className='absolute bottom-24 right-6 flex justify-end'>
        <div
          className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white'
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        >
          <MoveUp className='text-black' />
        </div>
      </div>
    </footer>
  );
}
