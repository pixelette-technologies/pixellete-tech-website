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
import { aiFaq } from '@/data/faqs/aiFaqs';
import {
  aiExpertiseData,
  aiHeroBackgroundImage,
  aiHeroButtonLink,
  aiHeroButtonText,
  aiHeroDescription,
  aiHeroHeading,
  aiHeroImages,
  aiServicelist,
  aiServices,
  aiServicesDescription,
  aiServicesHeading,
  aiTechnologies,
  backgroundImage,
  commitmentData,
  header,
  ocdescription,
  ocheading,
  tgdescription,
  tgexpertiseAreas,
  tgheading,
} from '@/data/services/aiServices';
import { pageOpenGraph } from '@/utils/og';
import { getTranslations, setRequestLocale } from 'next-intl/server';

// Use the imported objects as needed in your component

const clutchLogos = [
  {
    src: '/images/Clutch/clutch-badges/ai/most-reviewed-ai-company.png',
    alt: 'Most reviewed AI Company UK',
  },
  {
    src: '/images/Clutch/clutch-badges/ai/top-company-artificial-intelligence.png',
    alt: 'Top AI Company',
  },
  {
    src: '/images/Clutch/clutch-badges/ai/top-company-generative-ai.png',
    alt: 'Top Generative AI Company',
  },
  {
    src: '/images/Clutch/clutch-badges/ai/top-machine-learning-company.png',
    alt: 'Top Machine learning Company',
  },
  {
    src: '/images/Clutch/clutch-badges/ai/top-recommendation-system-company.png',
    alt: 'Top recommendation system Company',
  },
  {
    src: '/images/Clutch/clutch-badges/ai/top-ai-speech-generation-company.png',
    alt: 'Top ai speech generation Company',
  },
];

type IAIservicesProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IAIservicesProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'AiServices',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: t('meta_keywords'),
    alternates: {
      canonical: `https://pixelettetech.com/ai-development-services`,
    },
    openGraph: pageOpenGraph('/ai-development-services'),
  };
}
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': `https://pixelettetech.com/`,
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'name': 'AI Development Services',
      'item': `https://pixelettetech.com/ai-development-services`,
    },
  ],
};
export default async function AIservices(props: IAIservicesProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'About',
  // });

  return (
    <>
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
        serviceLists={aiServicelist}
        serviceMapping={aiServices}
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
        extraDataMapping={aiExpertiseData}
      />
      <TechnologiesUsed
        technologies={aiTechnologies}
        title="Our AI development tech stack "
        subtitle="Our go-to tech for unmatched results"
      />
      <AiServiceTable />
      <HowWeWork />
      <OurCommitment
        heading={ocheading}
        description={ocdescription}
        commitmentData={commitmentData}
      />
      <FaqsSection faqs={aiFaq} />
      <EvaluateBusiness
        heading="We're not waiting for the future; we're actively building with businesses"
        description="Start your transformation today and promote your development goals with a top-tier global team that pushes the boundaries of innovation every single day."
        clutchLogos={clutchLogos}
      />
    </>
  );
};
