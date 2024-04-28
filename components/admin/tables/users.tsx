import AnswersDialog from "@/components/admin/dialogs/answers";
import QuestionSurveyDialog from "@/components/admin/dialogs/question-survey";
import { UserWithAnswers } from "@/lib/database/users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";

export default function UsersTable({ users }: { users: UserWithAnswers[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Pseudo</TableHeaderCell>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Score</TableHeaderCell>
          <TableHeaderCell>Âge</TableHeaderCell>
          <TableHeaderCell>Genre</TableHeaderCell>
          <TableHeaderCell>Question ouverte</TableHeaderCell>
          <TableHeaderCell>Réponses</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Text>{user.pseudo}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.date}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.score?.toString() ?? "Pas de score."}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.age ?? "Non renseigné."}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.gender ?? "Non renseigné."}</Text>
            </TableCell>
            <TableCell>
              <QuestionSurveyDialog question={user.question} />
            </TableCell>
            <TableCell>
              <AnswersDialog user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
