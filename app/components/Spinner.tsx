import "../app.css";

export default function Spinner({ size = "small", color = "black" }) {
  const sizeClass = `spinner--${size}`;
  const colorClass = `spinner--${color}`;

  return (
    <div className={`spinner ${sizeClass} ${colorClass}`} aria-label="Loading">
      <div className="spinner__circle"></div>
    </div>
  );
}
