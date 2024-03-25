import { Answer, User } from "@prisma/client";
import { sql } from "@vercel/postgres";

export type UserWithAnswers = Omit<User, "date"> & {
  date: string;
  answers: Answer[];
};

export async function getUsersByPseudoWithAnswers(pseudo: string) {
  const result = await sql<UserWithAnswers>`
    SELECT
      u.*,
      TO_CHAR(u.date, 'DD/MM/YYYY') AS date,
      json_agg(a.*) AS answers
    FROM
      "User" u
      LEFT JOIN "Answer" a ON u.id = a."userId"
    WHERE
      u.pseudo ILIKE ${"%" + pseudo + "%"}
      AND u.role = 'user'
    GROUP BY
      u.id,
      u.date
    ORDER BY
      u.date DESC;
  `;

  return result.rows;
}
