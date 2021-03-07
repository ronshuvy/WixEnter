import axios from "axios";
import { APIRootPath } from "@fed-exam/config";

export const PAGE_SIZE = 20;

export type Ticket = {
  id: string;
  title: string;
  content: string;
  creationTime: number;
  userEmail: string;
  labels?: string[];
};

export type getTicketsParams = {
  sortBy?: string;
  superSearch?: string;
  page?: number;
};

export const sortKeys: { [k: string]: any } = {
  date: (t1: Ticket, t2: Ticket) => t1.creationTime - t2.creationTime,
  title: (t1: Ticket, t2: Ticket) => t1.title.localeCompare(t2.title),
  email: (t1: Ticket, t2: Ticket) => t1.userEmail.localeCompare(t2.userEmail),
};

export const searchFilters: { [k: string]: any } = {
  from: (t: Ticket, v: string) => t.userEmail === v,
  before: (t: Ticket, v: string) => t.creationTime <= new Date(v).getTime(),
  after: (t: Ticket, v: string) => t.creationTime >= new Date(v).getTime(),
};

export type ApiClient = {
  getTickets: (params?: getTicketsParams) => Promise<Ticket[]>;
};

export const createApiClient = (): ApiClient => {
  return {
    getTickets: (params?: getTicketsParams) => {
      return axios.get(APIRootPath, { params }).then((res) => res.data);
    },
  };
};
