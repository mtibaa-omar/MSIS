import { useForm } from "react-hook-form";

// import { useUpdateUser } from "./useUpdateUser";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { Typography } from "@mui/material";
import { useUpdatePassword } from "./useUpdatePass";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm({
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });
  const { errors } = formState;

  const { updatePassword, isUpdating } = useUpdatePassword();

  function onSubmit(data) {
    const { password, passwordCurrent } = data;
    updatePassword({ password, passwordCurrent }, { onSuccess: () => reset() });
  }

  return (
    <Card
      variant="outlined"
      sx={{
        marginLeft: "0.5rem",
        maxWidth: { xs: "100%", sm: "500px" },
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Update password
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
        <FormControl
          sx={{
            width: { xs: "100%", sm: "70%" },
          }}
        >
          <FormLabel htmlFor="passwordCurrent">Current Password</FormLabel>
          <TextField
            placeholder="••••••••"
            type="password"
            id="passwordCurrent"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            {...register("passwordCurrent", {
              required: "This field is required",
            })}
            error={!!errors?.passwordCurrent}
            helperText={errors?.passwordCurrent?.message}
            color={errors?.passwordCurrent?.message ? "error" : "primary"}
            disabled={isUpdating}
          />
        </FormControl>
        <FormControl
          sx={{
            width: { xs: "100%", sm: "70%" },
          }}
        >
          <FormLabel htmlFor="password">New Password</FormLabel>
          <TextField
            placeholder="••••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            {...register("password", {
              required: "This field is required",
            })}
            error={!!errors?.password}
            helperText={errors?.password?.message}
            color={errors?.password?.message ? "error" : "primary"}
            disabled={isUpdating}
          />
        </FormControl>

        <FormControl
          sx={{
            width: { xs: "100%", sm: "70%" },
          }}
        >
          <FormLabel htmlFor="passwordConfirm">Confirm New Password</FormLabel>
          <TextField
            placeholder="••••••••"
            type="password"
            id="passwordConfirm"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
            error={!!errors?.passwordConfirm}
            helperText={errors?.passwordConfirm?.message}
            color={errors?.passwordConfirm?.message ? "error" : "primary"}
            disabled={isUpdating}
          />
        </FormControl>
        <FormControl>
          <div className="flex justify-end gap-4">
            <Button type="reset" variation="reset" disabled={isUpdating}>
              Cancel
            </Button>
            <Button type="submit" variation="primary" disabled={isUpdating}>
              Update password
            </Button>
          </div>
        </FormControl>
      </Box>
    </Card>
  );
}

export default UpdatePasswordForm;
