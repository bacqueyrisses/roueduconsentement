import OptionSwitch from "@/components/admin/table/option-switch";
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
              <Text>{option.description}</Text>
            </TableCell>
            <TableCell>
              <OptionSwitch id={option.id} active={option.active} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
