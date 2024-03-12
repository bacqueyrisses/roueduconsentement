import OptionsDialog from "@/components/admin/dialog/options";
import Search from "@/components/admin/search";
import OptionsTable from "@/components/admin/table/options";
import { Card, Text, Title } from "@tremor/react";
import { sql } from "@vercel/postgres";

export default async function OptionsPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const search = searchParams.search ?? "";

  const result = await sql`
      SELECT id, description, active
      FROM options
      WHERE description ILIKE ${"%" + search + "%"}
      ORDER BY date DESC
  `;

  const options = result.rows;

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <Title>Questions</Title>
      <Text>Faites une recherche dans la liste des questions.</Text>
      <div className={"flex items-center gap-4"}>
        <Search />
        <OptionsDialog />
      </div>
      <Card className="mt-6">
        <OptionsTable options={options} />
      </Card>
    </main>
  );
}
