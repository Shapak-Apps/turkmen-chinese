import { expect, it } from "@jest/globals";
import courseData from "@/assets/data/course_content.json";
import { CourseDataSchema } from "@/constants/courseDataSchema";

it("course_content.json matches the schema", () => {
  // parse() throws with the failing path, so a schema drift is readable in CI
  expect(() => CourseDataSchema.parse(courseData)).not.toThrow();
});
