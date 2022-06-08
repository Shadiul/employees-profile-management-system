import { SystemManager } from "./system_manager";

export interface Admin {
  username: string;
  downlineSystemManagers: SystemManager[];
}
