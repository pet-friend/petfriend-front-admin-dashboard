import {
  SimpleForm,
  Edit,
  TextInput,
  SelectInput,
  DateTimeInput,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import { TICKET_STATUS_CHOICES } from "../../constants";

function EditTicket() {
  return (
    <Edit mutationMode="pessimistic">
      <SimpleForm>
        <ReferenceInput source="user_id" reference="users" label="User">
          <AutocompleteInput disabled />
        </ReferenceInput>
        <TextInput source="id" InputProps={{ disabled: true }} />
        <TextInput source="title" />
        <TextInput source="description" />
        <SelectInput source="status" choices={TICKET_STATUS_CHOICES} />
        <TextInput source="status_notes" />
        <DateTimeInput
          source="created_at"
          key="created_at"
          InputProps={{ disabled: true }}
        />
        <DateTimeInput
          source="updated_at"
          key="updated_at"
          InputProps={{ disabled: true }}
        />
      </SimpleForm>
    </Edit>
  );
}

export default EditTicket;
