import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { PATHS_ADMIN, PATHS_SYSTEM_MANAGER } from "../../constants/paths";

type Props = {};

const RoleSelectionPage = (props: Props) => {
  return (
    <div className="h-screen mx-auto max-w-sm flex flex-col gap-4 justify-center items-center">
      <Link to={PATHS_ADMIN.login}>
        <Button variant="contained">Admin</Button>
      </Link>
      <Link to={PATHS_SYSTEM_MANAGER.login}>
        <Button variant="contained">System Manager</Button>
      </Link>
      <Link to={""}>
        <Button variant="contained">General User</Button>
      </Link>
    </div>
  );
};

export default RoleSelectionPage;
