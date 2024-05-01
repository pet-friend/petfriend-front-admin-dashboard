import { SimpleForm, Create, TextInput, DateInput } from "react-admin";

function UserCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="username" />
        <TextInput source="password" />
        <TextInput source="email" />
        <TextInput source="name" />
        <TextInput source="surname" />
        <DateInput source="birth_date" />
      </SimpleForm>
    </Create>
  );
}

export default UserCreate;
