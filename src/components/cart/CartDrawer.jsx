import { ArrowRight, Check, Clock3, Minus, Plus, ShoppingBag, X } from "lucide-react";

function CartDrawer({ isOpen, isClosing, cart, itemCount, total, hasPriceToConfirm, storeOpen, onClose, onChangeQuantity, onContinueCheckout, onScrollToMenu }) {
  return (
    <>
      {isOpen && (
        <div
          className={`overlay cart-overlay${isClosing ? " closing" : ""}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <aside className={`cart-panel${isClosing ? " closing" : ""}`} aria-label="Shporta juaj">
            <div className="panel-header">
              <div>
                <span className="panel-kicker">DUA PIZZA</span>
                <h2>Shporta jote</h2>
              </div>
              <button
                className="close-button"
                onClick={() => onClose()}
                aria-label="Mbyll shportën"
              >
                <X />
              </button>
            </div>
            {cart.length ? (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                      <div className="cart-item" key={item.id}>
                      <img
                        className="cart-item-image"
                        src={item.image}
                        alt={`Foto e ${item.name}`}
                      />
                      <div className="cart-item-info">
                        <strong>
                          {item.name}
                          {item.variantLabel ? ` · ${item.variantLabel}` : ""}
                        </strong>
                        <span>
                          {item.price == null
                            ? "Çmimi konfirmohet në WhatsApp"
                            : `${(item.price * item.quantity).toFixed(2)} €`}
                        </span>
                      </div>
                      <div className="quantity-control">
                        <button
                          onClick={() => onChangeQuantity(item.id, -1)}
                          aria-label={`Hiq një ${item.name}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="quantity-value" key={item.quantity}>{item.quantity}</span>
                        <button
                          onClick={() => onChangeQuantity(item.id, 1)}
                          aria-label={`Shto një ${item.name}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <span>
                    {hasPriceToConfirm && total > 0
                      ? "Nëntotali i çmimeve të publikuara"
                      : "Nëntotali"}
                  </span>
                  <strong>
                    {hasPriceToConfirm && total === 0
                      ? "Konfirmohet"
                      : `${total.toFixed(2)} €`}
                  </strong>
                </div>
                {hasPriceToConfirm && (
                  <p className="price-confirm-note">
                    Çmimi i Mexicana-s konfirmohet në WhatsApp.
                  </p>
                )}
                <div className="free-delivery-note">
                  <Check size={16} /> Dërgesa falas në Podujevë
                </div>
                {!storeOpen && (
                  <div className="store-closed-note">
                    <Clock3 size={16} /> Porositë hapen në 10:00. Orari:
                    10:00–02:00.
                  </div>
                )}
                <button
                  className="button button-red checkout-button"
                  disabled={!storeOpen}
                  onClick={() => {
                    onClose(() => onContinueCheckout());
                  }}
                >
                  {storeOpen ? (
                    <>
                      VAZHDO TE POROSIA <ArrowRight size={17} />
                    </>
                  ) : (
                    "POROSITË HAPEN NË 10:00"
                  )}
                </button>
              </>
            ) : (
              <div className="cart-empty">
                <div className="cart-empty-icon">
                  <ShoppingBag size={26} />
                </div>
                <h3>Shporta është bosh</h3>
                <p>
                  Zgjidh picën dhe madhësinë, ose shto një sanduiç a pije nga
                  menuja.
                </p>
                <button
                  className="button button-dark"
                  onClick={() => {
                    onClose(onScrollToMenu);
                  }}
                >
                  SHIKO MENYNË <ArrowRight size={16} />
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  );
}

export default CartDrawer;
