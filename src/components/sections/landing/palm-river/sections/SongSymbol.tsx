/* SVG symbol #song — đường sóng trang trí, dùng chung qua <svg className="song"><use href="#song"/></svg> */
export function SongSymbol() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="song" viewBox="0 0 120 22">
        <path
          d="M2 6c18-6 30 6 58 0s40-6 58 0M2 16c18-6 30 6 58 0s40-6 58 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </symbol>
    </svg>
  );
}
