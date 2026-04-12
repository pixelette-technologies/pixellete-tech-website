import DedicatedTech from '@/components/About/DedicatedTech/DedicatedTech';
import HeroSectionAbout from '@/components/About/HeroSectionAbout/HeroSectionAbout';
import Map from '@/components/About/Map/Map';
import OurMission from '@/components/About/OurMission/OurMission';
import { OurClients } from '@/components/Home/OurClients/OurClients';
import { EvaluateBusiness } from '@/components/Sections/EvaluateBusiness/EvaluateBusiness';
import { OurTeam } from '@/components/Sections/OurTeam/OurTeam';
import { HowWeWork } from '@/components/Sections/Services/HowWeWork/HowWeWork';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type IAboutProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IAboutProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'About',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: `https://pixelettetech.com/about-us`,
    },
  };
}

export default async function About(props: IAboutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'About',
  });

  return (
    <>
      <HeroSectionAbout />
      <DedicatedTech />
      <OurClients />
      <OurMission />
      <HowWeWork />
      <OurTeam />
      <Map />
      <EvaluateBusiness heading="Ready to become a tech success story?" description="Don’t let technical hurdles stand in the way of building powerful tech solutions. Let us help you bring your vision to life with innovative, cost-effective and reliable services. Get in touch!" />
    </>
  );
};
