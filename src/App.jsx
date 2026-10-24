import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Banknote, Check, Clock3, Info, MapPin, Menu as MenuIcon, MessageCircle, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import { menuCategories, products } from './menuData.js';

const WHATSAPP_NUMBER = '38348666613';
const SHOP_TIME_ZONE = 'Europe/Belgrade';
const SHOP_MAP_URL = 'https://www.google.com/maps/search/?api=1&query=42.90326113181257%2C21.19432349660102';

function isOrderingOpen() {
  const timeParts = new Intl.DateTimeFormat('en-GB', {
    timeZone: SHOP_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const hour = Number(timeParts.find((part) => part.type === 'hour')?.value ?? 0);
  const minute = Number(timeParts.find((part) => part.type === 'minute')?.value ?? 0);
  const currentMinutes = hour * 60 + minute;
  return currentMinutes >= 10 * 60 || currentMinutes < 2 * 60;
}
const heroSlides = [
  { image: '/images/pizza-hero.webp', label: 'Pica e sapopjekur', caption: 'E SAPOPJEKUR, GATI PËR TY' },
  { image: '/images/sandwich-hero.png', label: 'Sanduiç i freskët', caption: 'SANDUIÇ I NGROHTË, GATI PËR TY' },
  {
    image: '/images/pije/coca-cola.webp',
    label: 'Pijet e preferuara',
    caption: 'PIJET E PREFERUARA, TË FTOHTA',
    drinks: [
      { image: '/images/pije/fanta-orange.webp', label: 'Fanta' },
      { image: '/images/pije/coca-cola.webp', label: 'Coca-Cola' },
      { image: '/images/pije/golden%20eagle.webp', label: 'Golden Eagle' },
    ],
  },
];

function Logo({ className = '' }) {
  return <img className={`brand-logo ${className}`} src="/dua-pizza-logo-red-yellow.png" alt="DUA Pizza — delivery falas" />;
}

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(isOrderingOpen);
  const [category, setCategory] = useState('Pica');
  const [selectedVariants, setSelectedVariants] = useState({});
  const [orderType, setOrderType] = useState('Dërgesë');
  const [sent, setSent] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [addedProduct, setAddedProduct] = useState('');
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', note: '' });
  const toastTimer = useRef(null);
  const heroTouchStartX = useRef(null);
  const firstProductCardRef = useRef(null);
  const scrollToProductsRef = useRef(false);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = useMemo(() => cart.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0), [cart]);
  const hasPriceToConfirm = cart.some((item) => item.price == null);
  const visibleProducts = products.filter((item) => item.category === category);

  useEffect(() => {
    const hoursTimer = window.setInterval(() => setStoreOpen(isOrderingOpen()), 15000);
    return () => window.clearInterval(hoursTimer);
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  useEffect(() => {
    if (!scrollToProductsRef.current) return;
    scrollToProductsRef.current = false;
    firstProductCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [category]);

  const addToCart = (product, variant) => {
    const itemId = `${product.id}-${variant.label}`;
    setCart((current) => {
      const found = current.find((item) => item.id === itemId);
      return found
        ? current.map((item) => item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { id: itemId, name: product.name, image: product.image, variantLabel: variant.label === 'Standard' ? '' : variant.label, price: variant.price, quantity: 1 }];
    });
    setAddedProduct(product.name);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setAddedProduct(''), 2400);
  };

  const changeQuantity = (id, delta) => {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
      .filter((item) => item.quantity > 0));
  };

  const sendOrder = (event) => {
    event.preventDefault();
    if (!isOrderingOpen()) {
      setStoreOpen(false);
      return;
    }
    const lines = cart.map((item) => `• ${item.quantity} × ${item.name}${item.variantLabel ? ` (${item.variantLabel})` : ''} — ${item.price == null ? 'çmimi konfirmohet' : `${(item.price * item.quantity).toFixed(2)} €`}`);
    const message = [
      '🍕 *POROSI E RE — DUA PIZZA*',
      '',
      'Përshëndetje! Dua të porosis:',
      '',
      '🧾 *Artikujt:*',
      ...lines,
      '',
      hasPriceToConfirm ? `💶 Nëntotali i artikujve me çmim: ${total.toFixed(2)} €` : `💶 *Totali: ${total.toFixed(2)} €*`,
      '',
      orderType === 'Dërgesë' ? '🚚 *Dërgesë* — falas në Podujevë' : '🏪 *Marrje në lokal*',
      '💵 *Pagesa:* Me para në dorë (cash)',
      '',
      '👤 *Të dhënat e klientit:*',
      `Emri: ${customer.name}`,
      `Telefoni: ${customer.phone}`,
      ...(orderType === 'Dërgesë' ? [`📍 Adresa: ${customer.address}`] : []),
      ...(customer.note ? [`📝 Shënim: ${customer.note}`] : []),
      '',
      'Ju lutem ma konfirmoni porosinë. Faleminderit! 🙏',
    ].join('\n');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const scrollToMenu = () => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  const selectCategory = (nextCategory) => {
    if (nextCategory === category) {
      firstProductCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    scrollToProductsRef.current = true;
    setCategory(nextCategory);
  };

  const handleHeroSwipeEnd = (event) => {
    const startX = heroTouchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    heroTouchStartX.current = null;
    if (startX == null || endX == null || Math.abs(endX - startX) < 45) return;
    setHeroSlide((current) => (current + (endX < startX ? 1 : -1) + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="site-shell">
      <div className="announcement"><Sparkles className="announcement-dot" size={11} aria-hidden="true" /> DËRGESA FALAS NË GJITHË PODUJEVËN <span className="announcement-separator" aria-hidden="true"><Sparkles size={12} /></span> SHIJE QË TË MBETET N'MEND</div>

      <header className="topbar">
        <a className="logo-link" href="#home" aria-label="DUA Pizza, faqja kryesore"><Logo /></a>
        <nav className="desktop-nav" aria-label="Navigimi kryesor">
          <a href="#home">Kryefaqja</a>
          <a href="#menu">Menuja</a>
          <a href="#about">Për ne</a>
          <a href="#contact">Na kontakto</a>
        </nav>
        <button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label={`Hap shportën, ${itemCount} artikuj`}>
          <ShoppingBag size={18} strokeWidth={2.2} /><span className="cart-label">Shporta</span><span className="cart-count">{itemCount}</span>
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="hero-copy-photo" aria-hidden="true" style={{ backgroundImage: `linear-gradient(rgba(229,37,42,.58),rgba(229,37,42,.58)),url('${heroSlides[heroSlide].image}')` }} />
            <div className="eyebrow"><span className="eyebrow-line" /> E BËJMË ME DASHNI, E SJELLIM ME KËNAQËSI</div>
            <h1>PICA QË<br /><span>THËRRASIN</span><br />PËR NJË COPË.</h1>
            <p className="hero-description">Zgjedh çka të hahet, porosite lehtë në WhatsApp, dhe ne ta sjellim. Dërgesa është falas në Podujevë.</p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={scrollToMenu}>SHIKO MENYNË <ArrowRight size={17} /></button>
              <a className="hero-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><MessageCircle size={19} /> Na shkruaj në WhatsApp</a>
            </div>
            <div className="hero-note"><span className="note-check"><Check size={13} /></span> Dërgesë falas në Podujevë <span className="note-divider">·</span> Dërgesë ose marrje</div>
          </div>
          <div className="hero-art" aria-label="Fotografi të produkteve DUA Pizza. Rrëshqit majtas ose djathtas për të ndërruar foton." onTouchStart={(event) => { heroTouchStartX.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={handleHeroSwipeEnd} onTouchCancel={() => { heroTouchStartX.current = null; }} onKeyDown={(event) => { if (event.key === 'ArrowRight') setHeroSlide((current) => (current + 1) % heroSlides.length); if (event.key === 'ArrowLeft') setHeroSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length); }}>
            <div className={`hero-photo${heroSlides[heroSlide].drinks ? ' hero-photo-drinks' : ''}`}>
              {heroSlides[heroSlide].drinks
                ? <div className="hero-drink-lineup" aria-label="Coca-Cola, Fanta dhe Golden Eagle">{heroSlides[heroSlide].drinks.map((drink) => <img key={drink.label} src={drink.image} alt={drink.label} />)}</div>
                : <img key={heroSlides[heroSlide].image} src={heroSlides[heroSlide].image} alt={heroSlides[heroSlide].label} />}
            </div>
            <div className="hero-sticker"><span>ME<br />DASHNI</span><Sparkles className="sticker-star" size={15} aria-hidden="true" /></div>
            <div className="photo-caption"><span>{String(heroSlide + 1).padStart(2, '0')} /</span> {heroSlides[heroSlide].caption}</div>
            <div className="hero-slide-dots" aria-label="Fotot e prezantuara">{heroSlides.map((slide, index) => <button key={slide.image} type="button" className={index === heroSlide ? 'active' : ''} aria-label={`Shfaq: ${slide.label}`} aria-pressed={index === heroSlide} onClick={() => setHeroSlide(index)} />)}</div>
            <div className="photo-frame" />
          </div>
          <a className="scroll-cue" href="#menu" aria-label="Zbrit te menuja"><ArrowDown size={18} /></a>
        </section>

        <section className="quick-facts" aria-label="Përparësitë tona">
          <div className="fact"><span className="fact-icon">01</span><div><strong>Porosit në WhatsApp</strong><small>Na shkruaj direkt</small></div></div>
          <span className="fact-divider" />
          <div className="fact"><span className="fact-icon">02</span><div><strong>Dërgesë falas</strong><small>Në të gjitha zonat e Podujevës</small></div></div>
          <span className="fact-divider" />
          <div className="fact"><span className="fact-icon">03</span><div><strong>Porosit lehtë</strong><small>Direkt në WhatsApp</small></div></div>
        </section>

        <section className="menu-section section-wrap" id="menu">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="eyebrow-line" /> ZGJIDH TË PREFERUARËN</div><h2>MENUJA <span>JONË</span></h2></div>
            <div className="menu-heading-actions"><p>Shije të mira, për momente të mira.<br />Zgjidh çka të hahet sot.</p><a className="original-menu-button" href="/menuja-origjinale.html" target="_blank" rel="noreferrer"><MenuIcon size={16} /> SHIKO MENYNË ORIGJINALE</a></div>
          </div>
          {products.length > 0 ? (
            <>
              <div className="category-tabs" role="tablist" aria-label="Kategoritë e menusë">
                {menuCategories.map((item) => <button key={item} className={category === item ? 'category-tab active' : 'category-tab'} onClick={() => selectCategory(item)} role="tab" aria-selected={category === item}>{item}</button>)}
              </div>
              <div className="preview-banner"><span>FOTOT</span><p>Fotot janë vendosur te artikujt përkatës. Madhësitë dhe çmimet bazohen në menynë e dërguar.</p></div>
              <div className="product-grid">
                {visibleProducts.map((product, index) => {
                  const selectedIndex = selectedVariants[product.id] ?? 0;
                  const selectedVariant = product.variants[selectedIndex];
                  const imageShapeClass = product.category === 'Sanduiçe' ? 'product-card-sandwich' : product.category === 'Pije' ? 'product-card-drink' : product.category === 'Sosat' ? 'product-card-sauce' : '';
                  return <article ref={index === 0 ? firstProductCardRef : null} className={`product-card ${imageShapeClass}`} key={product.id}>
                    <div className="product-image-wrap"><img src={product.image} alt={`Foto e ${product.name}`} loading="lazy" width="960" height="640" /><span className="product-number">{String(index + 1).padStart(2, '0')}</span></div>
                    <div className="product-info"><div><p className="product-category">{product.category}</p><h3>{product.name}</h3></div>{product.variants.length === 1 && <strong className="product-price">{selectedVariant.price == null ? 'Na pyetni' : `${selectedVariant.price.toFixed(2)} €`}</strong>}</div>
                    {product.description && <p className="product-description">{product.description}</p>}
                    {product.variants.length > 1 && <div className="size-picker" aria-label={`Zgjidh madhësinë për ${product.name}`}><span>ZGJIDH MADHËSINË</span><div className="size-options">{product.variants.map((variant, variantIndex) => <button type="button" key={variant.label} className={selectedIndex === variantIndex ? 'size-option active' : 'size-option'} onClick={() => setSelectedVariants((current) => ({ ...current, [product.id]: variantIndex }))} aria-pressed={selectedIndex === variantIndex} title={variant.label}><span>{variant.label.split(' · ')[0]}</span><strong>{variant.price == null ? 'Pyetni' : `${variant.price.toFixed(2)} €`}</strong>{variant.label.includes('Familjare') && <small>Familjare</small>}</button>)}</div></div>}
                    <button className="add-button" onClick={() => addToCart(product, selectedVariant)}>SHTO NË SHPORTË <Plus size={16} /></button>
                  </article>;
                })}
              </div>
            </>
          ) : (
            <div className="menu-empty">
              <span className="empty-kicker">SË SHPEJTI NË MENY</span>
              <h3>Po e përgatisim<br />diçka <em>të shijshme.</em></h3>
              <p>Menuja jonë po vjen. Na ndiq prapë pak më vonë — kemi plot shije për të ndarë.</p>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="empty-link">PYET PËR MENYNË <ArrowRight size={15} /></a>
            </div>
          )}
        </section>

        <section className="delivery-band" id="about">
          <div className="delivery-mark">DUA<span><Sparkles size={70} aria-hidden="true" /></span></div>
          <div className="delivery-copy"><span className="eyebrow eyebrow-light"><span className="eyebrow-line" /> KËNAQËSIA VJEN TE DERA</span><h2>DELIVERY?<br /><span>ËSHTË NGA NE.</span></h2><p>Dërgesë falas, pa kushte e pa hile — në të gjitha zonat e Podujevës.</p></div>
          <div className="delivery-badge"><MapPin size={19} /><span>0 €</span><small>DELIVERY</small></div>
          <div className="delivery-squiggle" aria-hidden="true"><ArrowRight size={72} strokeWidth={1} /></div>
        </section>

        <section className="order-steps section-wrap">
          <div className="section-heading steps-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> PA KOMPLIKIME</div><h2>3 HAPA.<br /><span>PAK KOHË.</span></h2></div><p>Zgjedh produktet, plotëso të dhënat,<br />dhe dërgo porosinë në WhatsApp.</p></div>
          <div className="steps-grid">
            <article className="step-card"><span className="step-num">01</span><div className="step-icon"><MenuIcon size={22} /></div><h3>Zgjedh shijen</h3><p>Shfleto menynë dhe shto të preferuarat në shportë.</p></article>
            <article className="step-card"><span className="step-num">02</span><div className="step-icon"><ShoppingBag size={22} /></div><h3>Plotëso porosinë</h3><p>Na trego si quhesh e ku ta sjellim.</p></article>
            <article className="step-card"><span className="step-num">03</span><div className="step-icon"><MessageCircle size={22} /></div><h3>Dërgo në WhatsApp</h3><p>Konfirmoje porosinë direkt me ekipin tonë.</p></article>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-heading">
            <div><span className="contact-label">KE PYETJE? NA GJEN KËTU</span><h2>NA KONTAKTO</h2></div>
            <a className="contact-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Përshëndetje DUA Pizza, dua të komunikoj me ju.')}`} target="_blank" rel="noreferrer"><MessageCircle size={20} /> Komuniko me ne në WhatsApp <ArrowRight size={16} /></a>
          </div>
          <div className="contact-details-grid">
            <div className="contact-column">
              <div className="contact-phone-card"><span className="contact-detail-kicker">TELEFONI</span><a href="tel:+38348666613" className="contact-phone"><Clock3 size={20} /> +383 48 666 613</a><span className="contact-hint">Telefono ose ruaje numrin tonë.</span></div>
              <div className="hours-card"><h3>ORARI I PUNËS</h3><table className="hours-table"><tbody>{['E hënë', 'E martë', 'E mërkurë', 'E enjte', 'E premte', 'E shtunë', 'E diel'].map((day) => <tr key={day}><th scope="row">{day}</th><td>10:00 – 02:00</td></tr>)}</tbody></table><p>Çdo ditë, nga ora 10:00 e mëngjesit deri në 02:00 pas mesnate.</p></div>
            </div>
            <div className="location-card"><div className="location-heading"><div><span className="contact-detail-kicker">NA GJEN NË PODUJEVË</span><h3>LOKACIONI</h3></div><a href={SHOP_MAP_URL} target="_blank" rel="noreferrer"><MapPin size={15} /> Hape në Google Maps <ArrowRight size={15} /></a></div><iframe title="Lokacioni i DUA Pizza në Google Maps" src="https://maps.google.com/maps?q=42.90326113181257%2C21.19432349660102&t=&z=15&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand"><a href="#home" aria-label="DUA Pizza, kthehu në krye"><Logo className="footer-logo" /></a><p>Shije e mirë. Zemër e mirë.</p></div>
          <div className="footer-column"><h3>MENYJA</h3><nav aria-label="Navigimi në fund të faqes"><a href="#home">Kryefaqja</a><a href="#menu">Menuja</a><a href="#about">Për ne</a><a href="#contact">Na kontakto</a></nav></div>
          <div className="footer-column footer-contact"><h3>NA GJEN KËTU</h3><a href="tel:+38348666613">+383 48 666 613</a><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><MessageCircle size={14} /> Komuniko me ne në WhatsApp</a><a href={SHOP_MAP_URL} target="_blank" rel="noreferrer"><MapPin size={14} /> Lokacioni në Google Maps</a><span><Clock3 size={14} /> Çdo ditë · 10:00–02:00</span></div>
        </div>
        <div className="footer-bottom"><small>© {new Date().getFullYear()} DUA Pizza · Podujevë</small><small>Ndërtuar nga <a href="https://adonithalili.netlify.app/" target="_blank" rel="noreferrer">Adonit Halili</a></small></div>
      </footer>

      {addedProduct && <div className="cart-toast" role="status" aria-live="polite"><span><Check size={15} /></span>{addedProduct} u shtua me sukses në shportë</div>}
      <button className="mobile-cart" onClick={() => setCartOpen(true)} aria-label={`Hap shportën, ${itemCount} artikuj`}><ShoppingBag size={18} /> Shporta <span>{itemCount}</span></button>

      {cartOpen && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
        <aside className="cart-panel" aria-label="Shporta juaj">
          <div className="panel-header"><div><span className="panel-kicker">DUA PIZZA</span><h2>Shporta jote</h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Mbyll shportën"><X /></button></div>
          {cart.length ? <>
            <div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img className="cart-item-image" src={item.image} alt={`Foto e ${item.name}`} /><div className="cart-item-info"><strong>{item.name}{item.variantLabel ? ` · ${item.variantLabel}` : ''}</strong><span>{item.price == null ? 'Çmimi konfirmohet në WhatsApp' : `${(item.price * item.quantity).toFixed(2)} €`}</span></div><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Hiq një ${item.name}`}><Minus size={14} /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Shto një ${item.name}`}><Plus size={14} /></button></div></div>)}</div>
            <div className="cart-total"><span>{hasPriceToConfirm && total > 0 ? 'Nëntotali i çmimeve të publikuara' : 'Nëntotali'}</span><strong>{hasPriceToConfirm && total === 0 ? 'Konfirmohet' : `${total.toFixed(2)} €`}</strong></div>{hasPriceToConfirm && <p className="price-confirm-note">Çmimi i Mexicana-s konfirmohet në WhatsApp.</p>}<div className="free-delivery-note"><Check size={16} /> Dërgesa falas në Podujevë</div>
            {!storeOpen && <div className="store-closed-note"><Clock3 size={16} /> Porositë hapen në 10:00. Orari: 10:00–02:00.</div>}
            <button className="button button-red checkout-button" disabled={!storeOpen} onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>{storeOpen ? <>VAZHDO TE POROSIA <ArrowRight size={17} /></> : 'POROSITË HAPEN NË 10:00'}</button>
          </> : <div className="cart-empty"><div className="cart-empty-icon"><ShoppingBag size={26} /></div><h3>Shporta është bosh</h3><p>Zgjidh picën dhe madhësinë, ose shto një sanduiç a pije nga menuja.</p><button className="button button-dark" onClick={() => { setCartOpen(false); scrollToMenu(); }}>SHIKO MENYNË <ArrowRight size={16} /></button></div>}
        </aside>
      </div>}

      {checkoutOpen && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setCheckoutOpen(false); }}><section className="checkout-modal" aria-label="Të dhënat e porosisë">
        <div className="panel-header"><div><span className="panel-kicker">EDHE NJË HAP</span><h2>{sent ? 'Porosia u hap në WhatsApp' : 'Të dhënat e porosisë'}</h2></div><button className="close-button" onClick={() => { setCheckoutOpen(false); setSent(false); }} aria-label="Mbyll"><X /></button></div>
        {sent ? <div className="sent-state"><div className="sent-check"><Check size={25} /></div><p>WhatsApp u hap me porosinë tënde. Dërgoje mesazhin për ta konfirmuar me ekipin.</p><button className="button button-dark" onClick={() => { setCheckoutOpen(false); setSent(false); setCart([]); }}>U KRYE <Check size={16} /></button></div> : <form onSubmit={sendOrder} className="checkout-form">
          <div className="order-type-switch"><button type="button" className={orderType === 'Dërgesë' ? 'selected' : ''} onClick={() => setOrderType('Dërgesë')}><MapPin size={15} /> Dërgesë</button><button type="button" className={orderType === 'Marrje në lokal' ? 'selected' : ''} onClick={() => setOrderType('Marrje në lokal')}><ShoppingBag size={15} /> Marrje në lokal</button></div>
          <div className="order-data-notice" role="note"><Info size={17} aria-hidden="true" /><p>Ju lutem sigurohuni që emri, numri i telefonit{orderType === 'Dërgesë' ? ' dhe adresa' : ''} të jenë të sakta, që porosia të përpunohet pa vonesa.</p></div>
          <div className="form-cash"><Banknote size={16} aria-hidden="true" /> Pagesa bëhet me para në dorë (cash).</div>
          <label>Emri yt<input required value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="Si të thërrasim?" /></label>
          <label>Numri i telefonit<input required type="tel" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="04X XXX XXX" /></label>
          {orderType === 'Dërgesë' && <><label>Adresa e dërgesës<input required value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} placeholder="Rruga, lagjja, ndonjë pikë orientimi" /></label><div className="form-delivery"><MapPin size={15} /> Dërgesa falas në Podujevë</div></>}
          <label>Shënim <span className="optional">(opsionale)</span><textarea value={customer.note} onChange={(e) => setCustomer({ ...customer, note: e.target.value })} placeholder="Ndonjë kërkesë e veçantë?" rows="3" /></label>
          {!storeOpen && <div className="store-closed-note"><Clock3 size={16} /> Porositë pranohen çdo ditë nga 10:00 deri në 02:00.</div>}
          <button className="button button-red checkout-button" type="submit" disabled={!storeOpen}>{storeOpen ? <>DËRGO NË WHATSAPP <MessageCircle size={17} /></> : 'POROSITË HAPEN NË 10:00'}</button>
        </form>}
      </section></div>}
    </div>
  );
}

export default App;
