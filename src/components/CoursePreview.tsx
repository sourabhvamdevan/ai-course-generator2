import type { Course } from "../types/course";
import PdfExport from "./PdfExport"

interface Props {
  course: Course | null;
}

const CoursePreview: React.FC<Props> = ({ course }) => {
  if (!course) return <div className="card">No course yet</div>;

  return (
    <div className="card">
      <h2>
        {course.title} ({course.level})
      </h2>

      {course.modules.map((m) => (
        <div key={m.module}>
          <h3>
            Module {m.module}: {m.title}
          </h3>
          <ul>
            {m.lessons.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* PDF Export button goes here */}
      <div style={{ marginTop: "16px" }}>
        <PdfExport course={course} />
      </div>
    </div>
  );
};

export default CoursePreview;

