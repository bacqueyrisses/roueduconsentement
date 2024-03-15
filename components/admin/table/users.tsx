import { UserQuery } from "@/app/admin/page";
import AnswersDialog from "@/components/admin/dialog/answers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";

export default function UsersTable({ users }: { users: UserQuery[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Pseudo</TableHeaderCell>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Score</TableHeaderCell>
          <TableHeaderCell>Âge</TableHeaderCell>
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
              <AnswersDialog user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
