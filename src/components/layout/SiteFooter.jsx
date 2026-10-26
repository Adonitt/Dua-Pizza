import { Clock3, MapPin, MessageCircle, Smartphone } from "lucide-react";
import Logo from "./Logo.jsx";

function SiteFooter({ appInstalled, onInstallApp, whatsappNumber, mapUrl }) {
  return (
    <footer className="footer" data-reveal>
      <div className="footer-main" data-reveal>
        <div className="footer-brand">
          <a href="#home" aria-label="DUA Pizza, kthehu në krye"><Logo className="footer-logo" /></a>
          <p>Shije e mirë. Zemër e mirë.</p>
        </div>
        <div className="footer-column">
          <h3>MENYJA</h3>
          <nav aria-label="Navigimi në fund të faqes">
            <a href="#home">Kryefaqja</a><a href="#menu">Menuja</a><a href="#about">Për ne</a><a href="#contact">Na kontakto</a>
          </nav>
          {!appInstalled && (
            <button className="install-app-button" type="button" onClick={onInstallApp}>
              <Smartphone size={14} aria-hidden="true" /> Shto si app në telefon
            </button>
          )}
        </div>
        <div className="footer-column footer-contact">
          <h3>NA GJEN KËTU</h3>
          <a href="tel:+38348666613">+383 48 666 613</a>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><MessageCircle size={14} /> Komuniko me ne në WhatsApp</a>
          <a href={mapUrl} target="_blank" rel="noreferrer"><MapPin size={14} /> Lokacioni në Google Maps</a>
          <span><Clock3 size={14} /> Çdo ditë · 10:00–02:00</span>
        </div>
      </div>
      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} DUA Pizza · Podujevë</small>
        <small>Ndërtuar nga <a href="https://adonithalili.netlify.app/" target="_blank" rel="noreferrer">Adonit Halili</a></small>
      </div>
    </footer>
  );
}

export default SiteFooter;
