import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BrowserRouter, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { PATHS_ADMIN } from "../../../constants/paths";
import { ILoginParams, useAuth } from "../../../contexts/AuthContextProvider";

type Props = {};

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const AdminLoginPage = (props: Props) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const login = async (params: ILoginParams) => {
    setLoading(true);

    setTimeout(() => {
      auth.login(params).then((resp) => {
        if (resp === "success") {
          navigate(PATHS_ADMIN.dashboard, { replace: true });
        }
      });

      setLoading(false);
    }, 2000);
  };

  const { handleSubmit, control } = useForm<ILoginParams>({
    defaultValues: { role: "admin" },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ILoginParams> = (data) => login(data);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-screen mx-auto max-w-sm flex flex-col gap-4 justify-center"
      >
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label="Username"
              placeholder="admin"
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
              placeholder="1234"
              type="password"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <LoadingButton type="submit" variant="contained" loading={loading}>
          Login
        </LoadingButton>
      </form>
    </>
  );
};

export default AdminLoginPage;
