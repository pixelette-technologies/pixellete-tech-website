"use client"
import { useState } from "react";
import './technologiesused.css'
import { Container } from "@/components/Feature/Container/Container";
import { Heading } from "@/components/Feature/Heading/Heading";
import Text from "@/components/Feature/Text/Text";
import technologies from '@/data/technologies'
const TechnologiesUsed = () => {
  const [activeTab, setActiveTab] = useState("AI_ML_BI");

  return (
    <div className="technologies-main">
      <Container className="main margins">
        <center>
          <Heading
            className="secondry"
            animation="fade-up"
            duration="600"
            id="h_ani"
          >
            Benefit from our unmatched tech <br />
            stack expertise
          </Heading>
          <Text className="secondry" animation="fade-up" duration="700">
            With our team&apos;s deep mastery in the latest frameworks,
            languages, and tools, we build scalable, secure, and
            high-performance applications that set new standards. From ideation
            to deployment, our technology capabilities are designed to drive
            your business forward.
          </Text>
        </center>
        <div className="technologies-layout">
          <div className="tabs-section">
            {["AI_ML_BI", "Software", "Mobile", "Blockchain"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
              >
                {tab.replace("_", " ")}
              </button>
            ))}
          </div>

          <div className="content-section" key={activeTab}>
            <div className="icons-container">
              {technologies[activeTab].map((tech) => (
                <div className="icon-card" key={tech.id}>
                  <img src={tech.icon} alt={tech.name} className="icon-img" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TechnologiesUsed;
