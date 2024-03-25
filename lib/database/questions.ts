import { Question } from "@prisma/client";
import { sql } from "@vercel/postgres";

export type QuestionByDescription = Omit<Question, "date">;

export async function searchQuestionsByDescription(search: string) {
  const result = await sql<QuestionByDescription>`
      SELECT id, description, "valueOne", "valueTwo", "valueThree", active
      FROM "Question"
      WHERE description ILIKE ${"%" + search + "%"}
      ORDER BY date DESC
  `;

  return result.rows;
}

export type QuestionWithoutActiveAndDate = Omit<Question, "active" | "date">;
export async function getQuestionsWithoutActiveAndDate() {
  const result = await sql<QuestionWithoutActiveAndDate>`
      SELECT id, description, "valueOne", "valueTwo", "valueThree"
      FROM "Question"
      WHERE active = true
      ORDER BY date DESC
  `;

  return result.rows;
}
