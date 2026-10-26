import { ShoppingBag, Sparkles } from "lucide-react";
import Logo from "./Logo.jsx";

function SiteHeader({ itemCount, onOpenCart }) {
  return (
    <>
      <div className="announcement">
        <Sparkles className="announcement-dot" size={11} aria-hidden="true" />{" "}
        DËRGESA FALAS NË GJITHË PODUJEVËN{" "}
        <span className="announcement-separator" aria-hidden="true"><Sparkles size={12} /></span>{" "}
        SHIJE QË TË MBETET N'MEND
      </div>
      <header className="topbar">
        <a className="logo-link" href="#home" aria-label="DUA Pizza, faqja kryesore"><Logo /></a>
        <nav className="desktop-nav" aria-label="Navigimi kryesor">
          <a href="#home">Kryefaqja</a>
          <a href="#menu">Menuja</a>
          <a href="#about">Për ne</a>
          <a href="#contact">Na kontakto</a>
        </nav>
        <button className="cart-trigger" onClick={onOpenCart} aria-label={`Hap shportën, ${itemCount} artikuj`}>
          <ShoppingBag size={18} strokeWidth={2.2} />
          <span className="cart-label">Shporta</span>
          <span className="cart-count" key={itemCount}>{itemCount}</span>
        </button>
      </header>
    </>
  );
}

export default SiteHeader;
