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
import { mobileFaqs } from '@/data/faqs/mobileFaqs';
import {
  backgroundImage,
  commitmentData,
  header,
  mobileDevelomentTechnologies,
  mobileDevelopmentHeroBackgroundImage,
  mobileDevelopmentHeroButtonLink,
  mobileDevelopmentHeroButtonText,
  mobileDevelopmentHeroDescription,
  mobileDevelopmentHeroHeading,
  mobileDevelopmentHeroImages,
  mobileDevelopmentServicelist,
  mobileDevelopmentServices,
  mobileDevelopmentServicesDescription,
  mobileDevelopmentServicesHeading,
  ocdescription,
  ocheading,
  tgdescription,
  tgexpertiseAreas,
  tgExpertiseData,
  tgheading,
} from '@/data/services/mobileDevelopment';
import { getTranslations, setRequestLocale } from 'next-intl/server';

// Use the imported objects as needed in your component

type IMobileDevelopmentProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IMobileDevelopmentProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'MobileDevelopment',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: t('meta_keywords'),
    alternates: {
      canonical: `/mobile-app-development-services`
    }
  };
}

export default async function MobileDevelopment(props: IMobileDevelopmentProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'About',
  // });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': mobileFaqs.map(faq => ({
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
        'item': `/`
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Mobile App Development Services',
        'item': `/mobile-app-development-services`
      }
    ]
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
        heading={mobileDevelopmentHeroHeading}
        description={mobileDevelopmentHeroDescription}
        buttonText={mobileDevelopmentHeroButtonText}
        buttonLink={mobileDevelopmentHeroButtonLink}
        backgroundImage={mobileDevelopmentHeroBackgroundImage}
        images={mobileDevelopmentHeroImages}
      />
      <OurClients />
      <OurServices
        heading={mobileDevelopmentServicesHeading}
        description={mobileDevelopmentServicesDescription}
        serviceLists={mobileDevelopmentServicelist}
        serviceMapping={mobileDevelopmentServices}
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
        technologies={mobileDevelomentTechnologies}
        title="Our mobile application development tech stack"
        subtitle="Our go-to tech for unmatched results"
      />
      {/* <TechStack techStack="mobile app" /> */}
      <AiServiceTable />
      <HowWeWork />
      <OurCommitment
        heading={ocheading}
        description={ocdescription}
        commitmentData={commitmentData}
      />
      <FaqsSection faqs={mobileFaqs} />
      <EvaluateBusiness
        heading="We’re not waiting for the future; we’re actively building with businesses"
        description="Start your transformation today and promote your development goals with a top-tier global team that pushes the boundaries of innovation every single day."
      />
    </>
  );
};
