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
import { arFaqs } from '@/data/faqs/arFaqs';
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
  commitmentData,
  header,
  ocdescription,
  ocheading,
  tgdescription,
  tgexpertiseAreas,
  tgExpertiseData,
  tgheading,
  vrServicelist,
  vrServices,
  vrTechnologies,
} from '@/data/services/arVR';
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
  };
}

export default async function ARVR(props: IARVRProps) {
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
        serviceLists={vrServicelist}
        serviceMapping={vrServices}
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
        technologies={vrTechnologies}
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
      <FaqsSection faqs={arFaqs} />
      <EvaluateBusiness
        heading="We’re not waiting for the future; we’re actively building with businesses"
        description="Start your transformation today and promote your development goals with a top-tier global team that pushes the boundaries of innovation every single day."
      />
    </>
  );
};
