import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { LoadingButton } from "@mui/lab";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Iconify from "../../components/Iconify";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "../../components/hook-form/RHFTextField";
import useAuth from "../../hooks/useAuth";
import { Container, TextField } from "@mui/material";
import RHFFormSelect from "../../components/hook-form/RHFSelect";

export default function RegisterSection() {
  const { register } = useAuth();

  const defaultValues = {
    users_picture: {},
    users_fullname: "",
    users_email: "",
    users_password: "",
    users_role: 0,
  };

  const LoginSchema = Yup.object().shape({
    users_email: Yup.string().required("Email Required"),
    users_fullname: Yup.string().required("Fullname Required"),
    users_password: Yup.string().required("Password Required"),
    users_role: Yup.number().required("Role Required"),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const isMountedRef = useIsMountedRef();

  const onSubmit = async (data) => {
    try {
      await register(data?.users_picture, data?.users_fullname,data?.users_email,data?.users_password, data?.users_role);
      reset();
    } catch (error) {
      if (isMountedRef.current) {
        setError("afterSubmit", { ...error, message: error.message });
      }
      reset();
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue(
        "users_picture",
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Container component="main" maxWidth="xs">
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <Iconify icon="mdi:clothes-hanger" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                type="file"
                name="users_picture"
                onChange={handleFile}
                placeholder="Users Picture"
              />
              <RHFTextField
                margin="normal"
                required
                fullWidth
                label="Fullname"
                name="users_fullname"
                id="users_fullname"
                autoComplete="text"
                autoFocus
              />
              <RHFTextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="users_email"
                type="email"
                id="users_email"
                autoComplete="email"
                autoFocus
              />
              <RHFTextField
                margin="normal"
                required
                fullWidth
                name="users_password"
                label="Password"
                type="password"
                id="users_password"
                autoComplete="current-password"
                autoFocus
              />
              <RHFFormSelect
                margin="normal"
                required
                fullWidth
                id="users_role"
                label="Role"
                name="users_role"
              >
                <option value="0">
                   User
                </option>
                <option value="1">
                   Admin
                </option>
              </RHFFormSelect>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={isSubmitting}
              >
                Register
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Link variant="body2">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link variant="body2" href="/login">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Container>
    </FormProvider>
  );
}
