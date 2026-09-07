type Props = {
  /** the heading itself */
  title: string;
  /** what a promoter is looking at — press-kit vocabulary, not decoration */
  meta: string;
  id?: string;
};

/**
 * A running head rather than an eyebrow: title, a hairline carrying the eye
 * across, and the section's press-kit type on the same baseline.
 *
 * On entry the three parts arrive in order — the title rises out of its own
 * mask, the rule draws left to right, then the label fades up. That sequence
 * is what marks the boundary between sections.
 */
export default function SectionHead({ title, meta, id }: Props) {
  return (
    <div className="sect-head" data-reveal="head">
      <h2 className="display h-sect" id={id}>
        <span className="mask">
          <span className="mask__i">{title}</span>
        </span>
      </h2>
      <span className="sect-head__rule" aria-hidden="true" />
      <span className="data sect-head__meta">{meta}</span>
    </div>
  );
}
