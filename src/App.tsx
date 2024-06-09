import { Admin, Resource, defaultDarkTheme } from "react-admin";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import dataProvider from "./dataProvider";
import authProvider from "./auth";
import Layout from "./components/Layout";
import Home from "./components/Dashboard";

import UsersList from "./components/list/users";
import ShowUser from "./components/show/user";
import EditUser from "./components/edit/user";
import CreateUser from "./components/create/user";
import AddressesList from "./components/list/addresses";
import ShowAddress from "./components/show/address";
import EditAddress from "./components/edit/address";
import CreateAddress from "./components/create/address";
import TicketsList from "./components/list/tickets";
import ShowTicket from "./components/show/ticket";
import EditTicket from "./components/edit/ticket";
import CreateTicket from "./components/create/ticket";

const App = () => (
  <Admin
    // @ts-ignore
    dataProvider={dataProvider}
    authProvider={authProvider}
    requireAuth
    layout={Layout}
    darkTheme={defaultDarkTheme}
    dashboard={Home}
  >
    <Resource
      name="users"
      list={UsersList}
      show={ShowUser}
      edit={EditUser}
      create={CreateUser}
      icon={PersonIcon}
      recordRepresentation={(record) => record.username}
    />
    <Resource
      name="addresses"
      list={AddressesList}
      show={ShowAddress}
      edit={EditAddress}
      create={CreateAddress}
      icon={MapIcon}
      recordRepresentation={(record) =>
        `${record.street_number} ${record.street}, ${record.city}, ${record.region}, ${record.country_code}`
      }
    />
    <Resource
      name="tickets"
      list={TicketsList}
      show={ShowTicket}
      edit={EditTicket}
      create={CreateTicket}
      icon={SupportAgentIcon}
      recordRepresentation={(record) => record.title}
    />
  </Admin>
);

export default App;
