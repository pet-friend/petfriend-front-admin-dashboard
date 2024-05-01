import { Layout as InnerLayout } from "react-admin";
import type { LayoutProps } from "react-admin";
import Toolbar from "./Toolbar";

function Layout(props: LayoutProps) {
  return <InnerLayout {...props} appBar={Toolbar} />;
}

export default Layout;
