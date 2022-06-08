import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog, DialogContent, DialogContentText } from "@mui/material";
import { Link } from "react-router-dom";

export type InvitaionProps = {
  email: string;
  username: string;
  password: string;
};

export default NiceModal.create((props: InvitaionProps) => {
  // Use a hook to manage the modal state
  const modal = useModal();
  return (
    <Dialog open={modal.visible} onClose={modal.remove}>
      <DialogContent>
        <DialogContentText>
          Copy this url and paste it in your address bar
        </DialogContentText>
        <DialogContentText color="primary">
          {process.env.REACT_APP_APP_URL}/system-manager/create-account?email=
          {props.email}&username=
          {props.username}&password={props.password}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
});
