import { SimpleForm, Edit, TextInput, DateInput } from "react-admin";

function UserEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" InputProps={{ disabled: true }} />
        <TextInput source="username" />
        <TextInput source="email" />
        <TextInput source="name" />
        <TextInput source="surname" />
        <DateInput source="birth_date" />
      </SimpleForm>
    </Edit>
  );
}

export default UserEdit;
