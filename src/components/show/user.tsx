import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  ImageField,
  EmailField,
  useDataProvider,
  useGetList,
  useRefresh,
  useGetRecordId,
  useNotify,
  ReferenceManyField,
  Datagrid,
} from "react-admin";
import type { Identifier } from "react-admin";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function isAdmin(admins: any[], id: Identifier) {
  return admins.map((admin) => admin.id).includes(id);
}

function UserShow() {
  const userId = useGetRecordId();
  const [loading, setLoading] = useState(true);
  const provider = useDataProvider();
  const admins = useGetList("admins").data;
  const refresh = useRefresh();
  const notify = useNotify();

  useEffect(() => {
    if (!admins) return;
    setLoading(false);
  }, [admins, userId]);

  const onClick = () => {
    if (!admins) return;
    setLoading(true);
    const checked = isAdmin(admins, userId);
    console.log(checked, provider);
    const promise = checked
      ? provider.delete("admins", { id: userId })
      : provider.create("admins", { data: { id: userId } });
    promise.then(refresh).catch(() => {
      setLoading(false);
      notify("Error updating admin status", { type: "error" });
    });
  };

  return (
    <>
      <Card sx={{ marginTop: "1rem" }}>
        <CardContent>
          User settings
          <FormGroup
            className="horizontal gap"
            sx={{ alignItems: "center", marginTop: "1rem" }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={admins && isAdmin(admins, userId)}
                  onClick={onClick}
                />
              }
              label="Petfriend Admin"
              disabled={loading}
            />
            {loading && <CircularProgress size={30} />}
          </FormGroup>
        </CardContent>
      </Card>
      <Show>
        <SimpleShowLayout>
          <TextField source="id" />
          <ImageField label="Image" source="image_url" />
          <TextField source="username" />
          <EmailField source="email" />
          <TextField source="name" />
          <TextField source="surname" />
          <DateField source="birth_date" />
          <ReferenceManyField
            reference="addresses"
            target="user_id"
            label="Addresses"
          >
            <Datagrid rowClick="show">
              <TextField label="Country" source="country_code" />
              <TextField source="region" />
              <TextField source="city" />
              <TextField source="street" />
              <TextField source="street_number" />
            </Datagrid>
          </ReferenceManyField>
          <ReferenceManyField
            reference="tickets"
            target="user_id"
            label="Tickets"
          >
            <Datagrid rowClick="show">
              <TextField source="title" />
              <TextField source="status" />
              <TextField source="description" />
              <DateField source="created_at" showTime />
              <DateField source="updated_at" showTime />
            </Datagrid>
          </ReferenceManyField>
        </SimpleShowLayout>
      </Show>
    </>
  );
}

export default UserShow;
