import { Admin, Resource, defaultDarkTheme } from "react-admin";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";
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
  </Admin>
);

export default App;
