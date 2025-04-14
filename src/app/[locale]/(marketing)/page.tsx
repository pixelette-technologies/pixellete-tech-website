// import { HeroSection } from '@/components/Home/HeroSection/HeroSection';
import { HeroSection } from '@/components/Home/HeroSection/HeroSection';
import { homeTechnologies } from '@/data/technology/homeTechnologies';

import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { AnimatedSection } from '@/components/animations';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

// const HeroSection = dynamic(() => import('@/components/Home/HeroSection/HeroSection').then(mod => mod.HeroSection));
const OurClients = dynamic(() => import('@/components/Home/OurClients/OurClients').then(mod => mod.OurClients), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <img src="/images/logo/shortLogo.svg" alt="Loading..." className="w-12 h-12 animate-pulse" />
    </div>
  ),
  ssr: true
});

const AboutUsSection = dynamic(() => import('@/components/Home/AboutusSection/AboutUsSection'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <img src="/images/logo/shortLogo.svg" alt="Loading..." className="w-12 h-12 animate-pulse" />
    </div>
  ),
  ssr: true
});

const WhatMakeUsSpecialHome = dynamic(() => import('@/components/Home/WhatMakeUsSpecial/WhatMakeUsSpecial'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <img src="/images/logo/shortLogo.svg" alt="Loading..." className="w-12 h-12 animate-pulse" />
    </div>
  ),
  ssr: true
});

const OurServicesSection = dynamic(() => import('@/components/Home/OurServicesSection/OurServicesSection'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <img src="/images/logo/shortLogo.svg" alt="Loading..." className="w-12 h-12 animate-pulse" />
    </div>
  ),
  ssr: true
});

const YourPlan = dynamic(() => import('@/components/Home/YourPlan/YourPlan').then(mod => mod.YourPlan), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <img src="/images/logo/shortLogo.svg" alt="Loading..." className="w-12 h-12 animate-pulse" />
    </div>
  ),
  ssr: true
});

const TechnologiesUsed = dynamic(() => import('@/components/Sections/TechnologyUsed/TechnologiesUsed'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <img src="/images/logo/shortLogo.svg" alt="Loading..." className="w-12 h-12 animate-pulse" />
    </div>
  ),
  ssr: true
});

const CaseStudies = dynamic(() => import('@/components/Home/CaseStudiesSection/CaseStudies'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <img src="/images/logo/shortLogo.svg" alt="Loading..." className="w-12 h-12 animate-pulse" />
    </div>
  ),
  ssr: true
});

const Testimonial = dynamic(() => import('@/components/Home/Testimonial/Testimonial'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <img src="/images/logo/shortLogo.svg" alt="Loading..." className="w-12 h-12 animate-pulse" />
    </div>
  ),
  ssr: true
});

const EvaluateBusiness = dynamic(() => import('@/components/Sections/EvaluateBusiness/EvaluateBusiness').then(mod => mod.EvaluateBusiness), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <img src="/images/logo/shortLogo.svg" alt="Loading..." className="w-12 h-12 animate-pulse" />
    </div>
  ),
  ssr: true
});

const clutchLogos = [
  {
    src: '/images/Clutch/clutch-badges/business-form/top-decentralized-finance-company-2025.png',
    alt: 'Blockchain Company UK',
  },
  {
    src: '/images/Clutch/clutch-badges/business-form/top-machine-learning-company-2025.png',
    alt: 'Top AI Company UK',
  },
  {
    src: '/images/Clutch/clutch-badges/business-form/top-smart-contract-development-company-2025.png',
    alt: 'Smart Contract Development Company',
  },
  {
    src: '/images/Clutch/clutch-badges/business-form/top-rust-development-company-2025.png',
    alt: 'Top Rust Blockchain Company',
  },
  {
    src: '/images/Clutch/clutch-badges/business-form/top-tokenization-company-2025.png',
    alt: 'Top Tokenization Company',
  },
  {
    src: '/images/Clutch/clutch-badges/business-form/top-ar-core-development-2025.png',
    alt: 'Top ar vr core Company',
  },
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
    alternates: {
      canonical: `/`
    }
  };
}

