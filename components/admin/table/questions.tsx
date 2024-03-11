import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";
import QuestionSwitch from "@/components/admin/table/question-switch";

export default function QuestionsTable({ questions }: any) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Question</TableHeaderCell>
          <TableHeaderCell>Valeur</TableHeaderCell>
          <TableHeaderCell>Active</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {questions.map((question) => (
          <TableRow key={question.id}>
            <TableCell>
              <Text className={"whitespace-pre-wrap break-words"}>
                {question.description}
              </Text>
            </TableCell>
            <TableCell>
              <Text>{question.value}</Text>
            </TableCell>
            <TableCell>
              <QuestionSwitch id={question.id} active={question.active} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
