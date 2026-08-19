import { expect, it } from "@jest/globals";
import courseData from "@/assets/data/course_content.json";
import { CourseDataSchema } from "@/constants/courseDataSchema";

it("course_content.json matches the schema", () => {
  expect(CourseDataSchema.safeParse(courseData).success).toBe(true);
});