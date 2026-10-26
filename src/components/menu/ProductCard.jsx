import { Plus } from "lucide-react";

function ProductCard({
  product,
  index,
  selectedIndex,
  onSelectVariant,
  onAddToCart,
  cardRef,
}) {
  const selectedVariant = product.variants[selectedIndex];
  const imageShapeClass =
    product.category === "Sanduiçe"
      ? "product-card-sandwich"
      : product.category === "Pije"
        ? "product-card-drink"
        : product.category === "Sosat"
          ? "product-card-sauce"
          : "";

  return (
    <article
      ref={cardRef}
      className={`product-card ${imageShapeClass}`}
      data-reveal
      style={{ "--reveal-delay": `${Math.min(index, 8) * 45}ms` }}
    >
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={`Foto e ${product.name}`}
          loading="lazy"
          width="960"
          height="640"
        />
        <span className="product-number">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="product-info">
        <div>
          <p className="product-category">{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        {product.variants.length === 1 && (
          <strong className="product-price">
            {selectedVariant.price == null
              ? "Na pyetni"
              : `${selectedVariant.price.toFixed(2)} €`}
          </strong>
        )}
      </div>
      {product.description && (
        <p className="product-description">{product.description}</p>
      )}
      {product.variants.length > 1 && (
        <div
          className="size-picker"
          aria-label={`Zgjidh madhësinë për ${product.name}`}
        >
          <span>ZGJIDH MADHËSINË</span>
          <div className="size-options">
            {product.variants.map((variant, variantIndex) => (
              <button
                type="button"
                key={variant.label}
                className={selectedIndex === variantIndex ? "size-option active" : "size-option"}
                onClick={() => onSelectVariant(product.id, variantIndex)}
                aria-pressed={selectedIndex === variantIndex}
                title={variant.label}
                aria-label={`${variant.label}, ${variant.price == null ? "çmimi konfirmohet" : `${variant.price.toFixed(2)} euro`}`}
              >
                <span className="size-option-main">{variant.label.split(" · ")[0]}</span>
                <strong>{variant.price == null ? "Pyetni" : `${variant.price.toFixed(2)} €`}</strong>
                {variant.label.includes("Familjare") && <small>Familjare</small>}
              </button>
            ))}
          </div>
        </div>
      )}
      <button className="add-button" onClick={() => onAddToCart(product, selectedVariant)}>
        SHTO NË SHPORTË <Plus size={16} />
      </button>
    </article>
  );
}

export default ProductCard;
