import QuestionsDialog from "@/components/admin/dialogs/questions";
import Search from "@/components/admin/search";
import QuestionsTable from "@/components/admin/tables/questions";
import { getQuestionsByDescription } from "@/lib/database/questions";
import { Card, Text, Title } from "@tremor/react";

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const search = searchParams.search ?? "";

  const questions = await getQuestionsByDescription(search);

  return (
    <main className={"mx-auto max-w-7xl p-4 md:p-10"}>
      <Title>Questions</Title>
      <Text>Faites une recherche dans la liste des questions.</Text>
      <div className={"flex items-center gap-4"}>
        <Search />
        <QuestionsDialog />
      </div>
      <Card className={"mt-6"}>
        <QuestionsTable questions={questions} />
      </Card>
    </main>
  );
}
