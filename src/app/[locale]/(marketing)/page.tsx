// import { HeroSection } from '@/components/Home/HeroSection/HeroSection';
import { HeroSection } from '@/components/Home/HeroSection/HeroSection';
import { homeTechnologies } from '@/data/technology/homeTechnologies';

import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

// const HeroSection = dynamic(() => import('@/components/Home/HeroSection/HeroSection').then(mod => mod.HeroSection));
const OurClients = dynamic(() => import('@/components/Home/OurClients/OurClients').then(mod => mod.OurClients));
const AboutUsSection = dynamic(() => import('@/components/Home/AboutusSection/AboutUsSection'));
const WhatMakeUsSpecialHome = dynamic(() => import('@/components/Home/WhatMakeUsSpecial/WhatMakeUsSpecial').then(mod => mod.default));
const OurServicesSection = dynamic(() => import('@/components/Home/OurServicesSection/OurServicesSection').then(mod => mod.default));
const YourPlan = dynamic(() => import('@/components/Home/YourPlan/YourPlan').then(mod => mod.YourPlan));
const TechnologiesUsed = dynamic(() => import('@/components/Sections/TechnologyUsed/TechnologiesUsed').then(mod => mod.default));
const CaseStudies = dynamic(() => import('@/components/Home/CaseStudiesSection/CaseStudies').then(mod => mod.default));
const Testimonial = dynamic(() => import('@/components/Home/Testimonial/Testimonial').then(mod => mod.default));
const EvaluateBusiness = dynamic(() => import('@/components/Sections/EvaluateBusiness/EvaluateBusiness').then(mod => mod.EvaluateBusiness));

const clutchLogos = [
  {
    src: "/images/Clutch/clutch-badges/blockchain/final/blockchain-company-uk.png",
    alt: "Blockchain Company UK"
  },
  {
    src: "/images/Clutch/clutch-badges/ai/final/top-ai-company-uk.png",
    alt: "Top AI Company UK"
  },
  {
    src: "/images/Clutch/clutch-badges/software/most-reviewed-web-dev-clutch.png",
    alt: "Most Reviewed Web Development Company"
  },
  {
    src: "/images/Clutch/clutch-badges/blockchain/final/top-blockchain-clutch.png",
    alt: "Top Blockchain Company"
  },
  {
    src: "/images/Clutch/clutch-badges/blockchain/final/top-tokenization.png",
    alt: "Top Tokenization Company"
  },
  {
    src: "/images/Clutch/clutch-badges/ai/top-generative-ai-company-clutch.png",
    alt: "Top Generative AI Company"
  }
];

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
  // const { locale } = await props.params;
  // setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'Index',
  // });
  const GTM_ID = 'GTM-KXC3K4RL';
  return (
    <>

      {/* <div className="main-content"></div> */}
      <HeroSection />
      <OurClients />
      {/* not needed we already used gtm component by nextjs
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        >
        </iframe>
      </noscript> */}
      {/* <Image
          src="/images/home/bodyBackground.svg"
          fill
          alt="body background"
          style={{
            position: 'absolute',
            zIndex: -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            objectFit: 'cover',
          }}
        /> */}

      <AboutUsSection />
      <WhatMakeUsSpecialHome />
      <OurServicesSection />
      <YourPlan />
      <TechnologiesUsed
        technologies={homeTechnologies}
        title="Benefit from our unmatched tech stack expertise"
        subtitle="With our team's deep mastery in the latest frameworks, languages, and tools, we build scalable, secure, and high-performance applications that set new standards. From ideation to deployment, our technology capabilities are designed to drive your business forward."
      />
      <CaseStudies heading="Our past work speaks volumes" />
      <Testimonial background="" />

      <EvaluateBusiness
        heading="Ready to become a tech success story?"
        description="Don't let technical hurdles stand in the way of building tech solutions that shake up the world as we know it. Let us help you bring your vision to life with innovative, cost-effective and reliable services. Get in touch!"
        clutchLogos={clutchLogos}
      />

      {/* Uncomment these components when needed */}
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
}
