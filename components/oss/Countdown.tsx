/**
 * Launch countdown: PLACEHOLDER ONLY, with no date.
 *
 * The founder's rule ("opening ceremony"): the 10-day countdown starts only
 * once everything is finished, built and rehearsed, so the date cannot slip.
 * Until he sets that date in a direct instruction, this renders dashes and
 * must never compute a target from any date. Wiring a real target is a
 * launch-state change and needs the founder's direct word.
 */
const UNITS = ['Days', 'Hours', 'Minutes', 'Seconds'] as const;

export default function Countdown() {
  return (
    <div className="oss-card inline-flex flex-col gap-4 p-5" aria-label="Launch countdown, no date set">
      <div className="flex items-center justify-between gap-6">
        <span className="oss-eyebrow">Opening ceremony</span>
        <span className="oss-unverified">Placeholder, no date set</span>
      </div>
      <div className="flex items-end gap-3 sm:gap-5">
        {UNITS.map((u, i) => (
          <div key={u} className="flex items-end gap-3 sm:gap-5">
            <div className="text-center">
              <div className="oss-display tabular-nums text-4xl font-semibold text-[var(--oss-ink)] sm:text-5xl">--</div>
              <div className="oss-small mt-1 !text-[0.7rem] uppercase tracking-[0.14em]">{u}</div>
            </div>
            {i < UNITS.length - 1 && <div className="oss-display pb-6 text-3xl text-[var(--oss-line-strong)]">:</div>}
          </div>
        ))}
      </div>
      <p className="oss-small max-w-sm">
        Starts when everything is finished, built, and rehearsed. On launch day the source and the signed download are
        published together.
      </p>
    </div>
  );
}
