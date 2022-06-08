import React, { createContext, FC, useContext, useState } from "react";
import { Admin } from "../interfaces/admin";
import { SystemManager } from "../interfaces/system_manager";

export function useDatabase() {
  return useContext(DatabaseContext);
}

interface DatabaseInterface {
  admin: Admin;
  addSystemManager: (systemManager: SystemManager) => void;
}

export const DatabaseContext = createContext({} as DatabaseInterface);

type Props = {
  children: React.ReactNode;
};

const MockDatabaseContextProvider: FC<Props> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin>({
    username: "admin",
    downlineSystemManagers: [],
  });
  const [systemManagers, setSystemManagers] = useState<SystemManager[]>([]);

  const addSystemManager = (systemManager: SystemManager) => {
    setSystemManagers([...systemManagers, systemManager]);
  };

  console.log(systemManagers);

  return (
    <DatabaseContext.Provider
      value={{ admin: admin, addSystemManager: addSystemManager }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export default MockDatabaseContextProvider;
