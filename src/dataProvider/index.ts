import type { DataProvider } from "react-admin";
import userProvider from "./users";
import { HttpStatusCode, isAxiosError } from "axios";
import addressProvider from "./addresses";
import adminProvider from "./admin";

type ResourceType = "users";

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

const providers: Record<string, DataProvider<any>> = {
  users: userProvider,
  addresses: addressProvider,
  admins: adminProvider,
};

// @ts-ignore
const dataProvider: DataProvider<ResourceType> = Object.fromEntries(
  METHODS.map((method) => [
    method,
    async (...args: Parameters<DataProvider[typeof method]>) => {
      const func = providers[args[0]]?.[method];
      if (!func) throw new Error(`Provider for ${args[0]} not implemented`);
      // @ts-ignore
      const result: Promise<unknown> = func(...args);
      return result.catch((error) => {
        if (
          isAxiosError(error) &&
          error.response?.status === HttpStatusCode.BadRequest
        ) {
          throw {
            message:
              "Validation error: " +
              Object.entries(error.response.data.detail)
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                .map(([key, value]) => `${key}: ${value}`)
                .join("; "),
          };
        }
        throw error;
      });
    },
  ]),
);

export default dataProvider;
