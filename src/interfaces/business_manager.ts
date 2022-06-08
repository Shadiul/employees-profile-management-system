import { Employee } from "./user";

export interface BusinessManager {
  uplineSystemManagerUsername: string;
  email: string;
  username: string;
  downlineEmployees: Employee[];
}
