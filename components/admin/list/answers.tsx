import Message from "@/components/icons/message";
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

export function AnswersList({ user }) {
  return (
    <Card className="mx-auto max-w-2xl">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell className={"flex items-center gap-2 text-xl"}>
              <Message /> Réponses de {user.pseudo}
            </TableHeaderCell>
          </TableRow>
          <TableRow>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Réponse</TableHeaderCell>
            <TableHeaderCell>Valeur</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!user.answers.at(0) ? (
            <TableRow>
              <TableCell>
                <Text className={"whitespace-pre-wrap break-words"}>
                  L'utilisateur n'a pas encore répondu.
                </Text>
              </TableCell>
            </TableRow>
          ) : (
            user.answers.map((answer) => (
              <TableRow key={answer?.id}>
                <TableCell>
                  <Text className={"whitespace-pre-wrap break-words"}>
                    {answer?.description}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text>{answer?.option}</Text>
                </TableCell>
                <TableCell>
                  <Text>{answer?.value}</Text>
                </TableCell>
                <TableCell>
                  <Text>{answer?.date}</Text>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
