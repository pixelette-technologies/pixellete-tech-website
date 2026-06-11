import { OurClients } from '@/components/Home/OurClients/OurClients';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import { AiServiceTable } from '@/components/Sections/Services/AiServiceTable/AiServiceTable';
import ExpertiseGrid from '@/components/Sections/Services/ExpertiseGrid/ExpertiseGrid';
// import FaqsSection from '@/components/Sections/Services/FAQs/FaqsSection';
import FaqsSection from '@/components/Sections/Services/FAQs/FaqsSection';
import { HeroSection } from '@/components/Sections/Services/HeroSection/HeroSection';
import { HowWeWork } from '@/components/Sections/Services/HowWeWork/HowWeWork';
import { OurServices } from '@/components/Sections/Services/OurServices/OurServices';
import { TechnologyGrid } from '@/components/Sections/Services/TechnologyGrid/TechnologyGrid';
import TechnologiesUsed from '@/components/Sections/TechnologyUsed/TechnologiesUsed';
import { expertiseAiChangeData } from '@/data/expertise/expertiseAiChangeData';
import { uiFaqs } from '@/data/faqs/uiFaqs';
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
  header,
  tgdescription,
  tgexpertiseAreas,
  tgExpertiseData,
  tgheading,
  uiuxServicelist,
  uiuxServices,
  uiuxTechnologies,
} from '@/data/services/uiUX';
import { pageOpenGraph } from '@/utils/og';
import { buildBreadcrumbSchema } from '@/utils/schema-helpers';
import { getTranslations, setRequestLocale } from 'next-intl/server';

// Use the imported objects as needed in your component

type IUIUXProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IUIUXProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'UiUx',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: t('meta_keywords'),
    alternates: {
      canonical: `/ui-ux-design-services`,
    },
    openGraph: pageOpenGraph('/ui-ux-design-services'),
  };
}

export default async function UIUX(props: IUIUXProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'About',
  // });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'UI/UX Design Services', path: '/ui-ux-design-services' },
  ]);
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
        serviceLists={uiuxServicelist}
        serviceMapping={uiuxServices}
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
        technologies={uiuxTechnologies}
        title="Our custom software development tech stack"
        subtitle="Our go-to tech for unmatched results"
      />
      {/* <TechStack techStack="UI/UX design &" /> */}
      <AiServiceTable />
      <HowWeWork />
      {/* <OurCommitment
        heading={ocheading}
        description={ocdescription}
        commitmentData={commitmentData}
      /> */}
      <FaqsSection faqs={uiFaqs} />
      <EvaluateBusiness
        heading="We’re not waiting for the future; we’re actively building with businesses"
        description="Start your transformation today and promote your development goals with a top-tier global team that pushes the boundaries of innovation every single day."
      />
    </>
  );
};
