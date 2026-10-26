function QuickFacts() {
  return (
        <section className="quick-facts" aria-label="Përparësitë tona" data-reveal>
          <div className="fact" data-reveal>
            <span className="fact-icon">01</span>
            <div>
              <strong>Porosit në WhatsApp</strong>
              <small>Na shkruaj direkt</small>
            </div>
          </div>
          <span className="fact-divider" />
          <div className="fact" data-reveal style={{ "--reveal-delay": "70ms" }}>
            <span className="fact-icon">02</span>
            <div>
              <strong>Dërgesë falas</strong>
              <small>Në të gjitha zonat e Podujevës</small>
            </div>
          </div>
          <span className="fact-divider" />
          <div className="fact" data-reveal style={{ "--reveal-delay": "140ms" }}>
            <span className="fact-icon">03</span>
            <div>
              <strong>Porosit lehtë</strong>
              <small>Direkt në WhatsApp</small>
            </div>
          </div>
        </section>
  );
}

export default QuickFacts;
