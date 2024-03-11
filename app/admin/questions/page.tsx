import { sql } from "@vercel/postgres";
import { Card, Text, Title } from "@tremor/react";
import Search from "@/components/admin/search";
import QuestionsTable from "@/components/admin/table/questions";
import QuestionsDialog from "@/components/admin/dialog/questions";

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const search = searchParams.search ?? "";

  const result = await sql`
      SELECT id, description, value, active
      FROM questions
      WHERE description ILIKE ${"%" + search + "%"}
      ORDER BY date DESC
  `;

  const questions = result.rows;

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <Title>Questions</Title>
      <Text>Faites une recherche dans la liste des questions.</Text>
      <div className={"flex items-center gap-4"}>
        <Search />
        <QuestionsDialog />
      </div>
      <Card className="mt-6">
        <QuestionsTable questions={questions} />
      </Card>
    </main>
  );
}
