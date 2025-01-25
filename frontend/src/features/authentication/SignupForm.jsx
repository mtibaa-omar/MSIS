import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FaFacebook } from "react-icons/fa";
import styled from "styled-components";

import { FcGoogle } from "react-icons/fc";
import CssBaseline from "@mui/material/CssBaseline";
import { useDarkMode } from "../../context/DarkModeContext";
import { useForm } from "react-hook-form";
import { Link as MuiLink } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "./useSignup";
import FormContainer from "../../ui/Form";
import Card from "../../ui/Card";

const StyledBox = styled.div`
  background: ${({ theme }) =>
    theme.darkMode === "dark"
      ? "linear-gradient(135deg, #1f2937 50%, #fff 50%)"
      : "linear-gradient(315deg, #3b82f6 50%, #fff 50%)"};
`;

function SignupForm() {
  const { darkMode } = useDarkMode();
  const { signup, isSigninUp } = useSignup();
  console.log(isSigninUp);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function onSubmit(data) {
    signup(data, { onSuccess: () => navigate("/") });
  }

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
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                id="name"
                placeholder="Jon Snow"
                {...register("name", { required: "This field is required" })}
                error={!!errors?.name}
                helperText={errors?.name?.message}
                disabled={isSigninUp}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                placeholder="your@email.com"
                autoComplete="email"
                {...register("email", {
                  required: "This Field is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please provide a valid email address",
                  },
                })}
                error={!!errors?.email}
                helperText={errors?.email?.message}
                disabled={isSigninUp}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                placeholder="••••••"
                type="password"
                autoComplete="new-password"
                {...register("password", {
                  required: "This field is required",
                })}
                error={!!errors?.password}
                helperText={errors?.password?.message}
                disabled={isSigninUp}
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox {...register("allowExtraEmails")} />}
              label="I want to receive updates via email."
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSigninUp}
            >
              Sign up
            </Button>
          </Box>

          <Divider>
            <Typography
              sx={{ color: darkMode === "dark" ? "#fff" : "text.secondary" }}
            >
              or
            </Typography>
          </Divider>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button fullWidth variant="outlined" startIcon={<FcGoogle />}>
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FaFacebook color="#3b82f6" />}
            >
              Sign up with Facebook
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <MuiLink
                component={Link}
                to="/login"
                variant="body2"
                sx={{
                  alignSelf: "center",
                  "&:hover": {
                    color: "#3b82f6",
                  },
                }}
              >
                Sign in
              </MuiLink>
            </Typography>
          </Box>
        </Card>
      </FormContainer>
    </StyledBox>
  );
}

export default SignupForm;