export default async function Index(props: IIndexProps) {
  return (
    <>
      {/* <div className="main-content"></div> */}
      <AnimatedSection 
        animation="fadeIn" 
        delay={0}
        gradientColors={['transparent', 'rgba(0, 0, 0, 0.7)']}
        gradientHeight="200px"
        gradientBlurAmount={15}
      >
        <HeroSection />
      </AnimatedSection>
      
      <AnimatedSection 
        animation="fadeUp" 
        delay={0.2}
        gradientColors={['transparent', 'rgba(0, 0, 0, 0.6)']}
        gradientHeight="150px"
        gradientBlurAmount={12}
      >
        <OurClients />
      </AnimatedSection>
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

      <AnimatedSection 
        animation="fadeLeft" 
        delay={0.3}
        gradientColors={['transparent', 'rgba(0, 0, 0, 0.5)']}
        gradientHeight="180px"
        gradientBlurAmount={10}
      >
        <AboutUsSection />
      </AnimatedSection>

      <AnimatedSection 
        animation="fadeRight" 
        delay={0.4}
        gradientColors={['transparent', 'rgba(0, 0, 0, 0.6)']}
        gradientHeight="160px"
        gradientBlurAmount={12}
      >
        <WhatMakeUsSpecialHome />
      </AnimatedSection>

      <AnimatedSection 
        animation="fadeUp" 
        delay={0.5}
        gradientColors={['transparent', 'rgba(0, 0, 0, 0.7)']}
        gradientHeight="170px"
        gradientBlurAmount={14}
      >
        <OurServicesSection />
      </AnimatedSection>

      <AnimatedSection 
        animation="fadeLeft" 
        delay={0.6}
        gradientColors={['transparent', 'rgba(0, 0, 0, 0.5)']}
        gradientHeight="140px"
        gradientBlurAmount={10}
      >
        <YourPlan />
      </AnimatedSection>

      <AnimatedSection 
        animation="fadeRight" 
        delay={0.7}
        gradientColors={['transparent', 'rgba(0, 0, 0, 0.6)']}
        gradientHeight="150px"
        gradientBlurAmount={12}
      >
        <TechnologiesUsed
          technologies={homeTechnologies}
          title="Benefit from our unmatched tech stack expertise"
          subtitle="With our team's deep mastery in the latest frameworks, languages, and tools, we build scalable, secure, and high-performance applications that set new standards. From ideation to deployment, our technology capabilities are designed to drive your business forward."
        />
      </AnimatedSection>

      <AnimatedSection 
        animation="fadeUp" 
        delay={0.8}
        gradientColors={['transparent', 'rgba(0, 0, 0, 0.7)']}
        gradientHeight="180px"
        gradientBlurAmount={15}
      >
        <CaseStudies heading="Our past work speaks volumes" initialData={[]} />
      </AnimatedSection>

      <AnimatedSection 
        animation="fadeLeft" 
        delay={0.9}
        gradientColors={['transparent', 'rgba(0, 0, 0, 0.5)']}
        gradientHeight="160px"
        gradientBlurAmount={10}
      >
        <Testimonial background="" />
      </AnimatedSection>

      <AnimatedSection 
        animation="fadeRight" 
        delay={1}
        gradientColors={['transparent', 'rgba(0, 0, 0, 0.6)']}
        gradientHeight="170px"
        gradientBlurAmount={12}
      >
        <EvaluateBusiness
          heading="Ready to become a tech success story?"
          description="Don't let technical hurdles stand in the way of building tech solutions that shake up the world as we know it. Let us help you bring your vision to life with innovative, cost-effective and reliable services. Get in touch!"
          clutchLogos={clutchLogos}
        />
      </AnimatedSection>

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
