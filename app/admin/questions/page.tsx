import QuestionsDialog from "@/components/admin/dialog/questions";
import Search from "@/components/admin/search";
import QuestionsTable from "@/components/admin/table/questions";
import { Question } from "@prisma/client";
import { Card, Text, Title } from "@tremor/react";
import { sql } from "@vercel/postgres";

export type QuestionQuery = Omit<Question, "date">;
export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const search = searchParams.search ?? "";

  const result = await sql<QuestionQuery>`
      SELECT id, description, "valueOne", "valueTwo", "valueThree", active
      FROM "Question"
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
