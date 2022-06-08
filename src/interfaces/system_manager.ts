import { BusinessManager } from "./business_manager";

export interface SystemManager {
  uplineAadminUsername: string;
  email: string;
  username: string;
  downlineBusinessManagers: BusinessManager[];
}
