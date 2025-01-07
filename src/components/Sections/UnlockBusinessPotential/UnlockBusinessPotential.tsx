import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import { Text } from '@/components/Feature/Text/Text';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import './unlockbusinesspotential.css';

export const UnlockBusinessPotential = ({ heading, text, btnText }) => {
  return (
    <Container className="main margins">
      <div className="unlockBussiness" data-aos="fade-up" data-aos-duration="500">
        <div>
          <h2>{heading}</h2>
           className="secondary">{text}

          <section className="social-links">
            <a
              href="https://www.instagram.com/pixelettetechnologies/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/social/insta.png"
                alt="Instagram Icon"
                data-aos="fade-up"
                data-aos-duration="700"
                width={20}
                height={20}
              />
            </a>
            <a
              href="https://www.facebook.com/pixelette.technologies"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/social/facebook.png"
                alt="Facebook Icon"
                data-aos="fade-up"
                data-aos-duration="800"
                width={20}
                height={20}
              />
            </a>
            <a
              href="https://www.linkedin.com/company/pixelettetechnologies/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/social/linkedIn.png}"
                alt="LinkedIn Icon"
                data-aos="fade-up"
                data-aos-duration="900"
                width={20}
                height={20}
              />
            </a>
            <a
              href="https://twitter.com/Pixelettetech1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/social/twitter.png}"
                alt="Twitter Icon"
                data-aos="fade-up"
                data-aos-duration="1000"
                width={20}
                height={20}
              />
            </a>
          </section>
        </div>

        <Link href="#contactUs" scroll={false} passHref>
          <Button className="primary">{btnText}</Button>
        </Link>
      </div>
    </Container>
  );
};
