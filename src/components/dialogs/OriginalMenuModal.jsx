import { X } from "lucide-react";

function OriginalMenuModal({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="overlay original-menu-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <section
            className="original-menu-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="original-menu-title"
          >
            <div className="original-menu-header">
              <div>
                <span className="panel-kicker">DUA PIZZA</span>
                <h2 id="original-menu-title">Menuja origjinale</h2>
              </div>
              <button
                className="close-button"
                onClick={() => onClose()}
                aria-label="Mbyll menynë origjinale"
              >
                <X />
              </button>
            </div>
            <div className="original-menu-image-wrap">
              <img
                src="/images/menu-origjinale.png"
                alt="Menuja origjinale e DUA Pizza"
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default OriginalMenuModal;
