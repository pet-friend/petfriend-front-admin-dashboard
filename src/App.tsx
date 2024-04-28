import { Admin, Resource, ListGuesser, radiantDarkTheme } from "react-admin";
import PersonIcon from "@mui/icons-material/Person";
import dataProvider from "./dataProvider";
import authProvider from "./auth";

const App = () => (
  <Admin
    // @ts-ignore
    dataProvider={dataProvider}
    authProvider={authProvider}
    requireAuth
    theme={radiantDarkTheme}
  >
    <Resource name="user" list={ListGuesser} icon={PersonIcon} />
  </Admin>
);

export default App;
