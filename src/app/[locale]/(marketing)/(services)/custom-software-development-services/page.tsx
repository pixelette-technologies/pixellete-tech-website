import { OurClients } from '@/components/Home/OurClients/OurClients';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import { AiServiceTable } from '@/components/Sections/Services/AiServiceTable/AiServiceTable';
import FaqsSection from '@/components/Sections/Services/FAQs/FaqsSection';
import { HeroSection } from '@/components/Sections/Services/HeroSection/HeroSection';
import { HowWeWork } from '@/components/Sections/Services/HowWeWork/HowWeWork';
import { OurServices } from '@/components/Sections/Services/OurServices/OurServices';
import { TechnologyGrid } from '@/components/Sections/Services/TechnologyGrid/TechnologyGrid';
import TechnologiesUsed from '@/components/Sections/TechnologyUsed/TechnologiesUsed';
import { softwareFaqs } from '@/data/faqs/softwareFaqs';
import {
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
  tgdescription,
  tgexpertiseAreas,
  tgheading,
} from '@/data/services/customSoftwareDevelopment';
import { pageOpenGraph } from '@/utils/og';
import { buildBreadcrumbSchema } from '@/utils/schema-helpers';
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
    alternates: {
      canonical: `/custom-software-development-services`,
    },
    openGraph: pageOpenGraph('/custom-software-development-services'),
  };
}

export default async function CustomSoftwareDevelopment(props: ICustomSoftwareDevelopmentProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'About',
  // });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Custom Software Development Services', path: '/custom-software-development-services' },
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
      {/* <OurCommitment
        heading={ocheading}
        description={ocdescription}
        commitmentData={commitmentData}
      /> */}
      <FaqsSection faqs={softwareFaqs} />
      <EvaluateBusiness
        heading="We’re not waiting for the future; we’re actively building with businesses"
        description="Start your transformation today and promote your development goals with a top-tier global team that pushes the boundaries of innovation every single day."
      />
    </>
  );
};
