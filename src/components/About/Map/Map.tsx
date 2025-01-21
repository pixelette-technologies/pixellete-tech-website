'use client';
import { Container } from '@/components/Feature/Container/Container';
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

  // const handleMouseLeave = () => {
  //   setHoveredIndex(londonIndex); // Revert to London index on mouse leave
  // };

  return (
    <Container className="main margins">
      <div className="map">
        <center>
          <h2>
            Our global hubs
          </h2>
          <p>
            Our presence spans across continents, with dedicated teams in 13 countries ensuring we are, both, globally connected and locally present.
          </p>
        </center>

        <div>
          {mapIndexData.map((el, index) => (
            <header key={index}>
              <div>
                {hoveredIndex === index && (
                  <div className="hide-section show">
                    <img src="/images/about/curve.svg" alt="curve" />
                    <section>
                      <p>{el.city}</p>
                      <div>
                        <img src="/images/about/phone.svg" alt="phone" />
                        <p>{el.phone}</p>
                      </div>
                      <div>
                        <img src="/images/about/mail.svg" alt="mail" />
                        <p>{el.mail}</p>
                      </div>
                      <div>
                        <img src="/images/about/pin.svg" alt="pin" />
                        <p>{el.address}</p>
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
                  style={{ width: '100px' }}
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
