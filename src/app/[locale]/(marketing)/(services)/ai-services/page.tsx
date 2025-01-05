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
        serviceLists={[
          {
            title: 'AI Solutions',
            items: [
              'Generative AI',
              'AI Security',
              'AI Design',
              'AI Ops',
              'Automation Solutions',
            ],
          },
          {
            title: 'AI Applications',
            items: [
              'Chatbots & Conversational AI',
              'Recommendations Engines',
              'AI-as-a-Service (AIaaS)',
              'AI Product Development',
              'Predictive Modeling',
            ],
          },
        ]}
        highlightedService={{
          imageSrc: '/images/aiServices/s_1.svg',
          title: 'Generative AI',
          description:
      'We are recognized as a leading generative AI development company and bring deep expertise in generative AI tools like GPT-4, GPT-3.5, and DALL-E. Our models provide visual content analysis to aid in brand identity, data analysis, business intelligence, and visualization, offering tailored generative AI development services.',
        }}
        serviceMapping={{
          'Generative AI': {
            imageSrc: '/images/aiServices/s_1.svg',
            title: 'Generative AI',
            description:
              'We are recognized as a leading generative AI development company and bring deep expertise in generative AI tools like GPT-4, GPT-3.5, and DALL-E. Our models provide visual content analysis to aid in brand identity, data analysis, business intelligence, and visualization, offering tailored generative AI development services.',
          },
          'AI Security': {
            imageSrc: '/images/aiServices/s_2.svg',
            title: 'AI Security',
            description:
              'Our AI security solutions leverage advanced machine learning algorithms to detect and prevent cyber threats in real time, ensuring robust and reliable system protection.',
          },
          'AI Design': {
            imageSrc: '/images/aiServices/s_3.svg',
            title: 'AI Design',
            description:
              'We provide cutting-edge AI-powered design solutions that enhance user experiences, optimize workflows, and drive creative innovation.',
          },
          'AI Ops': {
            imageSrc: '/images/aiServices/s_4.svg',
            title: 'AI Ops',
            description:
              'Streamline your operations with AI-driven automation and insights that improve efficiency, reduce downtime, and maximize productivity.',
          },
          'Automation Solutions': {
            imageSrc: '/images/aiServices/s_5.svg',
            title: 'Automation Solutions',
            description:
              'Implement intelligent automation solutions that empower businesses to achieve greater accuracy, speed, and scalability in their operations.',
          },
          'Chatbots & Conversational AI': {
            imageSrc: '/images/aiServices/s_6.svg',
            title: 'Chatbots & Conversational AI',
            description:
              'Develop interactive chatbots and conversational AI tools that deliver personalized customer engagement and support.',
          },
          'Recommendations Engines': {
            imageSrc: '/images/aiServices/s_1.svg',
            title: 'Recommendations Engines',
            description:
              'Build recommendation systems that provide users with highly relevant suggestions, enhancing user satisfaction and retention.',
          },
          'AI-as-a-Service (AIaaS)': {
            imageSrc: '/images/aiServices/s_2.svg',
            title: 'AI-as-a-Service (AIaaS)',
            description:
              'Deliver scalable AI capabilities on-demand, enabling businesses to quickly integrate AI into their processes.',
          },
          'AI Product Development': {
            imageSrc: '/images/aiServices/s_3.svg',
            title: 'AI Product Development',
            description:
              'Create innovative AI-driven products that cater to specific business needs, leveraging advanced AI technologies.',
          },
          'Predictive Modeling': {
            imageSrc: '/images/aiServices/s_4.svg',
            title: 'Predictive Modeling',
            description:
              'Harness the power of predictive analytics to forecast trends, identify opportunities, and make data-driven decisions.',
          },
        }}
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
