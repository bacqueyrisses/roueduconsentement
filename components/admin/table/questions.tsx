import { QuestionQuery } from "@/app/admin/questions/page";
import QuestionSwitch from "@/components/admin/table/question-switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";

export default function QuestionsTable({
  questions,
}: {
  questions: QuestionQuery[];
}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Question</TableHeaderCell>
          <TableHeaderCell>Valeur Oui</TableHeaderCell>
          <TableHeaderCell>Valeur Non</TableHeaderCell>
          <TableHeaderCell>Valeur Je ne sais pas</TableHeaderCell>
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
              <Text>{question.valueOne}</Text>
            </TableCell>
            <TableCell>
              <Text>{question.valueTwo}</Text>
            </TableCell>
            <TableCell>
              <Text>{question.valueThree}</Text>
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
