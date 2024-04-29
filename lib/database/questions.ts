import { Question } from "@prisma/client";
import { sql } from "@vercel/postgres";

export type QuestionByDescription = Omit<Question, "date">;
export async function getQuestionsByDescription(description: string) {
  const result = await sql<QuestionByDescription>`
    SELECT
      id,
      description,
      "valueOne",
      "valueTwo",
      "valueThree",
      active
    FROM
      "Question"
    WHERE
      description ILIKE ${"%" + description + "%"}
    ORDER BY
      date DESC
  `;

  return result.rows;
}

export type QuestionWithoutActive = Omit<Question, "active">;
export async function getQuestionsWithoutActive() {
  const result = await sql<QuestionWithoutActive>`
    SELECT
      id,
      description,
      "valueOne",
      "valueTwo",
      "valueThree",
      "summary",
      "date"
    FROM
      "Question"
    WHERE
      active = TRUE
    ORDER BY
      id ASC
  `;

  return result.rows;
}
