import DeliverBenefits from '@/components/Deliver/DeliverBenefits/DeliverBenefits';
import HowItWorksHeroSection from '@/components/Deliver/HeroSection/HowItWorksHeroSection';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import { AiServiceTable } from '@/components/Sections/Services/AiServiceTable/AiServiceTable';
import FaqsSection from '@/components/Sections/Services/FAQs/FaqsSection';
import { HowWeWork } from '@/components/Sections/Services/HowWeWork/HowWeWork';
import BreadcrumbJsonLd from '@/components/SEO/BreadcrumbJsonLd';
import { deliverFaqs } from '@/data/faqs/deliverFaqs';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type IDeliverProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IDeliverProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'outSourcePage',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    keywords: t('meta_keywords'),
    alternates: {
      canonical: '/it-outsourcing-services',
    },
    openGraph: {
      url: 'https://pixelettetech.com/it-outsourcing-services',
    },
  };
}

export default async function ItOutsourcingServices(props: IDeliverProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'About',
  // });

  const deliverHeroData = {
    backgroundImage: '/images/aiServices/heroSectionBackground.svg',
    heading: 'From Concept to Completion, We Deliver',
    text: 'We handle every step of development so you can concentrate on growth',
    deliverTitle: 'How It Works?',
    deliverDescription: [
      'Our complete outsourcing services take the entire software development process off your hands. We manage every aspect, from initial planning and design to development, testing, and deployment.',
      'Once you provide your requirements and objectives, our team takes full control, assembling the right resources and managing the entire project. We work closely with you to ensure alignment with your vision, but the day-to-day execution is our responsibility.',
      'You can expect a high-quality product delivered on time and within budget, without the need to manage the complexities of development themselves. You’ll have a ready-to-use solution tailored to your business needs, allowing you to focus on growth and strategy.',
    ],
    deliverImage: '/images/Deliver/deliverhero1.png',
  };

  const benefitData = {
    heading: 'Benefits of Complete Development Outsourcing with Us',
    cards: [
      {
        title: 'Complete Project Ownership',
        description:
          'Your project is our responsibility, allowing you to concentrate on other aspects of your business',
      },
      {
        title: 'Expert Management',
        description:
          'Your project is delivered on time and within budget with the help of dedicated project managers',
      },
      {
        title: 'Reduced Costs',
        description:
          'You don’t need to invest in additional infrastructure, tools, talent or management; we handle everything',
      },
      {
        title: 'High-Quality Talent Pool',
        description:
          'You can access our experienced team that delivers fully tested, high-quality products ready for deployment',
      },
    ],
  };
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'IT Outsourcing Services', path: '/it-outsourcing-services' },
        ]}
      />
      <HowItWorksHeroSection {...deliverHeroData} />
      <DeliverBenefits {...benefitData} />
      {/* <SelectPlan /> */}
      {/* <ServiceWork /> */}
      <AiServiceTable />
      <HowWeWork />
      <FaqsSection faqs={deliverFaqs} />
      <EvaluateBusiness />
    </>
  );
};
