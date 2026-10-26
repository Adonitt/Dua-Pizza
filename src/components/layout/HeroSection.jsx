import { ArrowDown, ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";

function HeroSection({ heroSlides, heroSlide, setHeroSlide, heroTouchStartX, handleHeroSwipeEnd, scrollToMenu, whatsappNumber }) {
  return (
        <section className="hero" id="home">
          <div className="hero-copy">
            <div
              className="hero-copy-photo"
              aria-hidden="true"
              style={{
                backgroundImage: `linear-gradient(rgba(229,37,42,.58),rgba(229,37,42,.58)),url('${heroSlides[heroSlide].image}')`,
              }}
            />
            <div className="eyebrow">
              <span className="eyebrow-line" /> E BËJMË ME DASHNI, E SJELLIM ME
              KËNAQËSI
            </div>
            <h1>
              PICA QË
              <br />
              <span>THËRRASIN</span>
              <br />
              PËR NJË COPË.
            </h1>
            <p className="hero-description">
              Zgjedh çka të hahet, porosite lehtë në WhatsApp, dhe ne ta
              sjellim. Dërgesa është falas në Podujevë.
            </p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={scrollToMenu}>
                SHIKO MENYNË <ArrowRight size={17} />
              </button>
              <a
                className="hero-whatsapp"
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={19} /> Na shkruaj në WhatsApp
              </a>
            </div>
            <div className="hero-note">
              <span className="note-check">
                <Check size={13} />
              </span>{" "}
              Dërgesë falas në Podujevë <span className="note-divider">·</span>{" "}
              Dërgesë ose marrje
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="Fotografi të produkteve DUA Pizza. Rrëshqit majtas ose djathtas për të ndërruar foton."
            onTouchStart={(event) => {
              heroTouchStartX.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={handleHeroSwipeEnd}
            onTouchCancel={() => {
              heroTouchStartX.current = null;
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight")
                setHeroSlide((current) => (current + 1) % heroSlides.length);
              if (event.key === "ArrowLeft")
                setHeroSlide(
                  (current) =>
                    (current - 1 + heroSlides.length) % heroSlides.length,
                );
            }}
          >
            <div
              className={`hero-photo${heroSlides[heroSlide].drinks ? " hero-photo-drinks" : ""}`}
            >
              {heroSlides[heroSlide].drinks ? (
                <div
                  className="hero-drink-lineup"
                  aria-label="Coca-Cola, Fanta dhe Golden Eagle"
                >
                  {heroSlides[heroSlide].drinks.map((drink) => (
                    <img
                      key={drink.label}
                      src={drink.image}
                      alt={drink.label}
                    />
                  ))}
                </div>
              ) : (
                <img
                  key={heroSlides[heroSlide].image}
                  src={heroSlides[heroSlide].image}
                  alt={heroSlides[heroSlide].label}
                />
              )}
            </div>
            <div className="hero-sticker">
              <span>
                ME
                <br />
                DASHNI
              </span>
              <Sparkles className="sticker-star" size={15} aria-hidden="true" />
            </div>
            <div className="photo-caption">
              <span>{String(heroSlide + 1).padStart(2, "0")} /</span>{" "}
              {heroSlides[heroSlide].caption}
            </div>
            <div className="hero-slide-dots" aria-label="Fotot e prezantuara">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  className={index === heroSlide ? "active" : ""}
                  aria-label={`Shfaq: ${slide.label}`}
                  aria-pressed={index === heroSlide}
                  onClick={() => setHeroSlide(index)}
                />
              ))}
            </div>
            <div className="photo-frame" />
          </div>
          <a className="scroll-cue" href="#menu" aria-label="Zbrit te menuja">
            <ArrowDown size={18} />
          </a>
        </section>
  );
}

export default HeroSection;
