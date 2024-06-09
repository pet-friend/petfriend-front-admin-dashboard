import {
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceField,
  DateField,
} from "react-admin";

function ShowTicket() {
  return (
    <Show>
      <SimpleShowLayout>
        <ReferenceField source="user_id" reference="users" label="User" />
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="description" />
        <TextField source="status" />
        <TextField source="status_notes" />
        <DateField source="created_at" key="created_at" showTime />,
        <DateField source="updated_at" key="updated_at" showTime />,
      </SimpleShowLayout>
    </Show>
  );
}

export default ShowTicket;
