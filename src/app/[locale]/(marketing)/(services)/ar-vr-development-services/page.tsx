import { OurClients } from '@/components/Home/OurClients/OurClients';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import { CallToAction } from '@/components/Sections/Services/CallToAction/CallToAction';
import { EngagementModels } from '@/components/Sections/Services/EngagementModels/EngagementModels';
import ExpertiseGrid from '@/components/Sections/Services/ExpertiseGrid/ExpertiseGrid';
import FaqsSection from '@/components/Sections/Services/FAQs/FaqsSection';
import { HeroSection } from '@/components/Sections/Services/HeroSection/HeroSection';
import { HowWeWork } from '@/components/Sections/Services/HowWeWork/HowWeWork';
import { OurServices } from '@/components/Sections/Services/OurServices/OurServices';
import { TechnologyGrid } from '@/components/Sections/Services/TechnologyGrid/TechnologyGrid';
import { VideoShowcase } from '@/components/Sections/Services/VideoShowcase/VideoShowcase';
import TechnologiesUsed from '@/components/Sections/TechnologyUsed/TechnologiesUsed';
import { expertiseArVrChangeData, technologyGridChangeData } from '@/data/expertise/expertiseAiChangeData';
import { arFaqs } from '@/data/faqs/arFaqs';
import {
  aiHeroButtonLink,
  aiHeroButtonText,
  aiHeroDescription,
  aiHeroHeading,
  arVrbackgroundImage,
  arVrCta,
  arVrServicesDescription,
  arVrServicesHeading,
  engagementModels,
  header,
  tgdescription,
  tgexpertiseAreas,
  tgExpertiseData,
  tgheading,
  vrHeroBackgroundImage,
  vrServicelist,
  vrServices,
  vrTechnologies,
} from '@/data/services/arVR';
import { arVrVideoShowcaseData } from '@/data/services/videoShowcaseData';
import { getTranslations, setRequestLocale } from 'next-intl/server';

// Use the imported objects as needed in your component

type IARVRProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IARVRProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'VrAr',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: t('meta_keywords'),
    alternates: {
      canonical: `/ar-vr-development-services`,
    },
  };
}

export default async function ARVR(props: IARVRProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'About',
  // });
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': arFaqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': `/`,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'AR/VR Development Services',
        'item': `/ar-vr-development-services`,
      },
    ],
  };
  // <script
  //       type="application/ld+json"
  //       dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
  //     />
  const formattedFaqs = arFaqs.map(faq => ({
    ...faq,
    list: (faq as { list?: string[] }).list ?? [],
  }));
  const clutchLogos = [
    {
      src: '/images/Clutch/clutch-badges/blockchain/most-reviewed-blockchain-company.png',
      alt: 'Most reviewed Blockchain Company UK',
    },
    {
      src: '/images/Clutch/clutch-badges/blockchain/top-company-blockchain-company.png',
      alt: 'Top Blockchain Company UK',
    },
    {
      src: '/images/Clutch/clutch-badges/blockchain/top-company-web3-development.png',
      alt: 'Top web3 development Company',
    },
    {
      src: '/images/Clutch/clutch-badges/blockchain/top-decentralized-finance-company.png',
      alt: 'Top defi Company',
    },
    {
      src: '/images/Clutch/clutch-badges/blockchain/top-smart-contract-development-company.png',
      alt: 'Top smart contract development Company',
    },
    {
      src: '/images/Clutch/clutch-badges/blockchain/top-tokenization-company.png',
      alt: 'Top tokenization Company',
    },
  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HeroSection
        heading={aiHeroHeading}
        serviceName="AR/VR Development Services"
        description={aiHeroDescription}
        buttonText={aiHeroButtonText}
        buttonLink={aiHeroButtonLink}
        backgroundImage={vrHeroBackgroundImage}
        images={[]}
      />

      <div style={{ overflowX: 'hidden' }}>
        <OurClients />

        <OurServices
          heading={arVrServicesHeading}
          description={arVrServicesDescription}
          serviceLists={vrServicelist}
          serviceMapping={vrServices}
        />

        <ExpertiseGrid
          header={header}
          marqueeData={expertiseArVrChangeData}
          backgroundImage={arVrbackgroundImage}
        />

        <VideoShowcase
          title="Explore Our Immersive Showcases"
          subtitle="A glimpse into the virtual worlds we've built, designed to inspire, engage, and redefine what's possible with AR and VR."
          videos={arVrVideoShowcaseData}
        />

        <TechnologyGrid
          heading={tgheading}
          description={tgdescription}
          expertiseAreas={tgexpertiseAreas}
          marqueeData={technologyGridChangeData}
          extraDataMapping={tgExpertiseData}
        />
        <TechnologiesUsed
          technologies={vrTechnologies}
          title="Our AR/VR technology ecosystem"
          subtitle=" We combine the best platforms, SDKs, and engines to build experiences that perform flawlessly across every device."
        />

        <EngagementModels models={engagementModels} />

        {/* <AiServiceTable /> */}
        <HowWeWork />
        {/* <OurCommitment
        heading={ocheading}
        description={ocdescription}
        commitmentData={commitmentData}
      /> */}
        <FaqsSection faqs={formattedFaqs} />
        <CallToAction
          heading={arVrCta.heading}
          description={arVrCta.description}
          buttonText={arVrCta.buttonText}
          buttonLink={arVrCta.buttonLink}
        />

        <EvaluateBusiness
          heading="Ready to become a tech
success story?"
          description="Don’t let technical hurdles stand in the way of building tech solutions that
shake up the world as we know it. Let us help you bring your vision to life with
innovative, cost-effective and reliable services. Get in touch!"
          clutchLogos={clutchLogos}
        />
      </div>
    </>
  );
};
