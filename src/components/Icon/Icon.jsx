export const Icon = ({ id, width = 40, height = 40, className = "" }) => (
  <svg width={width} height={height} className={className}>
    <use xlinkHref={`#${id}`} />
  </svg>
);
