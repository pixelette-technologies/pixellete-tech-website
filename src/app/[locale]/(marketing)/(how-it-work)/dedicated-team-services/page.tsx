import DeliverBenefits from '@/components/Deliver/DeliverBenefits/DeliverBenefits';
import HowItWorksHeroSection from '@/components/Deliver/HeroSection/HowItWorksHeroSection';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import { AiServiceTable } from '@/components/Sections/Services/AiServiceTable/AiServiceTable';
import FaqsSection from '@/components/Sections/Services/FAQs/FaqsSection';

import { HowWeWork } from '@/components/Sections/Services/HowWeWork/HowWeWork';
import { deliverFaqs } from '@/data/faqs/deliverFaqs';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type IDeliverProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IDeliverProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'dedicatedTeamPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: t('meta_keywords'),
  };
}

export default async function DedicatedTeamServices(props: IDeliverProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'About',
  // });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': deliverFaqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };

  const deliverHeroData = {
    backgroundImage: '/images/aiServices/heroSectionBackground.svg',
    heading: 'Precision-Driven Teams, Ready to Deploy',
    text: 'A team that’s all in on your project, next to you, from start to finish.',
    deliverTitle: 'How It Works?',
    deliverDescription: [
      'Our dedicated teams service provides you with a fully assembled, highly skilled team of developers, ready to integrate with your existing processes and drive your project forward.',
      'We build a dedicated development team based on your project’s specific requirements. This team is fully committed to your project, working under your direction and aligning with your goals. We handle the formation and management of the team, ensuring it’s tailored to meet your objectives.',
      'Clients can expect faster development cycles, higher efficiency, and a more focused approach to project delivery, with a team that’s fully invested in your success.',
    ],
    deliverImage: '/images/deploy/deployHeroImage.png',
  };

  const benefitData = {
    heading: 'Benefits of Opting for Dedicated Teams',
    cards: [
      {
        title: 'Faster Time to Market',
        description:
          'You can accelerate development with a ready-to-go team that integrates quickly',
      },
      {
        title: 'Focused Expertise',
        description:
          'Your project gets a fully focused team, ensuring commitment to the building process',
      },
      {
        title: 'Consistency',
        description:
          'You work with the same team throughout the project, ensuring continuity and deep understanding',
      },
      {
        title: 'Custom Fit',
        description:
          'You may tailor the team to your project’s specific needs, ensuring the right mix of skills',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HowItWorksHeroSection {...deliverHeroData} />
      <DeliverBenefits {...benefitData} />
      {/* <SelectPlan /> */}
      <AiServiceTable />
      <HowWeWork />
      {/* <ServiceWork /> */}
      <FaqsSection faqs={deliverFaqs} />
      <EvaluateBusiness
        heading="Ready to become a tech success story?"
        description="Don’t let technical hurdles stand in the way of building tech solutions that shake up the world as we know it. Let us help you bring your vision to life with innovative, cost-effective and reliable services. Get in touch!"
      />
    </>
  );
};
