import { ArrowRight, Clock3, MapPin, MessageCircle } from "lucide-react";

function ContactSection({ whatsappNumber, mapUrl }) {
  return (
        <section className="contact-section" id="contact" data-reveal>
          <div className="contact-heading" data-reveal>
            <div>
              <span className="contact-label">KE PYETJE? NA GJEN KËTU</span>
              <h2>NA KONTAKTO</h2>
            </div>
            <a
              className="contact-whatsapp"
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Përshëndetje DUA Pizza, dua të komunikoj me ju.")}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={20} /> Komuniko me ne në WhatsApp{" "}
              <ArrowRight size={16} />
            </a>
          </div>
          <div className="contact-details-grid" data-reveal>
            <div className="contact-column" data-reveal>
              <div className="contact-phone-card">
                <span className="contact-detail-kicker">TELEFONI</span>
                <a href="tel:+38348666613" className="contact-phone">
                  <Clock3 size={20} /> +383 48 666 613
                </a>
                <span className="contact-hint">
                  Telefono ose ruaje numrin tonë.
                </span>
              </div>
              <div className="hours-card">
                <h3>ORARI I PUNËS</h3>
                <table className="hours-table">
                  <tbody>
                    {[
                      "E hënë",
                      "E martë",
                      "E mërkurë",
                      "E enjte",
                      "E premte",
                      "E shtunë",
                      "E diel",
                    ].map((day) => (
                      <tr key={day}>
                        <th scope="row">{day}</th>
                        <td>10:00 – 02:00</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p>
                  Çdo ditë, nga ora 10:00 e mëngjesit deri në 02:00 pas mesnate.
                </p>
              </div>
            </div>
            <div className="location-card" data-reveal style={{ "--reveal-delay": "90ms" }}>
              <div className="location-heading">
                <div>
                  <span className="contact-detail-kicker">
                    NA GJEN NË PODUJEVË
                  </span>
                  <h3>LOKACIONI</h3>
                </div>
                <a href={mapUrl} target="_blank" rel="noreferrer">
                  <MapPin size={15} /> Hape në Google Maps{" "}
                  <ArrowRight size={15} />
                </a>
              </div>
              <iframe
                title="Lokacioni i DUA Pizza në Google Maps"
                src="https://maps.google.com/maps?q=42.90326113181257%2C21.19432349660102&t=&z=15&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>
  );
}

export default ContactSection;
