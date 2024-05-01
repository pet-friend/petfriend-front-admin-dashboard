import {
  List,
  Datagrid,
  TextField,
  TextInput,
  NumberField,
  ReferenceField,
} from "react-admin";

const filters = [
  <TextInput source="country_code" key="country_code" />,
  <TextInput source="region" key="region" />,
  <TextInput source="city" key="city" />,
  <TextInput source="street" key="street" />,
  <TextInput source="street_number" key="street_number" />,
  <TextInput source="type" key="type" />,
  <TextInput source="apartment" key="apartment" />,
];

function AddressesList() {
  return (
    <List filters={filters}>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField label="Country" source="country_code" />
        <TextField source="region" />
        <TextField source="city" />
        <TextField source="street" />
        <TextField source="street_number" />
        <TextField source="type" />
        <TextField source="apartment" />
        <NumberField source="latitude" />
        <NumberField source="longitude" />
        <ReferenceField source="user_id" reference="users" label="users" />
      </Datagrid>
    </List>
  );
}

export default AddressesList;
