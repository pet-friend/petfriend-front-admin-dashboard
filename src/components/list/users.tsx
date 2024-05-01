import {
  List,
  Datagrid,
  TextField,
  DateField,
  EmailField,
  ImageField,
  TextInput,
  ReferenceManyCount,
} from "react-admin";

const filters = [
  <TextInput source="username" key="username" />,
  <TextInput source="email" key="email" />,
  <TextInput source="name" key="name" />,
  <TextInput source="surname" key="surname" />,
];

function UsersList() {
  return (
    <List filters={filters}>
      <Datagrid rowClick="show">
        <TextField source="id" />
        <ImageField label="Image" source="image_url" />
        <TextField source="username" />
        <EmailField source="email" />
        <TextField source="name" />
        <TextField source="surname" />
        <DateField source="birth_date" />
        <ReferenceManyCount
          reference="addresses"
          target="user_id"
          label="Loaded addresses"
        />
        <ReferenceManyCount
          reference="tickets"
          target="user_id"
          label="Open tickets"
          filter={{ status: "open" }}
        />
      </Datagrid>
    </List>
  );
}

export default UsersList;
