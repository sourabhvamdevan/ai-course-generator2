import { useState } from "react";
import CourseForm from "./components/CourseForm";
import CoursePreview from "./components/CoursePreview";
import History from "./components/History";
import type{ Course } from "./types/course";

const App = () => {
  const [course, setCourse] = useState<Course | null>(null);

  return (
    <div className="container">
      <CourseForm onGenerate={setCourse} />
      <CoursePreview course={course} />
      <History />
    </div>
  );
};

export default App;
