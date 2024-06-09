import { ListBase, Datagrid, TextField, EmailField } from "react-admin";

function AdminsList() {
  return (
    <ListBase resource="admins">
      <Datagrid rowClick={(id) => `/users/${id}/show`}>
        <TextField source="id" sortable={false} />
        <TextField source="username" sortable={false} />
        <EmailField source="email" sortable={false} />
        <TextField source="name" sortable={false} />
        <TextField source="surname" sortable={false} />
      </Datagrid>
    </ListBase>
  );
}

export default AdminsList;
