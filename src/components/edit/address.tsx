import { SimpleForm, Edit, TextInput } from "react-admin";

function AddressEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" InputProps={{ disabled: true }} />
        <TextInput label="Country" source="country_code" />
        <TextInput source="region" />
        <TextInput source="city" />
        <TextInput source="street" />
        <TextInput source="street_number" />
        <TextInput source="type" />
        <TextInput source="apartment" />
      </SimpleForm>
    </Edit>
  );
}

export default AddressEdit;
