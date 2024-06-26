import { useGetIdentity, useGetList } from "react-admin";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CountCard from "./dashboard/CountCard";
import AdminsList from "./list/admins";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Unstable_Grid2";

function Dashboard() {
  const identity = useGetIdentity();
  const { total: userTotal } = useGetList("users", {
    pagination: { page: 1, perPage: 1 },
  });
  const { total: addressesTotal } = useGetList("addresses", {
    pagination: { page: 1, perPage: 1 },
  });
  const { total: openTicketsTotal } = useGetList("tickets", {
    pagination: { page: 1, perPage: 1 },
    filter: { status: "open" },
  });

  return (
    <>
      <Grid container spacing={3} sx={{ margin: "1rem" }}>
        <Grid xs={4.5}>
          <Card>
            <CardHeader title="Petfriend admin dashboard" />
            {identity.data && (
              <CardContent>Welcome, {identity.data.fullName}</CardContent>
            )}
          </Card>
        </Grid>
        <Grid xs={2.5}>
          <CountCard
            title="Registered users"
            value={userTotal?.toString() ?? "Loading..."}
            icon={<PersonIcon />}
            color="primary"
          />
        </Grid>
        <Grid xs={2.5}>
          <CountCard
            title="Loaded addresses"
            value={addressesTotal?.toString() ?? "Loading..."}
            icon={<MapIcon />}
            color="secondary"
          />
        </Grid>
        <Grid xs={2.5}>
          <CountCard
            title="Open tickets"
            value={openTicketsTotal?.toString() ?? "Loading..."}
            icon={<SupportAgentIcon />}
            color="success"
          />
        </Grid>
        <Grid xs={12}>
          <Card sx={{ padding: "1rem" }}>
            <CardHeader title="Administrators" />
            <CardContent>
              Add more admins by opening selecting a user in the Users tab
            </CardContent>
            <AdminsList />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
