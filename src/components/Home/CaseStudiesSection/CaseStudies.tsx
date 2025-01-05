'use client';

import type { EntryCollection } from 'contentful';
import { Button } from '@/components/Feature/Button/Button';
import { CaseSlider } from '@/components/Feature/CaseSlider/CaseSlider';
import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import { Text } from '@/components/Feature/Text/Text';
import { createClient } from 'contentful';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';

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

export const CaseStudies = ({ heading, text, initialData }: CaseStudiesProps) => {
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
    <div className="caseStudySection">
      <Container className="main margins">
        <center>
          <Heading className="secondry" animation="fade-up" duration="500" id="h_ani">
            {heading || 'Case Studies'}
          </Heading>

          <Text className="secondry" animation="fade-up" duration="600">
            {text || 'Explore how our cutting-edge solutions have transformed industries and empowered clients.'}
          </Text>

          <Link href="/case-studies" passHref>
            <Button className="primary" animation="fade-up" duration="400">
              <div style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
              View Our Projects <FiExternalLink />
              </div>
            </Button>
          </Link>
        </center>
        <section style={{marginTop: '1rem'}}>
          <CaseSlider data={caseStudyData} />
        </section>
      </Container>
    </div>
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
