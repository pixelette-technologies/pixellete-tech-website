import { Button } from "@/components/Feature/Button/Button";
import { Container } from "@/components/Feature/Container/Container";
import { Heading } from "@/components/Feature/Heading/Heading";
import Text from "@/components/Feature/Text/Text";
import { FaExternalLinkAlt } from "react-icons/fa";
import { technologyStackAiData } from "@/data/technologyStackAiData";
import './ourservicessection.css'
const OurServicesSection = () => {
  return (
    <>
      <div className="technologyStack">
        <center>
          <Heading
            className="secondry"
            animation="fade-up"
            duration="600"
            id="h_ani"
          >
           We bring full-stack development services to the table
          </Heading>
          <Text className="secondry" animation="fade-up" duration="700">
          Explore our full suite of development services designed to deliver success to businesses across various industries.
          </Text>
        </center>
        <Container className="main margins">
          <div className="margins" style={{ marginBottom: "3rem" }}>
            {technologyStackAiData.map((item, index) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "2rem 3rem",
                  width: "18rem",
                }}
                data-aos="fade-up"
                data-aos-duration={`600`}
              >
                <img src={item.icon} alt="icon" />
                <Text className="titory--bold">{item.title}</Text>
              </div>
            ))}
          </div>
          <center>
            <Button className="primary" animation="fade-up" duration="1300">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.7rem",
                }}
              >
                Explore All Services <FaExternalLinkAlt />
              </span>
            </Button>
          </center>
        </Container>
      </div>
    </>
  );
};

export default OurServicesSection;
