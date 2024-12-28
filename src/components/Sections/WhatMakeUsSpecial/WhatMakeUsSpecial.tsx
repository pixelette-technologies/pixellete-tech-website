import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import { Text } from '@/components/Feature/Text/Text';
import data from '@/data';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import './whatmakeusspecial.css';

type ItemProps = {
  heading: string;
  text: string;
};

const Item = ({ heading, text }: ItemProps) => {
  return (
    <div>
      <section>
        <Image
          src="/images/home/about/dot.svg"
          alt="dot"
          height={20}
          width={20}
        />
      </section>
      <div>
        <Text className="primary--bold">{heading}</Text>
        <Text className="titory--bold">{text}</Text>
      </div>
    </div>
  );
};

type WhatMakeUsSpecialProps = {
  heading?: string;
  text?: string;
  data?: ItemProps[];
};

export const WhatMakeUsSpecial = ({ heading, text, data: propsData }: WhatMakeUsSpecialProps) => {
  const defaultData = data.whatMakeSpecialData;

  return (
    <>
      <Container className="main">
        <div className="specialSection-background">
          <Image src="/images/home/about/howWeWorkBackground.svg" alt="background" height={100} width={100} />
        </div>
      </Container>
      <div className="specialSection">
        <center>
          <Heading
            className="secondry"
            animation="fade-up"
            duration="400"
            id="h_ani"
          >
            {heading || 'What Makes Us Special?'}
          </Heading>
          <Text className="secondry">
            {text
            || 'At Pixelette Technologies, our commitment to innovation and excellence sets us apart. Here’s why clients choose us:'}
          </Text>
        </center>
        <Container className="main margins">
          <section>
            <div>
              <div>
                {(propsData || defaultData).map(el => (
                  <Item key={uuidv4()} heading={el.heading} text={el.text} />
                ))}
              </div>
            </div>
            <Image
              src="/images/home/about/specialSectionHeroImage.svg"
              alt="heroImage"
              data-aos="fade-up"
              data-aos-duration="600"
              height={100}
              width={100}
            />
          </section>
        </Container>
      </div>
    </>
  );
};
