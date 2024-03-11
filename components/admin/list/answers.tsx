import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";
import Message from "@/components/icons/message";

export function AnswersList({ user }) {
  return (
    <Card className="mx-auto max-w-2xl">
      <Table>
        <TableHead>
          <TableHeaderCell className={"flex items-center gap-2 text-xl"}>
            <Message /> Réponses de {user.pseudo}
          </TableHeaderCell>

          <TableRow>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Valeur</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.answers.map((answer) => (
            <TableRow key={answer.id}>
              <TableCell>
                <Text className={"whitespace-pre-wrap break-words"}>
                  {answer.description}
                </Text>
              </TableCell>
              <TableCell>
                <Text>{answer.value}</Text>
              </TableCell>
              <TableCell>
                <Text>{answer.date}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
