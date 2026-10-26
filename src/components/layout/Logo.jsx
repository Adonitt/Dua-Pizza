function Logo({ className = "" }) {
  return (
    <img
      className={`brand-logo ${className}`}
      src="/dua-pizza-logo-red-yellow.png"
      alt="DUA Pizza — delivery falas"
    />
  );
}

export default Logo;
