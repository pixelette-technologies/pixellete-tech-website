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
import { TechStack } from '@/components/Sections/Services/TechStack/TechStack';
import { expertiseAiChangeData } from '@/data/expertise/expertiseAiChangeData';
import { aiFaq } from '@/data/faqs/aiFaqs';
import {
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
  backgroundImage,
  commitmentData,
  extraDataMapping,
  header,
  ocdescription,
  ocheading,
  tgdescription,
  tgexpertiseAreas,
  tgheading,
} from '@/data/services/aiServices';
import { getTranslations, setRequestLocale } from 'next-intl/server';

// Use the imported objects as needed in your component

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

export default async function AIservices(props: IAIservicesProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'About',
  // });

  return (
    <>
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
        extraDataMapping={extraDataMapping}
      />
      <TechStack />
      <AiServiceTable />
      <HowWeWork />
      <OurCommitment
        heading={ocheading}
        description={ocdescription}
        commitmentData={commitmentData}
      />
      <FaqsSection faqs={aiFaq} />
      <EvaluateBusiness />
    </>
  );
};
