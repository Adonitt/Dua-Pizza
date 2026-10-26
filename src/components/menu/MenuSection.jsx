import { ArrowRight, Menu as MenuIcon } from "lucide-react";
import { menuCategories, products } from "../../menuData.js";
import ProductCard from "./ProductCard.jsx";

function MenuSection({
  category,
  onSelectCategory,
  selectedVariants,
  onSelectVariant,
  onAddToCart,
  firstProductCardRef,
  onOpenOriginalMenu,
  whatsappNumber,
}) {
  const visibleProducts = products.filter((product) => product.category === category);

  return (
    <section className="menu-section section-wrap" id="menu">
      <div className="section-heading" data-reveal>
        <div>
          <div className="eyebrow"><span className="eyebrow-line" /> ZGJIDH TË PREFERUARËN</div>
          <h2>MENUJA <span>JONË</span></h2>
        </div>
        <div className="menu-heading-actions">
          <p>Shije të mira, për momente të mira.<br />Zgjidh çka të hahet sot.</p>
          <button type="button" className="original-menu-button" onClick={onOpenOriginalMenu}>
            <MenuIcon size={16} /> SHIKO MENYNË ORIGJINALE
          </button>
        </div>
      </div>
      {products.length > 0 ? (
        <>
          <div className="category-tabs" role="tablist" aria-label="Kategoritë e menusë">
            {menuCategories.map((item) => (
              <button
                key={item}
                className={category === item ? "category-tab active" : "category-tab"}
                onClick={() => onSelectCategory(item)}
                role="tab"
                aria-selected={category === item}
              >{item}</button>
            ))}
          </div>
          <div className="preview-banner">
            <span>FOTOT</span>
            <p>Fotot janë vendosur te artikujt përkatës. Madhësitë dhe çmimet bazohen në menynë e dërguar.</p>
          </div>
          <div className="product-grid" key={category}>
            {visibleProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                selectedIndex={selectedVariants[product.id] ?? 0}
                onSelectVariant={onSelectVariant}
                onAddToCart={onAddToCart}
                cardRef={index === 0 ? firstProductCardRef : null}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="menu-empty">
          <span className="empty-kicker">SË SHPEJTI NË MENY</span>
          <h3>Po e përgatisim<br />diçka <em>të shijshme.</em></h3>
          <p>Menuja jonë po vjen. Na ndiq prapë pak më vonë — kemi plot shije për të ndarë.</p>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="empty-link">
            PYET PËR MENYNË <ArrowRight size={15} />
          </a>
        </div>
      )}
    </section>
  );
}

export default MenuSection;
