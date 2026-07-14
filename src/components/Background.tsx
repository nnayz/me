/**
 * The stage. A near-black (or near-white) surface with a faint grid that
 * fades toward the edges — it suggests space without decorating it.
 */
export default function Background() {
  return (
    <div className="fixed inset-0 z-0 bg-stone-50 dark:bg-neutral-950">
      <div aria-hidden className="stage-grid" />
    </div>
  );
}
