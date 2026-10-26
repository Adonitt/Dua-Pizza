import { ArrowRight, Banknote, Check, Clock3, Info, MapPin, MessageCircle, ShoppingBag, X } from "lucide-react";

function CheckoutModal({ isOpen, sent, setSent, customer, setCustomer, orderType, setOrderType, storeOpen, onClose, onSendOrder, onClearCart }) {
  return (
    <>
      {isOpen && (
        <div
          className="overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <section className="checkout-modal" aria-label="Të dhënat e porosisë">
            <div className="panel-header">
              <div>
                <span className="panel-kicker">EDHE NJË HAP</span>
                <h2>
                  {sent ? "Porosia u hap në WhatsApp" : "Të dhënat e porosisë"}
                </h2>
              </div>
              <button
                className="close-button"
                onClick={() => {
                  onClose();
                  setSent(false);
                }}
                aria-label="Mbyll"
              >
                <X />
              </button>
            </div>
            {sent ? (
              <div className="sent-state">
                <div className="sent-check">
                  <Check size={25} />
                </div>
                <p>
                  WhatsApp u hap me porosinë tënde. Dërgoje mesazhin për ta
                  konfirmuar me ekipin.
                </p>
                <button
                  className="button button-dark"
                  onClick={() => {
                    onClose();
                    setSent(false);
                    onClearCart();
                  }}
                >
                  U KRYE <Check size={16} />
                </button>
              </div>
            ) : (
              <form onSubmit={onSendOrder} className="checkout-form">
                <div className="order-type-switch">
                  <button
                    type="button"
                    className={orderType === "Dërgesë" ? "selected" : ""}
                    onClick={() => setOrderType("Dërgesë")}
                  >
                    <MapPin size={15} /> Dërgesë
                  </button>
                  <button
                    type="button"
                    className={
                      orderType === "Marrje në lokal" ? "selected" : ""
                    }
                    onClick={() => setOrderType("Marrje në lokal")}
                  >
                    <ShoppingBag size={15} /> Marrje në lokal
                  </button>
                </div>
                <div className="order-data-notice" role="note">
                  <Info size={17} aria-hidden="true" />
                  <p>
                    Ju lutem sigurohuni që emri, numri i telefonit
                    {orderType === "Dërgesë" ? " dhe adresa" : ""} të jenë të
                    sakta, që porosia të përpunohet pa vonesa.
                  </p>
                </div>
                <div className="form-cash">
                  <Banknote size={16} aria-hidden="true" /> Pagesa bëhet me para
                  në dorë (cash).
                </div>
                <label>
                  Emri yt
                  <input
                    required
                    value={customer.name}
                    onChange={(e) =>
                      setCustomer({ ...customer, name: e.target.value })
                    }
                    placeholder="Si të thërrasim?"
                  />
                </label>
                <label>
                  Numri i telefonit
                  <input
                    required
                    type="tel"
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({ ...customer, phone: e.target.value })
                    }
                    placeholder="04X XXX XXX"
                  />
                </label>
                {orderType === "Dërgesë" && (
                  <>
                    <label>
                      Adresa e dërgesës
                      <input
                        required
                        value={customer.address}
                        onChange={(e) =>
                          setCustomer({ ...customer, address: e.target.value })
                        }
                        placeholder="Rruga, lagjja, ndonjë pikë orientimi"
                      />
                    </label>
                    <div className="form-delivery">
                      <MapPin size={15} /> Dërgesa falas në Podujevë
                    </div>
                  </>
                )}
                <label>
                  Shënim <span className="optional">(opsionale)</span>
                  <textarea
                    value={customer.note}
                    onChange={(e) =>
                      setCustomer({ ...customer, note: e.target.value })
                    }
                    placeholder="Ndonjë kërkesë e veçantë?"
                    rows="3"
                  />
                </label>
                {!storeOpen && (
                  <div className="store-closed-note">
                    <Clock3 size={16} /> Porositë pranohen çdo ditë nga 10:00
                    deri në 02:00.
                  </div>
                )}
                <button
                  className="button button-red checkout-button"
                  type="submit"
                  disabled={!storeOpen}
                >
                  {storeOpen ? (
                    <>
                      DËRGO NË WHATSAPP <MessageCircle size={17} />
                    </>
                  ) : (
                    "POROSITË HAPEN NË 10:00"
                  )}
                </button>
              </form>
            )}
          </section>
        </div>
      )}
    </>
  );
}

export default CheckoutModal;
