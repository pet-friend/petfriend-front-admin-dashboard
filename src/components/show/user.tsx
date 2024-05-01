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
} from "react-admin";
import type { Identifier } from "react-admin";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import CardHeader from "@mui/material/CardHeader";
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
      <Show>
        <SimpleShowLayout>
          <TextField source="id" />
          <ImageField label="Image" source="image_url" />
          <TextField source="username" />
          <EmailField source="email" />
          <TextField source="name" />
          <TextField source="surname" />
          <DateField source="birth_date" />
        </SimpleShowLayout>
      </Show>
      <Card sx={{ marginTop: "1rem" }}>
        <CardHeader title="User settings" />
        <CardContent>
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem",
            }}
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
    </>
  );
}

export default UserShow;
