import { HeroSection } from '@/components/StartUp/HeroSection/HeroSection';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type IAboutProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IAboutProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'StartUps',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: '/startup-funding',
    },
  };
}

export default async function About(props: IAboutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'About',
  // });

  return (
    <>
      {/* BreadcrumbList JSON-LD (server-rendered), audit P1-47/P6-19 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://pixelettetech.com/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Startup Funding\",\"item\":\"https://pixelettetech.com/startup-funding\"}]}" }} />

      <HeroSection />
      {/* <p>{t('about_paragraph')}</p>

      <div className="mt-2 text-center text-sm">
        {`${t('translation_powered_by')} `}
        <a
          className="text-blue-700 hover:border-b-2 hover:border-blue-700"
          href="https://l.crowdin.com/next-js"
        >
          Crowdin
        </a>
      </div>

      <a href="https://l.crowdin.com/next-js">
        <Image
          className="mx-auto mt-2"
          src="/assets/images/crowdin-dark.png"
          alt="Crowdin Translation Management System"
          width={128}
          height={26}
        />
      </a> */}
    </>
  );
};
