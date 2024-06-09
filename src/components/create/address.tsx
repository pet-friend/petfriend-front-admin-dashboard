import {
  SimpleForm,
  Create,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  SelectInput,
} from "react-admin";
import { userFilterToQuery } from "../util";
import { USER_ADDRESS_TYPE_CHOICES } from "../../constants";

function AddressCreate() {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source="user_id" reference="users">
          <AutocompleteInput filterToQuery={userFilterToQuery} />
        </ReferenceInput>
        <TextInput label="Country" source="country_code" />
        <TextInput source="region" />
        <TextInput source="city" />
        <TextInput source="street" />
        <TextInput source="street_number" />
        <SelectInput
          source="type"
          key="type"
          choices={USER_ADDRESS_TYPE_CHOICES}
        />
        <TextInput source="apartment" />
      </SimpleForm>
    </Create>
  );
}

export default AddressCreate;
