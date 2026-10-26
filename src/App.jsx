import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import MenuSection from "./components/menu/MenuSection.jsx";
import SiteHeader from "./components/layout/SiteHeader.jsx";
import SiteFooter from "./components/layout/SiteFooter.jsx";
import HeroSection from "./components/layout/HeroSection.jsx";
import QuickFacts from "./components/sections/QuickFacts.jsx";
import DeliverySection from "./components/sections/DeliverySection.jsx";
import OrderSteps from "./components/sections/OrderSteps.jsx";
import ContactSection from "./components/sections/ContactSection.jsx";
import OriginalMenuModal from "./components/dialogs/OriginalMenuModal.jsx";
import InstallHelpModal from "./components/dialogs/InstallHelpModal.jsx";
import CartDrawer from "./components/cart/CartDrawer.jsx";
import CheckoutModal from "./components/cart/CheckoutModal.jsx";

const WHATSAPP_NUMBER = "38348666613";
const SHOP_TIME_ZONE = "Europe/Belgrade";
const SHOP_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=42.90326113181257%2C21.19432349660102";

function isOrderingOpen() {
  const timeParts = new Intl.DateTimeFormat("en-GB", {
    timeZone: SHOP_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const hour = Number(
    timeParts.find((part) => part.type === "hour")?.value ?? 0,
  );
  const minute = Number(
    timeParts.find((part) => part.type === "minute")?.value ?? 0,
  );
  const currentMinutes = hour * 60 + minute;
  return currentMinutes >= 10 * 60 || currentMinutes < 2 * 60;
}
const heroSlides = [
  {
    image: "/images/pizza-hero.webp",
    label: "Pica e sapopjekur",
    caption: "E SAPOPJEKUR, GATI PËR TY",
  },
  {
    image: "/images/sandwich-hero.png",
    label: "Sanduiç i freskët",
    caption: "SANDUIÇ I NGROHTË, GATI PËR TY",
  },
  {
    image: "/images/pije/coca-cola.webp",
    label: "Pijet e preferuara",
    caption: "PIJET E PREFERUARA, TË FTOHTA",
    drinks: [
      { image: "/images/pije/fanta-orange.webp", label: "Fanta" },
      { image: "/images/pije/coca-cola.webp", label: "Coca-Cola" },
      { image: "/images/pije/golden%20eagle.webp", label: "Golden Eagle" },
    ],
  },
];
function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartClosing, setCartClosing] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installGuideOpen, setInstallGuideOpen] = useState(false);
  const [appInstalled, setAppInstalled] = useState(
    () => window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true,
  );
  const [storeOpen, setStoreOpen] = useState(isOrderingOpen);
  const [originalMenuOpen, setOriginalMenuOpen] = useState(false);
  const [category, setCategory] = useState("Pica");
  const [selectedVariants, setSelectedVariants] = useState({});
  const [orderType, setOrderType] = useState("Dërgesë");
  const [sent, setSent] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [addedProduct, setAddedProduct] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const toastTimer = useRef(null);
  const cartCloseTimer = useRef(null);
  const heroTouchStartX = useRef(null);
  const firstProductCardRef = useRef(null);
  const scrollToProductsRef = useRef(false);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = useMemo(
    () =>
      cart.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0),
    [cart],
  );
  const hasPriceToConfirm = cart.some((item) => item.price == null);
  const isAppleMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(navigator.userAgent);

  const openCart = () => {
    window.clearTimeout(cartCloseTimer.current);
    setCartClosing(false);
    setCartOpen(true);
  };

  const closeCart = (afterClose) => {
    window.clearTimeout(cartCloseTimer.current);
    setCartClosing(true);
    const closeDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220;
    cartCloseTimer.current = window.setTimeout(() => {
      setCartOpen(false);
      setCartClosing(false);
      cartCloseTimer.current = null;
      afterClose?.();
    }, closeDuration);
  };

  const handleInstallApp = async () => {
    if (!installPrompt) {
      setInstallGuideOpen(true);
      return;
    }

    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice?.outcome === "accepted") setAppInstalled(true);
    } catch {
      setInstallGuideOpen(true);
    } finally {
      setInstallPrompt(null);
    }
  };

  useEffect(() => {
    const hoursTimer = window.setInterval(
      () => setStoreOpen(isOrderingOpen()),
      15000,
    );
    return () => window.clearInterval(hoursTimer);
  }, []);

  useEffect(() => {
    const handleInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const handleAppInstalled = () => {
      setAppInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    if (!installGuideOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setInstallGuideOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [installGuideOpen]);

  useEffect(
    () => () => {
      window.clearTimeout(toastTimer.current);
      window.clearTimeout(cartCloseTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (!cartOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [cartOpen]);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-reveal]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
    );

    targets.forEach((target) => {
      if (!target.classList.contains("is-visible")) observer.observe(target);
    });

    return () => observer.disconnect();
  }, [category]);

  useEffect(() => {
    if (!originalMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOriginalMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [originalMenuOpen]);

  useEffect(() => {
    if (!scrollToProductsRef.current) return;
    scrollToProductsRef.current = false;
    firstProductCardRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [category]);

  const addToCart = (product, variant) => {
    const itemId = `${product.id}-${variant.label}`;
    setCart((current) => {
      const found = current.find((item) => item.id === itemId);
      return found
        ? current.map((item) =>
            item.id === itemId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [
            ...current,
            {
              id: itemId,
              name: product.name,
              image: product.image,
              variantLabel: variant.label === "Standard" ? "" : variant.label,
              price: variant.price,
              quantity: 1,
            },
          ];
    });
    setAddedProduct(product.name);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setAddedProduct(""), 2400);
  };

  const changeQuantity = (id, delta) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const sendOrder = (event) => {
    event.preventDefault();
    if (!isOrderingOpen()) {
      setStoreOpen(false);
      return;
    }
    const lines = cart.map(
      (item) =>
        `• ${item.quantity} × ${item.name}${item.variantLabel ? ` (${item.variantLabel})` : ""} — ${item.price == null ? "çmimi konfirmohet" : `${(item.price * item.quantity).toFixed(2)} €`}`,
    );
    const message = [
      "🍕 *POROSI E RE — DUA PIZZA*",
      "",
      "Përshëndetje! Dua të porosis:",
      "",
      "🧾 *Artikujt:*",
      ...lines,
      "",
      hasPriceToConfirm
        ? `💶 Nëntotali i artikujve me çmim: ${total.toFixed(2)} €`
        : `💶 *Totali: ${total.toFixed(2)} €*`,
      "",
      orderType === "Dërgesë"
        ? "🚚 *Dërgesë* — falas në Podujevë"
        : "🏪 *Marrje në lokal*",
      "💵 *Pagesa:* Me para në dorë (cash)",
      "",
      "👤 *Të dhënat e klientit:*",
      `Emri: ${customer.name}`,
      `Telefoni: ${customer.phone}`,
      ...(orderType === "Dërgesë" ? [`📍 Adresa: ${customer.address}`] : []),
      ...(customer.note ? [`📝 Shënim: ${customer.note}`] : []),
      "",
      "Ju lutem ma konfirmoni porosinë. Faleminderit!",
    ].join("\n");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  };

  const scrollToMenu = () =>
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  const selectCategory = (nextCategory) => {
    if (nextCategory === category) {
      firstProductCardRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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
    setHeroSlide(
      (current) =>
        (current + (endX < startX ? 1 : -1) + heroSlides.length) %
        heroSlides.length,
    );
  };

  return (
    <div className="site-shell">
      <SiteHeader itemCount={itemCount} onOpenCart={openCart} />


      <main>
        <HeroSection
          heroSlides={heroSlides}
          heroSlide={heroSlide}
          setHeroSlide={setHeroSlide}
          heroTouchStartX={heroTouchStartX}
          handleHeroSwipeEnd={handleHeroSwipeEnd}
          scrollToMenu={scrollToMenu}
          whatsappNumber={WHATSAPP_NUMBER}
        />

        <QuickFacts />

        <MenuSection
          category={category}
          onSelectCategory={selectCategory}
          selectedVariants={selectedVariants}
          onSelectVariant={(productId, variantIndex) =>
            setSelectedVariants((current) => ({ ...current, [productId]: variantIndex }))
          }
          onAddToCart={addToCart}
          firstProductCardRef={firstProductCardRef}
          onOpenOriginalMenu={() => setOriginalMenuOpen(true)}
          whatsappNumber={WHATSAPP_NUMBER}
        />

        <DeliverySection />

        <OrderSteps />

        <ContactSection whatsappNumber={WHATSAPP_NUMBER} mapUrl={SHOP_MAP_URL} />
      </main>

      <SiteFooter
        appInstalled={appInstalled}
        onInstallApp={handleInstallApp}
        whatsappNumber={WHATSAPP_NUMBER}
        mapUrl={SHOP_MAP_URL}
      />

      <OriginalMenuModal isOpen={originalMenuOpen} onClose={() => setOriginalMenuOpen(false)} />

      <InstallHelpModal isOpen={installGuideOpen} onClose={() => setInstallGuideOpen(false)} isAppleMobile={isAppleMobile} isAndroid={isAndroid} />

      {addedProduct && (
        <div className="cart-toast" key={addedProduct} role="status" aria-live="polite">
          <span>
            <Check size={15} />
          </span>
          {addedProduct} u shtua me sukses në shportë
        </div>
      )}
      <button
        className="mobile-cart"
        onClick={openCart}
        aria-label={`Hap shportën, ${itemCount} artikuj`}
      >
        <ShoppingBag size={18} /> Shporta <span>{itemCount}</span>
      </button>

      <CartDrawer isOpen={cartOpen} isClosing={cartClosing} cart={cart} itemCount={itemCount} total={total} hasPriceToConfirm={hasPriceToConfirm} storeOpen={storeOpen} onClose={closeCart} onChangeQuantity={changeQuantity} onContinueCheckout={() => setCheckoutOpen(true)} onScrollToMenu={scrollToMenu} />

      <CheckoutModal isOpen={checkoutOpen} sent={sent} setSent={setSent} customer={customer} setCustomer={setCustomer} orderType={orderType} setOrderType={setOrderType} storeOpen={storeOpen} onClose={() => setCheckoutOpen(false)} onSendOrder={sendOrder} onClearCart={() => setCart([])} />
    </div>
  );
}

export default App;
