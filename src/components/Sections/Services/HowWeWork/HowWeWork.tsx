import React from "react";
import "./index.css";

type HowWeWorkProps = object;

const data = [
  {
    title: "Discovery call",
    desc: "We identify your goals and define success metrics.",
  },
  {
    title: "Proposal & storyboarding",
    desc: "Our team designs your immersive experience from concept to prototype.",
  },
  {
    title: "Build & launch",
    desc: "We develop, test, and deploy using agile methods.",
  },
  {
    title: "Evaluate & support",
    desc: "We monitor performance and refine your solution for continued impact.",
  },
];

export const HowWeWork: React.FC<HowWeWorkProps> = () => {
  return (
    <div
      style={{ margin: "5rem 0", padding: "10rem 0" }}
      className="howWeWorkBg"
    >
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5rem",
            justifyContent: "center",
          }}
        >
          <div
            className="howWeWorkTextAlign"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h2>How we work</h2>
            {/* <p>
              {' '}
              We understand each client’s needs are unique, and we bring a
              <br />
              flexible, responsive approach to every project.
            </p> */}
            <p>
              Our agile process keeps every project aligned with your goals,
              timelines, and evolving requirements.
            </p>
          </div>
          <div className="expertiseGrid">
            <section className="HowWeWorkCards">
              {data.map((el, index) => (
                <div key={index}>
                  <h4>{index + 1}</h4>
                  <h3>{el.title}</h3>
                  <br />
                  <p>{el.desc}</p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
