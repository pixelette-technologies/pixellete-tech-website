'use client';
import { Container } from '@/components/Feature/Container/Container';
import { Heading } from '@/components/Feature/Heading/Heading';
import Text from '@/components/Feature/Text/Text';
import { mapIndexData } from '@/data/mapIndexData';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import './map.css';

const Map: React.FC = () => {
  // Find the index of the London location
  const londonIndex = mapIndexData.findIndex(
    location => location.city === 'London, UK',
  );

  // Set the initial hoveredIndex to the London location index
  const [hoveredIndex, setHoveredIndex] = useState<number>(londonIndex);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(londonIndex); // Revert to London index on mouse leave
  };

  return (
    <Container className="main margins">
      <div className="map">
        <center>
          <Heading className="secondry">
            Global Reach, Local Impact: Pixelette Technologies Around the World
          </Heading>
          <Text className="titory--bold">
            Discover how Pixelette Technologies spans across continents, with
            dedicated teams in 13 countries ensuring we are both globally
            connected and locally present. Each location is strategically chosen
            to foster close relationships with local markets, offering tailored
            solutions that respect regional nuances and requirements.
          </Text>
        </center>

        <div>
          {mapIndexData.map((el, index) => (
            <header key={index}>
              <div>
                {hoveredIndex === index && (
                  <div className="hide-section show">
                    <img src="/images/about/curve.svg" alt="curve" />
                    <section>
                      <Text className="primary--bold">{el.city}</Text>
                      <div>
                        <img src="/images/about/phone.svg" alt="phone" />
                        <Text className="titory">{el.phone}</Text>
                      </div>
                      <div>
                        <img src="/images/about/mail.svg" alt="mail" />
                        <Text className="titory">{el.mail}</Text>
                      </div>
                      <div>
                        <img src="/images/about/pin.svg" alt="pin" />
                        <Text className="titory">{el.address}</Text>
                      </div>
                    </section>
                  </div>
                )}

                <motion.img
                  src={
                    hoveredIndex === index
                      ? '/images/about/pinMapColor.svg'
                      : '/images/about/pinMap.svg'
                  }
                  alt="pin"
                  className="image-for-hover"
                  whileHover={{ scale: 1.1 }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  style={{ width: '100%', height: '100%' }}
                  // onMouseLeave={handleMouseLeave}
                />
              </div>
            </header>
          ))}

          <section>
            <img src="/images/about/map.svg" alt="map" />
          </section>
        </div>
      </div>
    </Container>
  );
};

export default Map;
