import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";

export default function OptionsTable({ options }: any) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Option</TableHeaderCell>
          <TableHeaderCell>Active</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {options.map((option) => (
          <TableRow key={option.id}>
            <TableCell>
              <Text>{option.option}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
