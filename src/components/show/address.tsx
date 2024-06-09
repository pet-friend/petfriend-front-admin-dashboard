import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ReferenceField,
} from "react-admin";

function UserShow() {
  return (
    <Show>
      <SimpleShowLayout>
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
      </SimpleShowLayout>
    </Show>
  );
}

export default UserShow;
