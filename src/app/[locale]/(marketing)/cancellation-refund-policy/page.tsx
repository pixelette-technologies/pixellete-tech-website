import { Container } from '@/components/Feature/Container/Container';
import DetailsNavigate from '@/components/Policies/DetailNavigate/DetailsNavigate';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import { refundPolicy } from '@/data/policies/refundPolicy';
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
      canonical: '/cancellation-refund-policy',
    },
  };
}

export default async function PrivacyPolicy(props: IAIservicesProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      {/* BreadcrumbList JSON-LD (server-rendered), audit P1-47/P6-19 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://pixelettetech.com/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Cancellation & Refund Policy\",\"item\":\"https://pixelettetech.com/cancellation-refund-policy\"}]}" }} />
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
              Our Cancellation and Refund Policy
            </h1>
            <p>
              All clients consent to Pixelette Technologies’ cancellation and refund policy. This consent is given as soon as all customers avail any of our services and solutions.
            </p>
          </center>
          <DetailsNavigate
            data={refundPolicy}
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
