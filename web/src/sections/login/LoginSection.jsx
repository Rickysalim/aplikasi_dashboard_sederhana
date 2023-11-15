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
import { Container } from "@mui/material";

export default function LoginSection() {
  const { login } = useAuth();

  const defaultValues = {
    users_email: "",
    users_password: "",
  };

  const LoginSchema = Yup.object().shape({
    users_email: Yup.string().required("Email Required"),
    users_password: Yup.string().required("Password Required"),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const isMountedRef = useIsMountedRef();

  const onSubmit = async (data) => {
    try {
      await login(data.users_email, data.users_password);
      reset();
    } catch (error) {
      if (isMountedRef.current) {
        setError("afterSubmit", { ...error, message: error.message });
      }
      reset();
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
              Login
            </Typography>
            <Box sx={{ mt: 1 }}>
              <RHFTextField
                margin="normal"
                required
                fullWidth
                id="users_email"
                label="Email Address"
                name="users_email"
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
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={isSubmitting}
              >
                Login
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Link variant="body2">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link variant="body2" href="/register">
                    {"Don't have an account? Sign Up"}
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
