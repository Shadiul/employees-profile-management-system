import { useModal } from "@ebay/nice-modal-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import InvitaionDialog from "./components/InvitaionDialog";

type Props = {};

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

interface InvitaionParams {
  email: string;
  username: string;
  password: string;
}

const SystemManagerInvitationPage = (props: Props) => {
  const invitationDialog = useModal(InvitaionDialog);
  const [loading, setLoading] = useState(false);
  const sendInvite = async (params: InvitaionParams) => {
    setLoading(true);

    setTimeout(() => {
      invitationDialog.show({
        email: params.email,
        username: params.username,
        password: params.password,
      });
      setLoading(false);
    }, 2000);
  };

  const { handleSubmit, control } = useForm<InvitaionParams>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<InvitaionParams> = (data) => sendInvite(data);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-screen mx-auto max-w-sm flex flex-col gap-4 justify-center"
      >
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              placeholder="example@email.com"
              type="email"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label="Username"
              placeholder="Username for system manager"
              type="text"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label="Password"
              placeholder="Password for system manager"
              type="password"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <LoadingButton type="submit" variant="contained" loading={loading}>
          Send Invite
        </LoadingButton>
      </form>
    </>
  );
};

export default SystemManagerInvitationPage;
