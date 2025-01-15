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
  aiServicesDescription,
  aiServicesHeading,
  backgroundImage,
  commitmentData,
  header,
  ocdescription,
  ocheading,
  tgdescription,
  tgexpertiseAreas,
  tgheading,
} from '@/data/services/uiUX';
import { getTranslations, setRequestLocale } from 'next-intl/server';

// Use the imported objects as needed in your component

type IUIUXProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IUIUXProps) {
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

export default async function UIUX(props: IUIUXProps) {
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
        serviceLists={[
          {
            title: 'AI Solutions',
            items: [
              'Web and Mobile UI/UX Design',
              'App and Website Redesign',
              'UI/UX Design Audit',
              'Design Concept Development',
            ],
          },
          {
            title: 'AI Applications',
            items: [
              'UI/UX Design Research',
              'Design Strategy Development',
              'Digital Product Design and Development Consulting',
            ],
          },
        ]}
        highlightedService={{
          imageSrc: '/images/aiServices/s_1.svg',
          title: 'Web and Mobile UI/UX Design',
          description:
      'As a top UI UX design agency, we offer end-to-end digital product strategy consulting that strengthens your app’s value. Our experts assess architecture, understand business dynamics, and provide strategic guidance on complex challenges to set you on a success path.',
        }}
      />

      <ExpertiseGrid
        header={header}
        marqueeData={expertiseAiChangeData}
        backgroundImage={backgroundImage}
      />
      {/* <TechnologyGrid
        heading={tgheading}
        description={tgdescription}
        expertiseAreas={tgexpertiseAreas}
      /> */}
      <TechStack techStack="UI/UX design &" />
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
