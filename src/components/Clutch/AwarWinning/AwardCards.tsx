import awardsData from "../../../data/awardcard/awardcardData";

const AwardCards = () => {
  return (
    <>
      <div className="award-section">
        <div className="award-cards">
          {awardsData.map((award) => (
            <div key={award.id} className="award-card">
              <img src={award.src} alt={award.alt} />
            </div>
          ))}
        </div>
        <div>
          <img src="/images/Clutch/portfolio-marketing.svg" alt="img" />
        </div>
      </div>
    </>
  );
};

export default AwardCards;
