import { OurClients } from '@/components/Home/OurClients/OurClients';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import { HeroSection } from '@/components/Sections/Services/HeroSection/HeroSection';
import { HowWeWork } from '@/components/Sections/Services/HowWeWork/HowWeWork';
import { IndustryTable } from '@/components/Sections/Services/IndustryTable/IndustryTable';
import { OurServices } from '@/components/Sections/Services/OurServices/OurServices';
import { QuantumCommitment } from '@/components/Sections/Services/QuantumCommitment/QuantumCommitment';
import { QuantumExpertise } from '@/components/Sections/Services/QuantumExpertise/QuantumExpertise';
import { QuantumPlans } from '@/components/Sections/Services/QuantumPlans/QuantumPlans';
import { QuantumTechStack } from '@/components/Sections/Services/QuantumTechStack/QuantumTechStack';
import { aiFaq } from '@/data/faqs/aiFaqs';
import {
  quantumHeroBackgroundImage,
  quantumHeroButtonLink,
  quantumHeroButtonText,
  quantumHeroDescription,
  quantumHeroHeading,
  quantumHeroImages,
  quantumHeroSubHeading,
  quantumHowWeWork,
  quantumServicelist,
  quantumServices,
  quantumServicesDescription,
  quantumServicesHeading,
} from '@/data/services/quantumServices';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type IQuantumServicesProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IQuantumServicesProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'AiServices',
  });

  return {
    title: 'Quantum Development Services | Pixelette Technologies',
    description: 'Expert quantum computing development services. We develop quantum algorithms, quantum machine learning, and quantum applications that solve complex problems.',
    keywords: 'quantum computing, quantum development, quantum algorithms, quantum machine learning',
    alternates: {
      canonical: `https://www.pixelettetech.com/quantum-development-services`,
    },
  };
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': `https://www.pixelettetech.com/`,
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'name': 'Quantum Development Services',
      'item': `https://www.pixelettetech.com/quantum-development-services`,
    },
  ],
};

export default async function QuantumServices(props: IQuantumServicesProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': aiFaq.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
  const clutchLogos = [
    {
      src: '/images/Clutch/clutch-badges/ai/most-reviewed-ai-company.png',
      alt: 'Most reviewed AI Company UK',
    },
    {
      src: '/images/Clutch/clutch-badges/ai/top-company-artificial-intelligence.png',
      alt: 'Top AI Company',
    },
    {
      src: '/images/Clutch/clutch-badges/ai/top-company-generative-ai.png',
      alt: 'Top Generative AI Company',
    },
    {
      src: '/images/Clutch/clutch-badges/ai/top-machine-learning-company.png',
      alt: 'Top Machine learning Company',
    },
    {
      src: '/images/Clutch/clutch-badges/ai/top-recommendation-system-company.png',
      alt: 'Top recommendation system Company',
    },
    {
      src: '/images/Clutch/clutch-badges/ai/top-ai-speech-generation-company.png',
      alt: 'Top ai speech generation Company',
    },
  ];
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
        heading={quantumHeroHeading}
        subHeading={quantumHeroSubHeading}
        description={quantumHeroDescription}
        buttonText={quantumHeroButtonText}
        buttonLink={quantumHeroButtonLink}
        backgroundImage={quantumHeroBackgroundImage}
        images={quantumHeroImages}
      />
      <OurClients />
      <OurServices
        heading={quantumServicesHeading}
        description={quantumServicesDescription}
        serviceLists={quantumServicelist}
        serviceMapping={quantumServices}
      />

      <IndustryTable />

      <QuantumExpertise />

      <QuantumTechStack />

      <QuantumPlans />

      <HowWeWork customData={quantumHowWeWork} />

      <QuantumCommitment />

      <EvaluateBusiness
        heading="Ready to become a tech
success story?"
        description="Don’t let technical hurdles stand in the way of building tech solutions that
shake up the world as we know it. Let us help you bring your vision to life with
innovative, cost-effective and reliable services. Get in touch!"
        clutchLogos={clutchLogos}
      />
    </>
  );
}
