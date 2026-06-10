import awardsData from '../../../data/awardcard/awardcardData';

const AwardCards = () => {
  return (
    <>
      <div className="award-section">
        <div className="award-cards">
          {awardsData.map(award => (
            <div key={award.id} className="award-card">
              <img loading="lazy" src={award.src} alt={award.alt} />
            </div>
          ))}
        </div>
        <div>
          <img loading="lazy" src="/images/Clutch/portfolio-marketing.svg" alt="Clutch award badge" />
        </div>
      </div>
    </>
  );
};

export default AwardCards;
