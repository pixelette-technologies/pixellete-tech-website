import type { Metadata } from 'next';
import MillstoneList from '@/components/CaseStudies/MilestoneList/MillstoneList';
import CaseStudyConversionBlock from '@/components/CaseStudy/CaseStudyConversionBlock';
import { Container } from '@/components/Feature/Container/Container';
import caseStudiesData from '@/data/caseStudies/caseStudiesData'; // Import case studies data
import Image from 'next/image';
import React from 'react';
import './casestudydetail.css';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const caseStudy = caseStudiesData.find(study => study.slug === slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
      description: 'This case study does not exist.',
    };
  }

  return {
    title: `${caseStudy.title} | Case Study`,
    description: caseStudy.description,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.description,
      type: 'website',
      url: `https://pixelettetech.com/case-studies/${slug}`,
      images: [
        {
          url: caseStudy.bannerImage || '/images/casestudies/aia/aia-header-image.svg',
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.title,
      description: caseStudy.description,
      images: [caseStudy.bannerImage || '/images/casestudies/aia/aia-header-image.svg'],
    },
  };
}

const CaseStudieDetail = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  // Find the case study data based on the slug
  const caseStudy = caseStudiesData.find(study => study.slug === slug);

  if (!caseStudy) {
    return <p>Case study not found!</p>;
  }

  const {
    title,
    description,
    businessType,
    industry,
    blocker,
    goal,
    solution,
    techStack,
    impactStats,
    impactBoxes,
    milestones,
    process,
  } = caseStudy;

  return (
    <div className="caseStudieDetail">
      <Container className="main">
        <div className="caseStudieDetail-background">
          <Image
            src="/images/casestudies/casestudyBackground.svg"
            alt="background"
            width={100}
            height={100}
          />
          {/* <Image
            src="/images/casestudies/heroSectionBackgroundRight.svg"
            alt="backgroundImage"
            width={100}
            height={100}
          /> */}
        </div>
      </Container>
      <section id="sideMargin">
        <Container className="main margins">
          <header>
            <div>
              <Image
                src={caseStudy.logo || '/images/casestudies/CaseSliderCardBanner.svg'}
                alt="logo"
                width={100}
                height={100}
              />
              <h1>{title}</h1>
              <p>{description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                <div>
                  <p style={{ color: '#726D6D' }}>Business Type</p>
                  <p style={{ color: 'white', fontSize: '15px' }}>{businessType}</p>
                </div>
                <div>
                  <p style={{ color: '#726D6D' }}>Industry</p>
                  <p style={{ color: 'white', fontSize: '15px' }}>{industry}</p>
                </div>
              </div>
            </div>
            <figure>
              <img
                // src={blogData.fields.image?.fields.file.url}
                src={caseStudy.bannerImage || '/images/casestudies/aia/aia-header-image.svg'}
                alt="Cover Image"
              />
            </figure>

          </header>
          <section style={{ padding: '10rem 0rem' }}>
            <span style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center' }}>
              <h1>The blocker</h1>
              <p style={{ fontSize: '15px' }}>{blocker}</p>
            </span>
            <header // data-aos="fade-up" data-aos-duration="900"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '2rem', gap: '3rem' }} className="BlockerGrid">
                <div>
                  <h2>The goal</h2>
                  <p style={{ fontSize: '15px' }}>{goal}</p>
                </div>
                <div>
                  <h2>The solution</h2>
                  <p style={{ fontSize: '15px' }}>{solution}</p>
                </div>
              </div>
            </header>
          </section>
          <MillstoneList data={milestones} process={process} />
          <section className="caseStudyTechStack">
            <header style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <h1>The chosen tech stack</h1>
              <p>The strategic IT staff augmentation led to significant improvements and achievements:</p>
            </header>
            <span
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                // width: '70%',
                margin: '0 auto',
                marginTop: '4rem',
                gap: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {techStack.map((tech, index) => (
                <img key={index} style={{ width: '50%', borderRadius: '1.5rem' }} src={tech.icon} alt={tech.name} />
              ))}
            </span>
          </section>
          {impactBoxes
          && (
            <span className="ourImpactBlock">
              <span>
                <h2>Our impact</h2>
                <p style={{ fontSize: '15px' }}>{impactStats.description}</p>
                {/* <h1>{impactStats.percentage}</h1> */}
                {/* <p>{impactStats.details}</p> */}
              </span>
              <section style={{ width: '100%' }}>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '0 0 0 auto' }} className="boxTick">
                  {impactBoxes.map((box, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: '#0F0F0FB2',
                        padding: '1rem',
                        borderRadius: '10px',
                      }}
                    >
                      <h3>{box.title}</h3>
                      <p style={{ fontSize: '15px' }}>{box.description}</p>
                    </div>
                  ))}
                </span>
              </section>
            </span>
          )}
        </Container>
      </section>
      <CaseStudyConversionBlock caseStudySlug={slug} caseStudyTitle={slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} />
    </div>
  );
};

export default CaseStudieDetail;
