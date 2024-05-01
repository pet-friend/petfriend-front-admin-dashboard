import { SimpleForm, Create, TextInput } from "react-admin";

function AddressCreate() {
  return (
    <Create>
      <SimpleForm>
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
