import Image from 'next/image';
import Link from 'next/link';
import { FaPhone } from 'react-icons/fa6';
import { HiLocationMarker } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import { Container } from '../Feature/Container/Container';
import styles from './footer.module.css';

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <Image
        src="/images/footer/footerbackground.svg"
        alt="background"
        layout="responsive"
        width={100}
        height={100}
        className="img"
      />
      <Container className="main margins">
        <blockquote>
          <Image src="/images/footer/box_21.svg" alt="box 21" width={100} height={100} className="img" />
          <Image src="/images/footer/box_22.svg" alt="box 22" width={100} height={100} className="img" />
        </blockquote>
        <section id="sideMargin">
          {/* Logo and Social Links */}
          <div>
            <Image
              src="/images/company/logo.svg"
              alt="logo"
              data-aos="flip-left"
              data-aos-duration="1000"
              width={150}
              height={50}
              className="img"
            />
            <div>
              <a
                href="https://www.instagram.com/pixelettetechnologies/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/social/insta.svg"
                  alt="Instagram"
                  data-aos="fade-up"
                  data-aos-duration="700"
                  width={40}
                  height={40}
                  className="img"
                />
              </a>
              <a
                href="https://www.facebook.com/pixelette.technologies"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/social/facebook.svg"
                  alt="Facebook"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  width={40}
                  height={40}
                  className="img"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/pixelettetechnologies/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/social/linkedIn.svg"
                  alt="LinkedIn"
                  data-aos="fade-up"
                  data-aos-duration="900"
                  width={40}
                  height={40}
                  className="img"
                />
              </a>
              <a
                href="https://twitter.com/Pixelettetech1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/social/twitter.svg"
                  alt="Twitter"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  width={40}
                  height={40}
                  className="img"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p>
              Quick Links
            </p>
            {['about-us', 'case-studies', 'pixelette-research', 'start-ups'].map(
              (link, index) => (
                <p
                style={{fontWeight: '700'}}
                  key={index}
                >
                  <Link href={`/${link}`}>{link.replace('-', ' ')}</Link>
                </p>
              ),
            )}
          </div>

          {/* Company Info */}
          <div>
            <p>
              Company Info
            </p>
            {[
              { href: 'blog', text: 'Blog' },
              { href: 'privacy-policy', text: 'Privacy Policy' },
              { href: 'terms-condition', text: 'Terms & Conditions' },
              { href: 'cancelation-refund-policy', text: 'Cancellation & Refund Policy' },
              // { href: 'careers', text: 'Careers' },
            ].map((item, index) => (
              <p
                key={index}
              >
                <Link href={`/${item.href}`}>{item.text}</Link>
              </p>
            ))}
          </div>

          {/* Contact Info */}
          <div>
            <p>
              Contact Us
            </p>
            {[
              { Icon: MdEmail, text: 'sales@pixelettetech.com' },
              { Icon: FaPhone, text: '+44 2045188226' },
              { Icon: FaPhone, text: '+1 7732709034' },
              {
                Icon: HiLocationMarker,
                text: '71-75 Shelton Street, WC2 H9J, London, UK (Headquarter)',
              },
              {
                Icon: HiLocationMarker,
                text: '2335. W. Devon, Ave, IL 6065, Chicago, USA (Headquarter)',
              },
            ].map((contact, index) => (
              <p
                key={index}
              >
                <contact.Icon />
                {contact.text}
              </p>
            ))}
          </div>
        </section>
        <center>
          <p>
            Copyright © 2023 Pixelette Technologies | All Rights Reserved
          </p>
        </center>
      </Container>
    </div>
  );
};
