'use client';

import type { EntryCollection } from 'contentful';
import { Button } from '@/components/Feature/Button/Button';
import { CaseSlider } from '@/components/Feature/CaseSlider/CaseSlider';
import { Container } from '@/components/Feature/Container/Container';
import { createClient } from 'contentful';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';
import styles from './casestudies.module.css';

type CaseStudy = {
  fields: {
    title: string;
    description: string;
    image: { fields: { file: { url: string } } };
  };
};

type CaseStudiesProps = {
  heading?: string;
  text?: string;
  initialData: CaseStudy[];
};

export const CaseStudies = ({ heading, initialData }: CaseStudiesProps) => {
  const [caseStudyData, setCaseStudyData] = useState<CaseStudy[]>(initialData);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const client = createClient({
          space: 'ggtsbq0gqfii',
          accessToken: 'VZvVye8dMIc497wF-1pNt5rdYUG-h4E30uX58AcGVUo',
          // space: process.env.CONTENTFUL_SPACE_ID || '',
          // accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
        });

        const response: EntryCollection<CaseStudy> = await client.getEntries({
          content_type: 'caseStudies',
        });

        setCaseStudyData(response.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (!initialData) {
      fetchCaseStudies();
    }
  }, [initialData]);

  return (
    <>
      <Container className={styles.main}>

        {/* <div className={styles.testimonialSectionBackground}>
          <img
            src="/images/home/testimonials/testimonialBackground.svg"
            alt="Testimonial Background"
            className={styles.backgroundImage}
          />
        </div> */}
      </Container>
      <div className={styles.caseStudySection} id="sideMargin">
        <Container className="main margins">
          <center>
            <h2 style={{ marginBottom: '1rem' }}>
              {heading || 'Case Studies'}
            </h2>
            <p style={{ maxWidth: '48ch' }}>Dive into our portfolio of successful projects where strategic technology solutions meet client needs. Our case studies illustrate how we drive growth, efficiency, and innovation with every project.</p>
          </center>
          <section style={{ marginTop: '5rem' }}>
            <CaseSlider data={caseStudyData} />
          </section>
          <center style={{ marginTop: '3rem' }}>
            <Link href="/case-studies" passHref>
              <Button className="primary" animation="fade-up" duration="400">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  View Our Projects
                  {' '}
                  <FiExternalLink />
                </div>
              </Button>
            </Link>
          </center>
        </Container>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID || '',
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
    });

    const response: EntryCollection<CaseStudy> = await client.getEntries({
      content_type: 'caseStudies',
    });

    return {
      props: {
        initialData: response.items,
      },
    };
  } catch (error) {
    console.error('Error fetching data on the server:', error);

    return {
      props: {
        initialData: [],
      },
    };
  }
};

export default CaseStudies;
