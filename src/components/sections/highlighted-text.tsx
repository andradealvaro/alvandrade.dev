interface HighlightedTextProps {
  text: string;
  phrases: string[];
}

export function HighlightedText({ text, phrases }: HighlightedTextProps) {
  if (phrases.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(${phrases.map(escapeRegExp).join("|")})`, "g");
  const segments = text.split(pattern);

  return (
    <>
      {segments.map((segment, index) =>
        phrases.includes(segment) ? (
          <strong key={index} className="font-semibold text-fg">
            {segment}
          </strong>
        ) : (
          <span key={index}>{segment}</span>
        )
      )}
    </>
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
