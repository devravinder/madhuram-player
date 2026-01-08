import { Card } from "../Elements";

export default function MainContent() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 40 }).map((_, i) => (
        <Card key={i}>
          <span className="font-medium">Song Item #{i + 1}</span>
        </Card>
      ))}
    </div>
  );
}
