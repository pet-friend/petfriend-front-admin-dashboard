import type {
  CreateParams,
  DataProvider,
  DeleteManyParams,
  DeleteParams,
  GetListParams,
  GetManyParams,
  GetManyReferenceParams,
  GetOneParams,
  UpdateParams,
} from "react-admin";
import axios from "axios";
import { USERS_API_URL } from "../util";

function getId(address: any): string {
  return `${address.user_id},${address.id}`;
}

function parseId(id: string): [string, string] {
  return id.split(",", 2) as [string, string];
}

const addressProvider: DataProvider<"addresses"> = {
  getList: async (
    _r: "addresses",
    { pagination, sort, filter }: GetListParams,
  ) => {
    const response = await axios.get(`${USERS_API_URL}/admin/users/addresses`, {
      params: {
        sort_by: sort.field,
        sort_order: sort.order.toLowerCase(),
        limit: pagination.perPage,
        offset: (pagination.page - 1) * pagination.perPage,
        filters: JSON.stringify(filter),
      },
    });
    return {
      data: (response.data.addresses as any[]).map((address: any) => ({
        ...address,
        id: getId(address),
      })),
      total: response.data.amount,
    };
  },
  getOne: async (_r: "addresses", { id }: GetOneParams) => {
    const [user_id, address_id] = parseId(id);
    const r = await axios.get(
      `${USERS_API_URL}/users/${user_id}/addresses/${address_id}`,
    );
    return { data: { ...r.data, id } };
  },
  getMany: async (_r: "addresses", params: GetManyParams) => {
    return {
      data: await Promise.all(
        params.ids.map((id) =>
          addressProvider.getOne("addresses", { id }).then((r) => r.data),
        ),
      ),
    };
  },
  getManyReference: (_r: "addresses", params: GetManyReferenceParams) => {
    if (params.target != "user_id") {
      throw new Error("Invalid target for address reference");
    }
    return addressProvider.getList("addresses", {
      pagination: params.pagination,
      sort: params.sort,
      filter: { ...params.filter, user_id: params.id },
    });
  },
  create: async (_r: "addresses", params: CreateParams) => {
    const r = await axios.post(
      `${USERS_API_URL}/admin/users/${params.data.user_id}/addresses`,
      params.data,
    );
    return { data: { ...r.data, id: getId(r.data) } };
  },
  update: async (_r: "addresses", params: UpdateParams) => {
    const [user_id, address_id] = parseId(params.id);
    const r = await axios.put(
      `${USERS_API_URL}/admin/users/${user_id}/addresses/${address_id}`,
      params.data,
    );
    return { data: { ...r.data, id: getId(r.data) } };
  },
  updateMany: () => {
    throw new Error("Method not implemented.");
  },
  delete: async (_r: "addresses", params: DeleteParams) => {
    const [user_id, address_id] = parseId(params.id);
    await axios.delete(
      `${USERS_API_URL}/admin/users/${user_id}/addresses/${address_id}`,
    );
    return { data: params.previousData };
  },
  deleteMany: async (_r: "addresses", params: DeleteManyParams) => {
    await Promise.all(
      params.ids.map((id) => addressProvider.delete("addresses", { id })),
    );
    return { data: params.ids };
  },
};

export default addressProvider;
