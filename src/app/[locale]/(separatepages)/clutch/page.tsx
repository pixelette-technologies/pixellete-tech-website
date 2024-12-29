import BrilliantIdea from '@/components/BrillientIdeas/BrilliantIdea';
import ClutchForm from '@/components/Clutch/ClutchForm/ClutchForm';
import StartupStats from '@/components/Clutch/StartupStats/StartupStats';
import { Container } from '@/components/Feature/Container/Container';
import { OurClients } from '@/components/Home/OurClients/OurClients';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import './index.css';

type IAIservicesProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IAIservicesProps) {
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

export default async function Clutch(props: IAIservicesProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <div className="clutch-container">
        <div className="specialSection-background">
          <img src="/images/Clutch/background.webp" alt="background" />
        </div>
        <div className="heroSectionAiServices-background">
          <img src="/images/aiServices/heroSectionBackground.svg" alt="background" />
          <div className="pixelate-logo">
            <Container className="main margins">
              <Link href="/">
                <img src="/images/Clutch/logo.svg" alt="" />
              </Link>
            </Container>
          </div>
          <ClutchForm />
          <OurClients />
          <StartupStats />
          <BrilliantIdea />

        </div>
      </div>
    </>
  );
};
