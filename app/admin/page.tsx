import Search from "@/components/admin/search";
import UsersTable from "@/components/admin/table/users";
import { Answer, User } from "@prisma/client";
import { Card, Text, Title } from "@tremor/react";
import { sql } from "@vercel/postgres";

export type UserQuery = Omit<User, "date"> & {
  date: string;
  answers: Answer[];
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const search = searchParams.search ?? "";

  const result = await sql<UserQuery>`
      SELECT u.*, TO_CHAR(u.date, 'DD/MM/YYYY') AS date, json_agg(a.*) AS answers
      FROM "User" u
      LEFT JOIN "Answer" a ON u.id = a."userId"
      WHERE u.pseudo ILIKE ${"%" + search + "%"}
      GROUP BY u.id, u.date
      ORDER BY u.date DESC;
`;

  const users = result.rows;

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <Title>Utilisateurs</Title>
      <Text>Faites une recherche dans la liste des pseudos.</Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
