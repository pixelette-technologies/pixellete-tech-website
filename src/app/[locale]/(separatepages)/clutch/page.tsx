import BrilliantIdea from '@/components/BrillientIdeas/BrilliantIdea';
import AwardWinning from '@/components/Clutch/AwarWinning/AwardWinning';
import ClutchForm from '@/components/Clutch/ClutchForm/ClutchForm';
import NoDeveloperReq from '@/components/Clutch/NoDeveloperReq/NoDeveloperReq';
import StartupStats from '@/components/Clutch/StartupStats/StartupStats';
import { Container } from '@/components/Feature/Container/Container';
import { Footer } from '@/components/footer/Footer';
import { OurClients } from '@/components/Home/OurClients/OurClients';
import { Testimonial } from '@/components/Home/Testimonial/Testimonial';
import FaqsSection from '@/components/Sections/Services/FAQs/FaqsSection';
import BreadcrumbJsonLd from '@/components/SEO/BreadcrumbJsonLd';
import { clFaqs } from '@/data/faqs/clFaqs';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import './index.css';

type IAIservicesProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IAIservicesProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'clutchPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: t('meta_keywords'),
    alternates: {
      canonical: '/clutch',
    },
  };
}

export default async function Clutch(props: IAIservicesProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Clutch Reviews', path: '/clutch' },
        ]}
      />
      <div className="specialSection-backgroundd">
        {/* <img loading="lazy" src="/images/Clutch/background.webp" alt="background" /> */}
      </div>
      <div className="clutch-container">
        <div className="heroSectionAiServices-background">
          {/* <img loading="lazy" src="/images/aiServices/heroSectionBackground.svg" alt="background" /> */}
          <div className="pixelate-logo" id="sideMargin">
            <Container className="main margins">
              <Link href="/" className="logo-link">
                <span>
                  <img src="/images/Clutch/logo.svg" alt="Clutch" />
                </span>
              </Link>
            </Container>
          </div>
          <ClutchForm />
          <OurClients />
          <StartupStats />
          <BrilliantIdea />
          <AwardWinning />
          <NoDeveloperReq
            heading={<>100+ clients never had to hire tech staff</>}
            text={(
              <>
                We handle all the development for you. All you need to do is share
                your vision, and we turn it into your platform&apos;s Minimum
                Viable Product. You don&apos;t have to waste months and thousands
                of dollars assembling a team of in-house developers. Focus on what
                you do best while we figure out the technical stuff.
              </>
            )}
            btnText="Book a discovery call"
            text2={<></>}
          />
          <Testimonial />
          <FaqsSection faqs={clFaqs} />
          <Footer />
          {/* <EvaluateBusiness
            heading="Ready to become a tech success story?"
            description="Don’t let technical hurdles stand in the way of building powerful tech solutions. Let us help you bring your vision to life with innovative, cost-effective and reliable services. Get in touch!"
          /> */}
        </div>
      </div>
    </>
  );
};
