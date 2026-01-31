


import { useState } from "react";
import type { Course } from "../types/course";

interface Props {
  onGenerate: (course: Course) => void;
}

const CourseForm: React.FC<Props> = ({ onGenerate }) => {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [duration, setDuration] = useState("4 weeks");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
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

      // 🔴 Backend error (500 / 400 etc.)
      if (!res.ok) {
        const errText = await res.text();
        console.error("Backend error:", errText);
        throw new Error("Backend returned error");
      }

      // 🔍 Read raw response first (safe)
      const raw = await res.text();
      console.log("RAW BACKEND RESPONSE:", raw);

      const data = JSON.parse(raw);

      // 🛑 Validate required structure
      if (
        !data ||
        !data.title ||
        !data.level ||
        !Array.isArray(data.modules)
      ) {
        throw new Error("Invalid course format from backend");
      }

      // ✅ Finally update state
      onGenerate(data as Course);

    } catch (err) {
      console.error("Generation failed:", err);
      alert("Failed to generate course. Check backend response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>AI Course Generator</h2>

      <input
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        required
      />

      <select value={level} onChange={(e) => setLevel(e.target.value)}>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <input
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <button disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
};

export default CourseForm;


