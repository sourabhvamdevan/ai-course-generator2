

import { useEffect, useState } from "react";

interface HistoryItem {
  id: number;
  title: string;
  level: string;
}

const History = () => {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/history")
      .then(res => res.json())
      .then(setItems);
  }, []);

  return (
    <div className="card">
      <h2>Generated Courses</h2>
      <ul>
        {items.map(i => (
          <li key={i.id}>{i.title} ({i.level})</li>
        ))}
      </ul>
    </div>
  );
};

export default History;
