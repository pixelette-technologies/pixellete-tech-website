import { Container } from '@/components/Feature/Container/Container';
import Image from 'next/image';
import './herosection.css';

export const HeroSection = () => {
  return (
    <>
      {/* Background Image Section */}
      <Container className="main">
        <div className="heroSectionMarketing-background">
          <Image
            src="/images/startups/heroSectionBackground.svg"
            alt="Research Background"
            objectFit="cover"
            width={100}
            height={100}
            priority // Load this image with higher priority
          />
        </div>
      </Container>

      {/* Content Section */}
      <div className="heroSectionMarketing">
        <center>
          <h1
            className="heroHeading"
          >
            Ready to scale? Partner with Pixelette Technologies
          </h1>
          {/* <div
            className="secondary"
            animation="zoom-in"
            duration="600"
          > */}
          <p>
            At Pixelette Technologies, we're passionate about startups and
            innovation, committed to turning your ideas into reality. With our
            expert support, we guide you from ideation to execution, ensuring
            your project receives the attention and dedication it deserves.
          </p>
        </center>

        <Container className="main margins">
          <section id="sideMargin">
            {/* Section 1 */}
            <div>
              <h2 className="policyHeading display-h1">
                Our commitment to innovation
              </h2>
              <p>
                Pixelette Technologies recognizes the scarcity of innovative
                thinkers and the challenges they face in accessing funding. We
                advocate for the process of thesis, antithesis, and synthesis,
                believing it leads to meaningful innovation. With a focus on
                early-stage startups, we invest our resources and expertise to
                support ideas from conception to execution, ensuring promising
                ventures see the light of day. Join us to navigate the hurdles
                hindering your startup's success and turn your vision into
                reality.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="policyHeading display-h1">
                Kickstart your journey
              </h2>
              <p>
                Pixelette Technologies offers start-ups access to a seasoned
                team of experts deeply ingrained in the start-up ecosystem,
                dedicated to facilitating success. Choose us for funded
                opportunities, a robust partner network, top-notch development
                and marketing services, all at heavily subsidised fees. With
                minimal control relinquished, we prioritise your start-up's
                growth and prosperity, ensuring unparalleled support on your
                journey to success.
              </p>
            </div>
          </section>
        </Container>
      </div>
    </>
  );
};
