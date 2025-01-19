import { OurClients } from '@/components/Home/OurClients/OurClients';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import { AiServiceTable } from '@/components/Sections/Services/AiServiceTable/AiServiceTable';
import FaqsSection from '@/components/Sections/Services/FAQs/FaqsSection';
import { HeroSection } from '@/components/Sections/Services/HeroSection/HeroSection';
import { HowWeWork } from '@/components/Sections/Services/HowWeWork/HowWeWork';
import { OurCommitment } from '@/components/Sections/Services/OurCommitment/OurCommitment';
import { OurServices } from '@/components/Sections/Services/OurServices/OurServices';
import { TechnologyGrid } from '@/components/Sections/Services/TechnologyGrid/TechnologyGrid';
import TechnologiesUsed from '@/components/Sections/TechnologyUsed/TechnologiesUsed';
import { aiFaq } from '@/data/faqs/aiFaqs';
import {
  commitmentData,
  customDevelopmentExpertiseData,
  customDevelopmentHeroBackgroundImage,
  customDevelopmentHeroButtonLink,
  customDevelopmentHeroButtonText,
  customDevelopmentHeroDescription,
  customDevelopmentHeroHeading,
  customDevelopmentHeroImages,
  customDevelopmentServicelist,
  customDevelopmentServices,
  customDevelopmentServicesDescription,
  customDevelopmentServicesHeading,
  customDevelopmentTechnologies,
  ocdescription,
  ocheading,
  tgdescription,
  tgexpertiseAreas,
  tgheading,
} from '@/data/services/customSoftwareDevelopment';
import { getTranslations, setRequestLocale } from 'next-intl/server';

// Use the imported objects as needed in your component

type ICustomSoftwareDevelopmentProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: ICustomSoftwareDevelopmentProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'CustomSoftwareDevelopment',

  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: t('meta_keywords'),
  };
}

export default async function CustomSoftwareDevelopment(props: ICustomSoftwareDevelopmentProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'About',
  // });

  return (
    <>
      <HeroSection
        heading={customDevelopmentHeroHeading}
        description={customDevelopmentHeroDescription}
        buttonText={customDevelopmentHeroButtonText}
        buttonLink={customDevelopmentHeroButtonLink}
        backgroundImage={customDevelopmentHeroBackgroundImage}
        images={customDevelopmentHeroImages}
      />
      <OurClients />
      <OurServices
        heading={customDevelopmentServicesHeading}
        description={customDevelopmentServicesDescription}
        serviceLists={customDevelopmentServicelist}
        serviceMapping={customDevelopmentServices}
      />
      <TechnologyGrid
        heading={tgheading}
        description={tgdescription}
        expertiseAreas={tgexpertiseAreas}
        extraDataMapping={customDevelopmentExpertiseData}
      />
      <TechnologiesUsed
        technologies={customDevelopmentTechnologies}
        title="Our custom software development tech stack"
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
      <EvaluateBusiness />
    </>
  );
};
