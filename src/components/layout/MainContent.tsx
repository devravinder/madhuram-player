
export default function MainContent() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="h-16 bg-white rounded-md shadow-sm flex items-center px-4"
        >
          <span className="font-medium">Song Item #{i + 1}</span>
        </div>
      ))}
    </div>
  );
}
