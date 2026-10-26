import { Menu as MenuIcon, MessageCircle, ShoppingBag } from "lucide-react";

function OrderSteps() {
  return (
        <section className="order-steps section-wrap" data-reveal>
          <div className="section-heading steps-heading" data-reveal>
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line" /> PA KOMPLIKIME
              </div>
              <h2>
                3 HAPA.
                <br />
                <span>PAK KOHË.</span>
              </h2>
            </div>
            <p>
              Zgjedh produktet, plotëso të dhënat,
              <br />
              dhe dërgo porosinë në WhatsApp.
            </p>
          </div>
          <div className="steps-grid">
            <article className="step-card" data-reveal>
              <span className="step-num">01</span>
              <div className="step-icon">
                <MenuIcon size={22} />
              </div>
              <h3>Zgjedh shijen</h3>
              <p>Shfleto menynë dhe shto të preferuarat në shportë.</p>
            </article>
            <article className="step-card" data-reveal style={{ "--reveal-delay": "80ms" }}>
              <span className="step-num">02</span>
              <div className="step-icon">
                <ShoppingBag size={22} />
              </div>
              <h3>Plotëso porosinë</h3>
              <p>Na trego si quhesh e ku ta sjellim.</p>
            </article>
            <article className="step-card" data-reveal style={{ "--reveal-delay": "160ms" }}>
              <span className="step-num">03</span>
              <div className="step-icon">
                <MessageCircle size={22} />
              </div>
              <h3>Dërgo në WhatsApp</h3>
              <p>Konfirmoje porosinë direkt me ekipin tonë.</p>
            </article>
          </div>
        </section>
  );
}

export default OrderSteps;
