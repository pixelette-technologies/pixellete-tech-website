import type { FC } from 'react';
import Link from 'next/link';
import { Button } from '../Button/Button';
import { Heading } from '../Heading/Heading';
import Text from '../Text/Text';
import './blogcard.css';

type BlogCardProps = {
  animation?: string;
  duration?: string;
  image: string;
  date: string;
  heading: string;
  description: string;
  to: string;
};

export const BlogCard: FC<BlogCardProps> = ({
  animation,
  duration,
  image,
  date,
  heading,
  description,
  to,
}) => {
  console.log(to);
  return (
    <div className="blogCard" data-aos={animation} data-aos-duration={duration}>
      <figure>
        <img src={image} alt="Blog-Profile" />
      </figure>
       <p>{date}</p>
      <h2 className="blogCardHeading">{heading}</h2>
       <p className="blogCardDescription">{description}</p>
      <Link href={`/blogs/${to}`}>
        <Button className="primary">Read More</Button>
      </Link>
    </div>
  );
};

export default BlogCard;
