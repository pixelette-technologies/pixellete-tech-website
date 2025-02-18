import { Button } from '@/components/Feature/Button/Button';
import { Container } from '@/components/Feature/Container/Container';
import Link from 'next/link';
import './index.css';

const NoDeveloperReq = (props) => {
  return (
    <>
      <Container className="main margins">
        <div className="unlockBussiness">
          <div>
            <h1>{props.heading}</h1>
            <p>{props.text}</p>
            <Link href="/contact-us">
              <Button
                className="primary"
              >
                {props.btnText}
              </Button>
            </Link>
          </div>

          <p>{props.text2}</p>
        </div>
      </Container>
    </>
  );
};

export default NoDeveloperReq;
