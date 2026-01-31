

import { jsPDF } from "jspdf";
import type{ Course } from "../types/course";

interface Props {
  course: Course;
}

const PdfExport: React.FC<Props> = ({ course }) => {
  const download = () => {
    const pdf = new jsPDF();
    let y = 10;

    pdf.text(course.title, 10, y);
    y += 10;
    pdf.text(`Level: ${course.level}`, 10, y);
    y += 10;

    course.modules.forEach(m => {
      pdf.text(`Module ${m.module}: ${m.title}`, 10, y);
      y += 8;
      m.lessons.forEach(l => {
        pdf.text(`- ${l}`, 12, y);
        y += 6;
      });
      y += 4;
    });

    pdf.save(`${course.title}.pdf`);
  };

  return <button onClick={download}>Download PDF</button>;
};

export default PdfExport;
