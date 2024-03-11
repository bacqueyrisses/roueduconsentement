import { Text, Title } from "@tremor/react";
import Search from "@/components/admin/search";
import QuestionsDialog from "@/components/admin/dialog/questions";

export default function QuestionsLoading() {
  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <Title>Questions</Title>
      <Text>Faites une recherche dans la liste des questions.</Text>
      <div className={"flex items-center gap-4"}>
        <Search disabled />
        <QuestionsDialog disabled />
      </div>
      <div className="tremor-base tr-relative tr-w-full tr-mx-auto tr-text-left tr-ring-1 tr-mt-6 tr-max-w-none tr-bg-white tr-shadow tr-border-blue-400 tr-ring-gray-200 tr-pl-6 tr-pr-6 tr-pt-6 tr-pb-6 tr-rounded-lg h-[360px]" />
    </main>
  );
}
