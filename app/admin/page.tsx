import { sql } from "@vercel/postgres";
import { Card, Text, Title } from "@tremor/react";
import Search from "@/components/admin/search";
import UsersTable from "@/components/admin/table/users";
import { User } from "next-auth";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const search = searchParams.search ?? "";

  const result = await sql`
      SELECT id, pseudo, score, TO_CHAR(date, 'DD/MM/YYYY') AS date
      FROM users
      WHERE pseudo ILIKE ${"%" + search + "%"}
  `;

  const users = result.rows as User[];

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
