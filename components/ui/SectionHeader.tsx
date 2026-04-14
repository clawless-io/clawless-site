interface SectionHeaderProps {
  label: string;
  title: string;
}

export default function SectionHeader({ label, title }: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
        {label}
      </p>
      <h2 className="text-[28px] font-bold tracking-[-0.02em] text-text-primary">
        {title}
      </h2>
    </div>
  );
}
