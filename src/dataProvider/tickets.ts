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

function getId(ticket: any): string {
  return `${ticket.user_id},${ticket.id}`;
}

function parseId(id: string): [string, string] {
  return id.split(",", 2) as [string, string];
}

const ticketProvider: DataProvider<"tickets"> = {
  getList: async (
    _r: "tickets",
    { pagination, sort, filter }: GetListParams,
  ) => {
    const response = await axios.get(`${USERS_API_URL}/admin/users/tickets`, {
      params: {
        sort_by: sort.field,
        sort_order: sort.order.toLowerCase(),
        limit: pagination.perPage,
        offset: (pagination.page - 1) * pagination.perPage,
        filters: JSON.stringify(filter),
      },
    });
    return {
      data: (response.data.tickets as any[]).map((ticket: any) => ({
        ...ticket,
        id: getId(ticket),
      })),
      total: response.data.amount,
    };
  },
  getOne: async (_r: "tickets", { id }: GetOneParams) => {
    const [user_id, ticket_id] = parseId(id);
    const r = await axios.get(
      `${USERS_API_URL}/admin/users/${user_id}/tickets/${ticket_id}`,
    );
    return { data: { ...r.data, id } };
  },
  getMany: async (_r: "tickets", params: GetManyParams) => {
    return {
      data: await Promise.all(
        params.ids.map((id) =>
          ticketProvider.getOne("tickets", { id }).then((r) => r.data),
        ),
      ),
    };
  },
  getManyReference: (_r: "tickets", params: GetManyReferenceParams) => {
    if (params.target != "user_id") {
      throw new Error("Invalid target for ticket reference");
    }
    return ticketProvider.getList("tickets", {
      pagination: params.pagination,
      sort: params.sort,
      filter: { ...params.filter, user_id: params.id },
    });
  },
  create: async (_r: "tickets", params: CreateParams) => {
    const r = await axios.post(
      `${USERS_API_URL}/admin/users/${params.data.user_id}/tickets`,
      params.data,
    );
    return { data: { ...r.data, id: getId(r.data) } };
  },
  update: async (_r: "tickets", params: UpdateParams) => {
    const [user_id, ticket_id] = parseId(params.id);
    const r = await axios.put(
      `${USERS_API_URL}/admin/users/${user_id}/tickets/${ticket_id}`,
      params.data,
    );
    return { data: { ...r.data, id: getId(r.data) } };
  },
  updateMany: () => {
    throw new Error("Method not implemented.");
  },
  delete: async (_r: "tickets", params: DeleteParams) => {
    const [user_id, ticket_id] = parseId(params.id);
    await axios.delete(
      `${USERS_API_URL}/admin/users/${user_id}/tickets/${ticket_id}`,
    );
    return { data: params.previousData };
  },
  deleteMany: async (_r: "tickets", params: DeleteManyParams) => {
    await Promise.all(
      params.ids.map((id) => ticketProvider.delete("tickets", { id })),
    );
    return { data: params.ids };
  },
};

export default ticketProvider;
