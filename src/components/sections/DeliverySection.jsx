import { ArrowRight, MapPin, Sparkles } from "lucide-react";

function DeliverySection() {
  return (
        <section className="delivery-band" id="about" data-reveal>
          <div className="delivery-mark">
            DUA
            <span>
              <Sparkles size={70} aria-hidden="true" />
            </span>
          </div>
          <div className="delivery-copy">
            <span className="eyebrow eyebrow-light">
              <span className="eyebrow-line" /> KËNAQËSIA VJEN TE DERA
            </span>
            <h2>
              DELIVERY?
              <br />
              <span>ËSHTË NGA NE.</span>
            </h2>
            <p>
              Dërgesë falas, pa kushte e pa hile — në të gjitha zonat e
              Podujevës.
            </p>
          </div>
          <div className="delivery-badge">
            <MapPin size={19} />
            <span>0 €</span>
            <small>DELIVERY</small>
          </div>
          <div className="delivery-squiggle" aria-hidden="true">
            <ArrowRight size={72} strokeWidth={1} />
          </div>
        </section>
  );
}

export default DeliverySection;
