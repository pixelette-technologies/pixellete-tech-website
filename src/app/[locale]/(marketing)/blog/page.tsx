import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Blog } from '@/components/Blogging/Blog/Blog';
import { getAllBlogs } from '@/lib/blog';

type IBlogProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IBlogProps) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Blogs' });
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Blogs(props: IBlogProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const blogData = getAllBlogs();
  return <Blog blogdata={blogData} />;
}
