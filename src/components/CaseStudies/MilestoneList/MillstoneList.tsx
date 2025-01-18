"use client"
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { Container } from "@/components/Feature/Container/Container";
import data from "@/data";
import './index.css'
const MillstoneList = () => {
  return (
    <div
      className="millstoneList-container"
      style={{
        position: "relative",
        // backgroundImage: `url(${assets.commonAssests.serviceSectionBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Container className="main margins">
        <div className="millstoneList">
          <header>
            <h1
            >
              Our Journey: Milestones and Achievements
            </h1>
            <p
            >
              Explore key moments in Pixelette Technologies' history,
              highlighting our path from inception to becoming a leader in
              technology and innovation:
            </p>
          </header>
          <section>
            <header>
              {data.millstoneListLeft.map((el) => (
                <ItemLeft key={el.date} date={el.date} text={el.text} />
              ))}
            </header>
            <div></div>
            <section>
              {data.millstoneListRight.map((el) => (
                <ItemRight key={el.date} date={el.date} text={el.text} />
              ))}
            </section>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default MillstoneList;

const useBlurEffect = () => {
  const { ref, inView, entry } = useInView({
    threshold: [0, 0.5, 1],
    rootMargin: "-30% 0px -30% 0px",
  });

  const [isBlurred, setIsBlurred] = useState(true);

  useEffect(() => {
    if (entry) {
      if (entry.intersectionRatio >= 0.5) {
        setIsBlurred(false);
      } else {
        setIsBlurred(true);
      }
    }
  }, [entry]);

  return { ref, isBlurred };
};

const ItemLeft = (props) => {
  const { ref, isBlurred } = useBlurEffect();

  return (
    <div
      className={`millstoneList-itemLeft ${isBlurred ? "blur" : ""}`}
      ref={ref}
    >
      <section>
        <div>
          <h3>
            {props.date}
          </h3>
          <p>
            {props.text}
          </p>
        </div>
        <img src="/images/casestudies/edeg.svg" alt="icon" />
      </section>
      <header>
        <img src="/images/casestudies/dot.svg" alt="icon" />
      </header>
    </div>
  );
};

const ItemRight = (props) => {
  const { ref, isBlurred } = useBlurEffect();

  return (
    <div
      className={`millstoneList-itemRight ${isBlurred ? "blur" : ""}`}
      ref={ref}
    >
      <header>
        <img src="/images/casestudies/dot.svg" alt="icon" />
      </header>
      <section>
        <img src="/images/casestudies/edgeLeft.svg" alt="icon" />
        <div>
          <h3>
            {props.date}
          </h3>
          <p>
            {props.text}
          </p>
        </div>
      </section>
    </div>
  );
};
