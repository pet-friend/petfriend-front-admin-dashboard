import { Show, SimpleShowLayout, TextField, NumberField } from "react-admin";

function UserShow() {
  return (
    <Show>
      <SimpleShowLayout>
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
