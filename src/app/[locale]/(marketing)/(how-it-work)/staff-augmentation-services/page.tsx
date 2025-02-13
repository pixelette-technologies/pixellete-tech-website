import DeliverBenefits from '@/components/Deliver/DeliverBenefits/DeliverBenefits';
import HowItWorksHeroSection from '@/components/Deliver/HeroSection/HowItWorksHeroSection';
import SelectPlan from '@/components/Deliver/SelectPlan/SelectPlan';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
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
    namespace: 'staffAugmentationPage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: t('meta_keywords'),
  };
}

export default async function StaffAugmentationServices(props: IDeliverProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'About',
  // });

  const deliverHeroData = {
    backgroundImage: '/images/aiServices/heroSectionBackground.svg',
    heading: 'Expand Your Capabilities, Instantly',
    text: 'Add top-tier talent to your project without the hiring headache.',
    deliverTitle: 'How It Works?',
    deliverDescription: [
      'Our staff augmentation services allows you to easily expand your team with our skilled developers and specialists, integrating them into your ongoing projects.',
      'We match you with the right talent based on your specific needs. Our developers work alongside your existing team, contributing their expertise and ensuring smooth collaboration. We take care of all the sourcing, recruitment, and onboarding, so you can focus on progress.',
      'You can expect an immediate boost in capacity and expertise, leading to faster project completion and enhanced quality without the administrative burden of hiring and training new staff.',
    ],
    deliverImage: '/images/supplement/supplementHeroImage.png',
  };

  const benefitData = {
    heading: 'Benefits of Staff Augmentation with Us',
    cards: [
      {
        title: 'Quick Scaling',
        description:
          'You can rapidly expand your team without the lengthy recruitment process',
      },
      {
        title: 'Cost Efficient',
        description:
          'You get to save time and money on sourcing, recruiting, and training',
      },
      {
        title: 'Flexibility',
        description:
          'You can scale your team up or down as needed, with no long-term commitment',
      },
      {
        title: 'Expertise on Demand',
        description:
          'You will have access to skilled professionals who bring specialised knowledge to your projects',
      },
    ],
  };

  return (
    <>
      <HowItWorksHeroSection {...deliverHeroData} />
      <DeliverBenefits {...benefitData} />
      <SelectPlan />
      {/* <ServiceWork /> */}
      <HowWeWork />
      <FaqsSection faqs={deliverFaqs} />
      <EvaluateBusiness />
    </>
  );
};
