import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ForgotPassword from "./ForgotPassword";
import styled from "styled-components";

import { useForm } from "react-hook-form";
import { useDarkMode } from "../../context/DarkModeContext";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import { useLogin } from "./useLogin";
import FormContainer from "../../ui/Form";
import Card from "../../ui/Card";

const StyledBox = styled.div`
  background: ${({ theme }) =>
    theme.darkMode === "dark"
      ? "linear-gradient(135deg, #1f2937 50%, #fff 50%)"
      : "linear-gradient(315deg, #3b82f6 50%, #fff 50%)"};
`;
export default function SignIn() {
  const [open, setOpen] = useState(false);
  const { darkMode } = useDarkMode();
  const { isLoggingIn, login } = useLogin();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    login(data, {
      onSuccess: () => {
        navigate("/", { replace: true });
      },
    });
  };
  return (
    <StyledBox theme={{ darkMode }}>
      <CssBaseline enableColorScheme />
      <FormContainer direction="column" justifyContent="space-between">
        <Card variant="outlined" sx={{ marginTop: "2rem" }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                disabled={isLoggingIn}
                variant="outlined"
                {...register("email", {
                  required: "This Field is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please provide a valid email address",
                  },
                })}
                error={!!errors?.email}
                helperText={errors?.email?.message}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                {...register("password", {
                  required: "This field is required",
                })}
                disabled={isLoggingIn}
                error={!!errors?.password}
                helperText={errors?.password?.message}
                color={errors?.password?.message ? "error" : "primary"}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoggingIn}
            >
              Sign in
            </Button>
            <MuiLink
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{
                alignSelf: "center",
                "&:hover": {
                  color: "#3b82f6",
                },
              }}
            >
              Forgot your password?
            </MuiLink>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Google")}
              startIcon={<FcGoogle />}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Facebook")}
              startIcon={<FaFacebook color="#3b82f6" />}
            >
              Sign in with Facebook
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <MuiLink
                component={Link}
                to="/signup"
                variant="body2"
                sx={{
                  alignSelf: "center",
                  "&:hover": {
                    color: "#3b82f6",
                  },
                }}
              >
                Sign up
              </MuiLink>
            </Typography>
          </Box>
        </Card>
      </FormContainer>
    </StyledBox>
  );
}
