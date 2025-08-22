interface EmptyStateProps {
  iconPath: string;
  message: string;
}

export default function EmptyState({ iconPath, message }: EmptyStateProps) {
  return (
    <div className="default-section">
      <div className={`bg-[url('${iconPath}')] default-bg`}></div>
      <h4 className="default-text">
        {message.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            {i === 0 && <br />}
          </span>
        ))}
      </h4>
    </div>
  );
}
