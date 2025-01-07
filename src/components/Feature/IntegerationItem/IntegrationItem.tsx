import React from 'react';
import Text from '../Text/Text';

type IntegrationItemProps = {
  icon: string;
  name: string;
};

const IntegrationItem: React.FC<IntegrationItemProps> = ({ icon, name }) => {
  return (
    <div
      className="integrationItem"
      data-aos="fade-up"
      data-aos-duration="500"
    >
      <img src={icon} alt="icon" />
       <p>{name}</p>
    </div>
  );
};

export default IntegrationItem;
