import HeroSection from '@/components/CaseStudies/HeroSection/HeroSection';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type IAboutProps = {
  params: Promise<{ slug: string; locale: string }>;
};

const clutchLogos = [
  {
    src: '/images/Clutch/clutch-badges/blockchain/final/blockchain-company-uk.png',
    alt: 'Blockchain Company UK',
  },

  {
    src: '/images/Clutch/clutch-badges/software/most-reviewed-web-dev-clutch.png',
    alt: 'Most Reviewed Web Development Company',
  },
  {
    src: '/images/Clutch/clutch-badges/ai/top-company-generative-ai.png',
    alt: 'Top Generative AI Company',
  },
  {
    src: '/images/Clutch/clutch-badges/ai/final/top-ai-company-uk.png',
    alt: 'Top AI Company UK',
  },
  {
    src: '/images/Clutch/clutch-badges/blockchain/final/top-blockchain-clutch.png',
    alt: 'Top Blockchain Company',
  },
  {
    src: '/images/Clutch/clutch-badges/blockchain/final/top-tokenization.png',
    alt: 'Top Tokenization Company',
  },
];

export async function generateMetadata(props: IAboutProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'ContactUs',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: '/contact-us',
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
      <HeroSection
        heading="Let’s turn your ideas into successful outcomes"
        description={(
          <>
            Have a project in mind? You couldn’t have come to a better place. We’re a global team with 200+ successful projects that pushes the boundaries of innovation every single day.
            <br />
            {' '}
            Connect with our team to a free-of-cost, 30 minute discovery call to see how we can turn your ideas into reality, or turn around a project gone bad.
          </>
        )}
      />
      {/* <Map /> */}
      <EvaluateBusiness
        heading="Ready to become a tech success story?"
        description="Don’t let technical hurdles stand in the way of building powerful tech solutions. Let us help you bring your vision to life with innovative, cost-effective and reliable services. Get in touch!"
        clutchLogos={clutchLogos}
      />
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
