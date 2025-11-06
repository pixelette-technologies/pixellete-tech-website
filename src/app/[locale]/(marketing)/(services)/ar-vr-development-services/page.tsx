import { OurClients } from '@/components/Home/OurClients/OurClients';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import { AiServiceTable } from '@/components/Sections/Services/AiServiceTable/AiServiceTable';
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
        backgroundImage={vrHeroBackgroundImage}
        images={[]}
      />

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
      <FaqsSection faqs={arFaqs} />
      <EvaluateBusiness
        heading="We’re not waiting for the future; we’re actively building with businesses"
        description="Start your transformation today and promote your development goals with a top-tier global team that pushes the boundaries of innovation every single day."
      />
    </>
  );
};
