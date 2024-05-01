import {
  SimpleForm,
  Edit,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  SelectInput,
} from "react-admin";
import { USER_ADDRESS_TYPE_CHOICES } from "../../constants";

function AddressEdit() {
  return (
    <Edit mutationMode="pessimistic">
      <SimpleForm>
        <ReferenceInput source="user_id" reference="users" label="User">
          <AutocompleteInput disabled />
        </ReferenceInput>{" "}
        <TextInput source="id" InputProps={{ disabled: true }} />
        <TextInput label="Country" source="country_code" />
        <TextInput source="region" />
        <TextInput source="city" />
        <TextInput source="street" />
        <TextInput source="street_number" />
        <SelectInput source="type" choices={USER_ADDRESS_TYPE_CHOICES} />
        <TextInput source="apartment" />
      </SimpleForm>
    </Edit>
  );
}

export default AddressEdit;
