import {
  SimpleForm,
  Create,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";

const filterToQuery = (searchText: string) => ({ username: searchText });

function AddressCreate() {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source="user_id" reference="users">
          <AutocompleteInput filterToQuery={filterToQuery} />
        </ReferenceInput>
        <TextInput label="Country" source="country_code" />
        <TextInput source="region" />
        <TextInput source="city" />
        <TextInput source="street" />
        <TextInput source="street_number" />
        <TextInput source="type" />
        <TextInput source="apartment" />
      </SimpleForm>
    </Create>
  );
}

export default AddressCreate;
