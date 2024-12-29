import DeliverBenefits from '@/components/Deliver/DeliverBenefits/DeliverBenefits';
import HowItWorksHeroSection from '@/components/Deliver/HeroSection/HowItWorksHeroSection';
import SelectPlan from '@/components/Deliver/SelectPlan/SelectPlan';
import ServiceWork from '@/components/Deliver/ServiceWork/ServiceWork';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import FaqsSection from '@/components/Sections/Services/FAQs/FaqsSection';
import { deliverFaqs } from '@/data/faqs/deliverFaqs';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type IDeliverProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IDeliverProps) {
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

export default async function Deliver(props: IDeliverProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'About',
  // });

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
      <HowItWorksHeroSection {...deliverHeroData} />
      <DeliverBenefits {...benefitData} />
      <SelectPlan />
      <ServiceWork />
      <FaqsSection faqs={deliverFaqs} />
      <EvaluateBusiness />
    </>
  );
};
