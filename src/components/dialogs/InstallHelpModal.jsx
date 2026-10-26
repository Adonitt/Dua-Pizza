import { Check, MoreVertical, Smartphone, X } from "lucide-react";

function InstallHelpModal({ isOpen, onClose, isAppleMobile, isAndroid }) {
  return (
    <>
      {isOpen && (
        <div
          className="overlay install-help-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <section
            className="install-help-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-help-title"
          >
            <div className="panel-header">
              <div>
                <span className="panel-kicker">DUA PIZZA</span>
                <h2 id="install-help-title">Shto app në telefon</h2>
              </div>
              <button
                className="close-button"
                onClick={() => onClose()}
                aria-label="Mbyll udhëzimin"
              >
                <X />
              </button>
            </div>
            <p className="install-help-intro">
              Ndiq hapat për pajisjen tënde. Nëse faqja është hapur brenda WhatsApp-it ose Instagram-it, hape fillimisht në shfletues.
            </p>
            <div className="install-platform-guides">
              <details className="install-platform-guide" open={isAppleMobile}>
                <summary><Smartphone size={16} aria-hidden="true" /> iPhone / iPad (iOS)</summary>
                <ol className="install-help-steps">
                  <li>Hape faqen në Safari. Nëse është hapur brenda një aplikacioni, përdor opsionin “Open in Safari”.</li>
                  <li>Prek Share (Shpërndaje) në shiritin e poshtëm të Safari-t. Ikona duket si katror me shigjetë lart.</li>
                  <li>Te lista që hapet, rrëshqit lart dhe prek “Add to Home Screen” (Shto në ekranin kryesor).</li>
                  <li>Nëse shfaqet “Open as Web App”, lëre të aktivizuar dhe prek “Add” (Shto) lart djathtas.</li>
                </ol>
              </details>
              <details className="install-platform-guide" open={isAndroid}>
                <summary><MoreVertical size={16} aria-hidden="true" /> Android (Chrome)</summary>
                <ol className="install-help-steps">
                  <li>Hape faqen në Chrome. Nëse është hapur brenda WhatsApp-it ose Instagram-it, zgjidh “Open in Chrome”.</li>
                  <li>Prek menynë me tri pika vertikale në cepin e sipërm djathtas të Chrome-it.</li>
                  <li>Prek “Install app” (Instalo aplikacionin). Nëse nuk shfaqet, zgjidh “Add to Home screen” (Shto në ekranin kryesor).</li>
                  <li>Konfirmo me “Install” ose “Add”. Ikona e DUA Pizza do të shfaqet në ekranin kryesor ose në listën e aplikacioneve.</li>
                </ol>
              </details>
            </div>
            <button
              className="button button-dark install-help-done"
              onClick={() => onClose()}
            >
              U KRYE <Check size={16} />
            </button>
          </section>
        </div>
      )}
    </>
  );
}

export default InstallHelpModal;
