



import { useEffect, useState } from "react";

interface HistoryItem {
  id: number;
  title: string;
  level: string;
}

const History = () => {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/history`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch history");
        }
        return res.json();
      })
      .then(setItems)
      .catch(err => console.error("History load failed:", err));
  }, []);

  return (
    <div className="card">
      <h2>Generated Courses</h2>
      <ul>
        {items.map(i => (
          <li key={i.id}>
            {i.title} ({i.level})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;

