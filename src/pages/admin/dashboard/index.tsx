import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { PATHS_ADMIN } from "../../../constants/paths";

type Props = {};

const AdminDashboardPage = (props: Props) => {
  return (
    <div className="h-screen mx-auto max-w-sm flex flex-col gap-4 justify-center">
      <Link to={PATHS_ADMIN.systemManagerInvitation}>
        <Button fullWidth variant="contained">
          Invite System Manager
        </Button>
      </Link>
    </div>
  );
};

export default AdminDashboardPage;
