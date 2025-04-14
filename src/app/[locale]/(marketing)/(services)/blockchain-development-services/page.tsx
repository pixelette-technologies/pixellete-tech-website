import { OurClients } from '@/components/Home/OurClients/OurClients';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import { AiServiceTable } from '@/components/Sections/Services/AiServiceTable/AiServiceTable';
import ExpertiseGrid from '@/components/Sections/Services/ExpertiseGrid/ExpertiseGrid';
import FaqsSection from '@/components/Sections/Services/FAQs/FaqsSection';
import { HeroSection } from '@/components/Sections/Services/HeroSection/HeroSection';
import { HowWeWork } from '@/components/Sections/Services/HowWeWork/HowWeWork';
import { OurCommitment } from '@/components/Sections/Services/OurCommitment/OurCommitment';
import { OurServices } from '@/components/Sections/Services/OurServices/OurServices';
import { TechnologyGrid } from '@/components/Sections/Services/TechnologyGrid/TechnologyGrid';
import TechnologiesUsed from '@/components/Sections/TechnologyUsed/TechnologiesUsed';
import { expertiseAiChangeData } from '@/data/expertise/expertiseAiChangeData';
import { blockFaqs } from '@/data/faqs/blockFaqs';
import {
  aiHeroBackgroundImage,
  aiHeroButtonLink,
  aiHeroButtonText,
  aiHeroDescription,
  aiHeroHeading,
  aiHeroImages,
  aiServicesDescription,
  aiServicesHeading,
  backgroundImage,
  blockchainServicelist,
  blockchainServices,
  blockchainTechnologies,
  commitmentData,
  header,
  ocdescription,
  ocheading,
  tgdescription,
  tgexpertiseAreas,
  tgExpertiseData,
  tgheading,
} from '@/data/services/blockchainDevelopment';
import { getTranslations, setRequestLocale } from 'next-intl/server';

// Use the imported objects as needed in your component

type IBlockchainDevelopmentProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IBlockchainDevelopmentProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'BlockchainDevelopment',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: t('meta_keywords'),
    alternates: {
      canonical: `/blockchain-development-services`
    }
  };
}

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
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': `/`
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'name': 'Blockchain Development Services',
      'item': `/blockchain-development-services`
    }
  ]
};
// <script
//       type="application/ld+json"
//       dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
//     />
export default async function BlockchainDevelopment(props: IBlockchainDevelopmentProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'About',
  // });
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': blockFaqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
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
        description={aiHeroDescription}
        buttonText={aiHeroButtonText}
        buttonLink={aiHeroButtonLink}
        backgroundImage={aiHeroBackgroundImage}
        images={aiHeroImages}
      />
      <OurClients />
      <OurServices
        heading={aiServicesHeading}
        description={aiServicesDescription}
        serviceLists={blockchainServicelist}
        serviceMapping={blockchainServices}
      />

      <ExpertiseGrid
        header={header}
        marqueeData={expertiseAiChangeData}
        backgroundImage={backgroundImage}
      />
      <TechnologyGrid
        heading={tgheading}
        description={tgdescription}
        expertiseAreas={tgexpertiseAreas}
        extraDataMapping={tgExpertiseData}
      />
      <TechnologiesUsed
        technologies={blockchainTechnologies}
        title="Our blockchain development tech stack"
        subtitle="Our go-to tech for unmatched results"
      />
      {/* <TechStack techStack="blockchain" /> */}
      <AiServiceTable />
      <HowWeWork />
      <OurCommitment
        heading={ocheading}
        description={ocdescription}
        commitmentData={commitmentData}
      />
      <FaqsSection faqs={blockFaqs} />
      <EvaluateBusiness
        heading="We’re not waiting for the future; we’re actively building with businesses"
        description="Start your transformation today and promote your development goals with a top-tier global team that pushes the boundaries of innovation every single day."
        clutchLogos={clutchLogos}
      />
    </>
  );
};
