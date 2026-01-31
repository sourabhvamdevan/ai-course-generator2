

import { useState, FormEvent } from "react";
import type{ Course } from "../types/course";

interface Props {
  onGenerate: (course: Course) => void;
}

const CourseForm: React.FC<Props> = ({ onGenerate }) => {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [duration, setDuration] = useState("4 weeks");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

   const res = await fetch(
  `${import.meta.env.VITE_API_URL}/generate`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic,
      level,
      duration
    })
  }
);


    const data: Course = await res.json();
    onGenerate(data);
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="card">
      <h2>AI Course Generator</h2>

      <input placeholder="Topic" value={topic} onChange={e => setTopic(e.target.value)} />
      <select value={level} onChange={e => setLevel(e.target.value)}>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>
      <input value={duration} onChange={e => setDuration(e.target.value)} />

      <button disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
};

export default CourseForm;
