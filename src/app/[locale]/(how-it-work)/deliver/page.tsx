import OurClients from '@/components/Deliver/DeliverBenifits/DeliverBenifits';
import HeroSectionAiServices from '@/components/Deliver/HeroSection/HeroSectionAiServices';
import SelectPlan from '@/components/Deliver/SelectPlan/SelectPlan';
import ServiceWork from '@/components/Deliver/ServiceWork/ServiceWork';
import { Footer } from '@/components/footer/Footer';
import { Navbar } from '@/components/header/Navbar/Navbar';
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
  const t = await getTranslations({
    locale,
    namespace: 'About',
  });

  return (
    <>
      <Navbar />
      <HeroSectionAiServices />
      <OurClients />
      <SelectPlan />
      <ServiceWork />
      <FaqsSection faqs={deliverFaqs} />
      <EvaluateBusiness />
      <Footer />
    </>
  );
};
