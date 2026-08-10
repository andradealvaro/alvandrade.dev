interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-fg">
        {title}
      </h2>
    </div>
  );
}
