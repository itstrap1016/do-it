interface EmptyStateProps {
  iconPath: string;
  message: string;
}

export default function EmptyState({ iconPath, message }: EmptyStateProps) {
  return (
    <div className="default-section">
      <div
        className={`default-bg`}
        style={{ backgroundImage: `url('${iconPath}')` }}
      ></div>
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
