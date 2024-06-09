import {
  List,
  Datagrid,
  TextField,
  TextInput,
  NumberField,
  ReferenceField,
  SelectInput,
} from "react-admin";
import { USER_ADDRESS_TYPE_CHOICES } from "../../constants";

const filters = [
  <TextInput source="country_code" key="country_code" />,
  <TextInput source="region" key="region" />,
  <TextInput source="city" key="city" />,
  <TextInput source="street" key="street" />,
  <TextInput source="street_number" key="street_number" />,
  <SelectInput source="type" key="type" choices={USER_ADDRESS_TYPE_CHOICES} />,
  <TextInput source="apartment" key="apartment" />,
];

function AddressesList() {
  return (
    <List filters={filters}>
      <Datagrid rowClick="show">
        <ReferenceField source="user_id" reference="users" label="users" />
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
      </Datagrid>
    </List>
  );
}

export default AddressesList;
