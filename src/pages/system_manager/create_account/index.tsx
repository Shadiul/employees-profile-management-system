import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { PATHS_SYSTEM_MANAGER } from "../../../constants/paths";
import { useAuth } from "../../../contexts/AuthContextProvider";
import { useDatabase } from "../../../contexts/MockDataContextProvider";

type Props = {};

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

interface CreateAccountParams {
  email: string;
  username: string;
  password: string;
}

const SystemManagerCreateAccountPage = (props: Props) => {
  let [searchParams] = useSearchParams();

  const auth = useAuth();
  const database = useDatabase();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const createAccount = async (params: CreateAccountParams) => {
    setLoading(true);

    setTimeout(() => {
      auth
        .login({ role: "system_manager", username: "", password: "" })
        .then((resp) => {
          if (resp === "success") {
            database.addSystemManager({
              uplineAadminUsername: database.admin.username,
              username: params.username,
              email: params.email,
              downlineBusinessManagers: [],
            });
            navigate(PATHS_SYSTEM_MANAGER.dashboard);
          }
        });
      setLoading(false);
    }, 2000);
  };

  const { handleSubmit, control } = useForm<CreateAccountParams>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreateAccountParams> = (data) =>
    createAccount(data);

  useEffect(() => {
    if (
      searchParams.get("email") &&
      searchParams.get("username") &&
      searchParams.get("password")
    ) {
      handleSubmit(
        onSubmit({
          email: searchParams.get("email")!,
          username: searchParams.get("username")!,
          password: searchParams.get("password")!,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (
    !searchParams.get("email") ||
    !searchParams.get("username") ||
    !searchParams.get("password")
  ) {
    return (
      <div className="text-red-500 h-screen mx-auto max-w-sm flex flex-col gap-4 justify-center items-center">
        Invalid Invitation Link
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-screen mx-auto max-w-sm flex flex-col gap-4 justify-center"
      >
        <Controller
          name="email"
          control={control}
          defaultValue={searchParams.get("email") ?? ""}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              InputProps={{ readOnly: true }}
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
          defaultValue={searchParams.get("username") ?? ""}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              InputProps={{ readOnly: true }}
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
          defaultValue={searchParams.get("password") ?? ""}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              InputProps={{ readOnly: true }}
              fullWidth
              label="Password"
              placeholder="Password for system manager"
              type="password"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          onClick={handleSubmit(onSubmit)}
        >
          Create Account
        </LoadingButton>
      </form>
    </>
  );
};

export default SystemManagerCreateAccountPage;
