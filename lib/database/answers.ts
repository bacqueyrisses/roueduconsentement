import { Answer } from "@prisma/client";
import { sql } from "@vercel/postgres";
import { User } from "next-auth";

export async function getAnswers(userId: User["id"]) {
  const result = await sql<Answer>`
    SELECT
      *
    FROM
      "Answer"
    WHERE
      "userId" = ${userId}
  `;

  return result.rows;
}
