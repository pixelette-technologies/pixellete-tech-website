import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import Text from '@/components/Feature/Text/Text';
import Image from 'next/image';
import './herosection.css';

export const HeroSection = () => {
  return (
    <>
      {/* Background Image Section */}
      <Container className="main">
        <div className="heroSectionMarketing-background">
          <Image
            src="/images/startup/heroSectionBackground}"
            alt="Research Background"
            layout="fill" // Ensures responsive background
            objectFit="cover"
            priority // Load this image with higher priority
          />
        </div>
      </Container>

      {/* Content Section */}
      <div className="heroSectionMarketing">
        <center>
          <Heading
            className="heroHeading"
            animation="zoom-out"
            duration="500"
          >
            Ready to scale? Partner with Pixelette Technologies
          </Heading>
          <Text
            className="secondary"
            animation="zoom-in"
            duration="600"
          >
            At Pixelette Technologies, we're passionate about startups and
            innovation, committed to turning your ideas into reality. With our
            expert support, we guide you from ideation to execution, ensuring
            your project receives the attention and dedication it deserves.
          </Text>
        </center>

        <Container className="main margins">
          <section data-aos="fade-up" data-aos-duration="500">
            {/* Section 1 */}
            <div>
              <Heading className="policyHeading">
                Our commitment to innovation
              </Heading>
              <Text className="titory--bold">
                Pixelette Technologies recognizes the scarcity of innovative
                thinkers and the challenges they face in accessing funding. We
                advocate for the process of thesis, antithesis, and synthesis,
                believing it leads to meaningful innovation. With a focus on
                early-stage startups, we invest our resources and expertise to
                support ideas from conception to execution, ensuring promising
                ventures see the light of day. Join us to navigate the hurdles
                hindering your startup's success and turn your vision into
                reality.
              </Text>
            </div>

            {/* Section 2 */}
            <div>
              <Heading className="policyHeading">
                Kickstart your journey
              </Heading>
              <Text className="titory--bold">
                Pixelette Technologies offers start-ups access to a seasoned
                team of experts deeply ingrained in the start-up ecosystem,
                dedicated to facilitating success. Choose us for funded
                opportunities, a robust partner network, top-notch development
                and marketing services, all at heavily subsidised fees. With
                minimal control relinquished, we prioritise your start-up's
                growth and prosperity, ensuring unparalleled support on your
                journey to success.
              </Text>
            </div>
          </section>
        </Container>
      </div>
    </>
  );
};
