import type { FC } from 'react';
import Image from 'next/image';
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from 'react-icons/fa';
import Text from '../Text/Text';
import './cards.css';

type TeamCardProps = {
  profile: string;
  name: string;
  role: string;
  animation: string;
};

const TeamCard: FC<TeamCardProps> = ({ profile, name, role, animation }) => {
  return (
    <div className="teamCard" data-aos={animation}>
      <Image src={profile} alt="profile" width={150} height={150} className="profile-img" />
      <h5 data-aos="fade-up">{name}</h5>
      <p>
      {role}
      </p>
      
      <div data-aos="fade-up">
        <FaFacebookF />
        <FaLinkedinIn />
        <FaXTwitter />
      </div>
    </div>
  );
};

export default TeamCard;
