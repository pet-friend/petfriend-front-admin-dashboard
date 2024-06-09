import {
  SimpleForm,
  Create,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import { userFilterToQuery } from "../util";

function CreateTicket() {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source="user_id" reference="users">
          <AutocompleteInput filterToQuery={userFilterToQuery} />
        </ReferenceInput>
        <TextInput source="title" />
        <TextInput source="description" />
      </SimpleForm>
    </Create>
  );
}

export default CreateTicket;
