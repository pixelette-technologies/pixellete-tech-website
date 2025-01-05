import BrilliantIdea from '@/components/BrillientIdeas/BrilliantIdea';
import ClutchForm from '@/components/Clutch/ClutchForm/ClutchForm';
import StartupStats from '@/components/Clutch/StartupStats/StartupStats';
import { Container } from '@/components/Feature/Container/Container';
import { OurClients } from '@/components/Home/OurClients/OurClients';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import './index.css';
import AwardWinning from '@/components/Clutch/AwarWinning/AwardWinning';
import NoDeveloperReq from '@/components/Clutch/NoDeveloperReq/NoDeveloperReq';
import { Testimonial } from '@/components/Home/Testimonial/Testimonial';
import { clFaqs } from '@/data/faqs/clFaqs';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import FaqsSection from '@/components/Sections/Services/FAQs/FaqsSection';

type IAIservicesProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IAIservicesProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'About',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Clutch(props: IAIservicesProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <div className="clutch-container">
      <div className="specialSection-backgroundd">
          <img src="/images/Clutch/background.webp" alt="background" />
        </div>
        <div className="heroSectionAiServices-background">
          {/* <img src="/images/aiServices/heroSectionBackground.svg" alt="background" /> */}
          <div className="pixelate-logo">
            <Container className="main margins">
              <Link href="/">
                <img src="/images/Clutch/logo.svg" alt="" />
              </Link>
            </Container>
          </div>
          <ClutchForm />
          <OurClients />
          <StartupStats />
          <BrilliantIdea />
          <AwardWinning/>
          <NoDeveloperReq
          heading={<>100+ clients never had to hire tech staff</>}
          text={
            <>
              We handle all the development for you. All you need to do is share
              your vision, and we turn it into your platform&apos;s Minimum
              Viable Product. You don&apos;t have to waste months and thousands
              of dollars assembling a team of in-house developers. Focus on what
              you do best while we figure out the technical stuff.
            </>
          }
          btnText="Book a discovery call"
          text2={<></>}
        />
        <Testimonial/>
        <FaqsSection faqs={clFaqs}/>
        <EvaluateBusiness/>
        </div>
      </div>
    </>
  );
};
