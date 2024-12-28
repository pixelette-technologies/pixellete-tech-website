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
import { getTranslations, setRequestLocale } from 'next-intl/server';

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

  const header = {
    title: 'Technology for every industry, success for every client',
    description:
      'Our solutions are custom-built to push existing technological boundaries and meet the specific needs of every sector we serve.',
  };

  const backgroundImage = '/images/aiServices/serviceSectionBackground.svg';

  const tgheading = 'Our AI development service expertise';
  const tgdescription
  = 'Pixelette Technologies has been a globally trusted artificial intelligence development company for 6 years. We have top AI development talent that makes use of the latest AI tools and technologies to drive exponential business growth for our clients.';
  const tgexpertiseAreas = [
    { title: 'Machine Learning' },
    { title: 'Deep Learning' },
    { title: 'Natural Language Processing (NLP)' },
    { title: 'Robotic Process Automation' },
    { title: 'Computer Vision' },
    {
      title: 'Machine Learning',
      description:
      'Our machine learning services cover supervised, unsupervised, and reinforcement learning, creating systems that make optimized decisions with minimal human input. As a reputable machine learning development company, we build intelligent, self-improving solutions.',
    },
  ];

  const ocheading = 'Our Commitment to Excellence';
  const ocdescription
  = 'Excellence serves as our starting point. We work tirelessly towards achieving remarkable results that elevate the bar for technological advancements everywhere.';
  const commitmentData = [
    {
      img: '/images/aiServices/McDonald.svg',
      value1: '80%',
      value2: '85%',
      value3: '60%',
      desc1: 'Reduction in review analysis time',
      desc2: 'Accuracy in predictive analysis',
      desc3: 'Improvement in overall efficiency',
    },
    {
      img: '/images/aiServices/Lytics.svg',
      value1: '200%',
      value2: '70%',
      value3: '3X',
      desc1: 'Expansion of new sources monitored',
      desc2: 'Efficiency of AI based scraping',
      desc3: 'Increase in real-time handling capacity',
    },
    {
      img: '/images/aiServices/PSA.svg',
      value1: '90%',
      value2: '95%',
      desc1: 'Satisfaction with speech quality',
      desc2: 'Text-to-speech accuracy',
    },
  ];

  return (
    <>
      <HeroSection
        heading="AI Development Services"
        description="From concept to deployment, we deliver adaptive, scalable AI solutions that bring your vision of intelligent technology to life."
        buttonText="Book call to solve your tech challenges"
        buttonLink="/contactUs"
        backgroundImage="/images/aiServices/heroSectionBackground.svg"
        images={[
          { src: '/images/aiServices/box_1.svg', alt: 'box 1' },
          { src: '/images/aiServices/box_2.svg', alt: 'box 2' },
          { src: '/images/aiServices/box_3.svg', alt: 'box 3' },
          { src: '/images/aiServices/box_4.svg', alt: 'box 4' },
        ]}
      />
      <OurClients />
      <OurServices
        heading="Our Services"
        description="Our AI development services empower businesses to tap into extensive data, driving measurable results. As an award-winning AI software development company, we specialize in turning ideas into actionable insights, making efficiency and quick decision-making unavoidable. Let’s collaborate to bring your AI vision to life and to its intended audience!"
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
