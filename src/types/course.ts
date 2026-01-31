

export interface CourseModule {
  module: number;
  title: string;
  lessons: string[];
}

export interface Course {
  title: string;
  level: string;
  modules: CourseModule[];
}
