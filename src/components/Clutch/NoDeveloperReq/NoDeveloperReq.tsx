import { Button } from "@/components/Feature/Button/Button";
import { Container } from "@/components/Feature/Container/Container";
import { Heading } from "@/components/Feature/Heading/Heading";
import Text from "@/components/Feature/Text/Text";
import Link from "next/link";
import './index.css'

const NoDeveloperReq = (props) => {
  return (
    <>
      <Container className="main margins">
        <div className="unlockBussiness">
          <div>
            <Heading className="primary">{props.heading}</Heading>
            <Text className="secondry">{props.text}</Text>
            <Link href="contactUs">
              <Button
                className="primary"
              >
                {props.btnText}
              </Button>
            </Link>
          </div>

          <Text className="secondry">{props.text2}</Text>
        </div>
      </Container>
    </>
  );
};

export default NoDeveloperReq;
