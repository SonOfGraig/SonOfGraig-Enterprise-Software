// Ported from the 2026 agency site (TextEffects.tsx → DecryptedText): each word
// resolves out of a blur. Pure CSS (.reveal-word in globals.css), so it runs
// before hydration and needs no client JS; words stay real text nodes for
// screen readers and crawlers. Reduced motion is handled in the stylesheet.
export function WordReveal({
  text,
  delay = 0,
  stagger = 0.07,
  className = '',
  wordClassName = '',
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  // Applied to each word. Use this (not a wrapper) for background-clip text
  // effects: the per-word transform/filter layers hide a parent's clipped fill.
  wordClassName?: string;
}) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`reveal-word ${wordClassName}`}
          style={{ animationDelay: `${delay + i * stagger}s` }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}
