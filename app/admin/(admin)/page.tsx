import Search from "@/components/admin/search";
import UsersTable from "@/components/admin/table/users";
import { searchUsersByPseudoWithAnswers } from "@/lib/database/users";
import { Card, Text, Title } from "@tremor/react";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const search = searchParams.search ?? "";

  const users = await searchUsersByPseudoWithAnswers(search);

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
