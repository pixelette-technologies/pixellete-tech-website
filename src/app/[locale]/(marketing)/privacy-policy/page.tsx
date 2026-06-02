import { Container } from '@/components/Feature/Container/Container';
import DetailsNavigate from '@/components/Policies/DetailNavigate/DetailsNavigate';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import { privacyPolicy } from '@/data/policies/privacyPolicy';
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
      canonical: '/privacy-policy',
    },
  };
}

export default async function PrivacyPolicy(props: IAIservicesProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      {/* BreadcrumbList JSON-LD (server-rendered), audit P1-47/P6-19 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://pixelettetech.com/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Privacy Policy\",\"item\":\"https://pixelettetech.com/privacy-policy\"}]}" }} />
      <Container className="main">
        <div className="privacyPolicy-background">
          <img
            src="/images/policies/privacyPoliciesBackGround.svg"
            alt="background"
          />
        </div>
      </Container>
      <Container className="main margins">
        <div className="privacyPolicy" id="sideMargin">
          <center>
            <h1>
              Privacy Policy
            </h1>
            <p>
              Pixelette Technologies is committed to protecting your personal
              information and respecting your privacy. This Privacy Policy
              explains how we collect, use, store and share your personal
              information when you visit our website or use our services. This
              policy is compliant with the General Data Protection Regulation
              (GDPR) of the European Union and the Data Protection Act 2018 of
              the United Kingdom.
            </p>
          </center>
          <DetailsNavigate
            data={privacyPolicy}
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
