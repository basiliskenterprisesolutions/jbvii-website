type Props = {
  /** the heading itself */
  title: string;
  /** what a promoter is looking at — press-kit vocabulary, not decoration */
  meta: string;
  id?: string;
};

/**
 * A running head rather than an eyebrow: title, a hairline carrying the eye
 * across, and the section's press-kit type sitting on the same baseline.
 */
export default function SectionHead({ title, meta, id }: Props) {
  return (
    <div className="sect-head">
      <h2 className="display h-sect" id={id}>{title}</h2>
      <span className="sect-head__rule" aria-hidden="true" />
      <span className="data sect-head__meta">{meta}</span>
    </div>
  );
}
