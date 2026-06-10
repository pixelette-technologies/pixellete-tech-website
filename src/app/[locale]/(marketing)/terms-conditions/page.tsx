import { Container } from '@/components/Feature/Container/Container';
import DetailsNavigate from '@/components/Policies/DetailNavigate/DetailsNavigate';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import BreadcrumbJsonLd from '@/components/SEO/BreadcrumbJsonLd';
import { termAndConditions } from '@/data/policies/termAndConditions';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import './index.css';

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
    alternates: {
      canonical: '/terms-conditions',
    },
    openGraph: {
      url: 'https://pixelettetech.com/terms-conditions',
    },
  };
}

export default async function PrivacyPolicy(props: IAIservicesProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Terms & Conditions', path: '/terms-conditions' },
        ]}
      />
      <Container className="main">
        <div className="privacyPolicy-background">
          <img loading="lazy"
            src="/images/policies/privacyPoliciesBackGround.svg"
            alt="background"
          />
        </div>
      </Container>
      <Container className="main margins">
        <div className="privacyPolicy" id="sideMargin">
          <center>
            <h1>
              Terms & Conditions
            </h1>
            <p>
              Before using Pixelette Technologies’ services and solutions, it is highly important to go through our company’s terms and conditions. A reminder: Pixelette Technologies will not be responsible if our customers fail to go through our terms & conditions.
            </p>
          </center>
          <DetailsNavigate
            data={termAndConditions}
            headingIndex
            overViewIndex
            headerSection={false}
          />
        </div>
      </Container>
      <EvaluateBusiness
        heading="Ready to become a tech success story?"
        description="Don’t let technical hurdles stand in the way of building powerful tech solutions. Let us help you bring your vision to life with innovative, cost-effective and reliable services. Get in touch!"
      />
    </>
  );
};
