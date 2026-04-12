'use client';
import { Container } from '@/components/Feature/Container/Container';
import './index.css';

const MillstoneList = ({ data, process }) => {
  const midIndex = Math.ceil(data.length / 2);
  return (
    <div
      className="millstoneList-container"
      style={{
        position: 'relative',
        // backgroundImage: `url(${assets.commonAssests.serviceSectionBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Container className="main margins">
        <div className="millstoneList">
          <header>
            <h1>
              The process
            </h1>
            <p>
              {process}
            </p>
          </header>
          <section>
            <header>
              {data && data.slice(0, midIndex).map(el => (
                <ItemLeft key={el.title} title={el.title} description={el.description} />
              ))}
            </header>
            <div></div>
            <section>
              {data && data.slice(midIndex).map(el => (
                <ItemRight key={el.title} title={el.title} description={el.description} />
              ))}
            </section>
          </section>
        </div>
      </Container>
    </div>
  );
};

export default MillstoneList;

const ItemLeft = (props) => {
  return (
    <div
      className="millstoneList-itemLeft"
    >
      <section>
        <div>
          <h3>
            {props.title}
          </h3>
          <p>
            {props.description}
          </p>
        </div>
        <img src="/images/casestudies/edeg.svg" alt="Milestone icon" />
      </section>
      <header>
        <img src="/images/casestudies/dot.svg" alt="Milestone icon" />
      </header>
    </div>
  );
};

const ItemRight = (props) => {
  return (
    <div
      className="millstoneList-itemRight"
    >
      <header>
        <img src="/images/casestudies/dot.svg" alt="Milestone icon" />
      </header>
      <section>
        <img src="/images/casestudies/edgeLeft.svg" alt="Milestone icon" />
        <div>
          <h3>
            {props.title}
          </h3>
          <p>
            {props.description}
          </p>
        </div>
      </section>
    </div>
  );
};
