import { DataProvider } from "react-admin";
import userProvider from "./users";

type ResourceType = "user";

const METHODS = [
  "getList",
  "getOne",
  "getMany",
  "getManyReference",
  "create",
  "update",
  "updateMany",
  "delete",
  "deleteMany",
] as const;

const providers = {
  user: userProvider,
};

// @ts-ignore
const dataProvider: DataProvider<ResourceType> = Object.fromEntries(
  METHODS.map((method) => [method, providers.user[method]]),
);

export default dataProvider;
