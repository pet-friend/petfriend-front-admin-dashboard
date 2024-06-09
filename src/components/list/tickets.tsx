import {
  List,
  Datagrid,
  TextField,
  TextInput,
  ReferenceField,
  AutocompleteInput,
  DateField,
} from "react-admin";
import { TICKET_STATUS_CHOICES } from "../../constants";

const filters = [
  <TextInput source="title" key="title" />,
  <TextInput source="description" key="description" />,
  <AutocompleteInput
    source="status"
    key="status"
    choices={TICKET_STATUS_CHOICES}
  />,
  <TextInput source="status_notes" key="status_notes" />,
];

function TicketsList() {
  return (
    <List filters={filters}>
      <Datagrid rowClick="show">
        <ReferenceField source="user_id" reference="users" label="User" />
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="description" />
        <TextField source="status" />
        <TextField source="status_notes" />
        <DateField source="created_at" key="created_at" showTime />,
        <DateField source="updated_at" key="updated_at" showTime />,
      </Datagrid>
    </List>
  );
}

export default TicketsList;
