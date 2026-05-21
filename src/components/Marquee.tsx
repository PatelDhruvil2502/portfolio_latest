type Props = { items: string[] };

const Marquee = ({ items }: Props) => {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
