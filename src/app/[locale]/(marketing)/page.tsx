import AboutUsSection from '@/components/Home/AboutusSection/AboutUsSection';
import { CaseStudies } from '@/components/Home/CaseStudiesSection/CaseStudies';
import { HeroSection } from '@/components/Home/HeroSection/HeroSection';
import { OurClients } from '@/components/Home/OurClients/OurClients';
import OurServicesSection from '@/components/Home/OurServicesSection/OurServicesSection';
import { Testimonial } from '@/components/Home/Testimonial/Testimonial';
import WhatMakeUsSpecialHome from '@/components/Home/WhatMakeUsSpecial/WhatMakeUsSpecial';
import { YourPlan } from '@/components/Home/YourPlan/YourPlan';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import TechnologiesUsed from '@/components/Sections/TechnologyUsed/TechnologiesUsed';
import { homeTechnologies } from '@/data/technology/homeTechnologies';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return (
    <>
      <HeroSection />
      <OurClients />
      <AboutUsSection />
      <WhatMakeUsSpecialHome />
      <OurServicesSection />
      <YourPlan />
      <TechnologiesUsed
        technologies={homeTechnologies}
        title="Benefit from our unmatched tech stack expertise"
        subtitle="With our team's deep mastery in the latest frameworks, languages, and tools, we build scalable, secure, and high-performance applications that set new standards. From ideation to deployment, our technology capabilities are designed to drive your business forward."
      />
      <CaseStudies heading='Our past work speaks volumes '/>
      {/* <CaseStudies /> this is working just need to uncomment */}
      <Testimonial background="" />
      <EvaluateBusiness />
      {/* <OurTeam /> */}
      {/* <UnlockBusinessPotential
        heading="Unlock Your Business Potential"
        text="Ready to take your business to the next level? Discover how Pixelette Technologies can transform your vision into reality with our innovative tech solutions."
        btnText="Book a Discovery Call"
      /> */}
      {/* <Partner /> */}
      {/* <BlogSection
        heading="The Pixelette Post"
        text="Explore a world of insights through the Pixelette Post. Engage with expert opinions, groundbreaking ideas, and in-depth guides that empower and inspire. Dive into our content today."
      /> */}

    </>
  );
};
