import { useForm } from "react-hook-form";

// import { useUpdateUser } from "./useUpdateUser";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { Typography } from "@mui/material";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import { useEffect } from "react";

function UpdateUserDataForm() {
  const { user } = useUser();
  const { email, name, avatar } = user || {};
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      email: email || "",
      name: name || "",
      avatar: avatar || "",
    },
  });
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ name }) {
    updateUser(name, { onSuccess: () => reset() });
  }
  useEffect(() => {
    reset({
      email: email || "",
      name: name || "",
      avatar: avatar || "",
    });
  }, [user, email, name, avatar, reset]);
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
        Update user data
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
          <FormLabel>Email address</FormLabel>
          <TextField
            placeholder="Your@email.com"
            type="email"
            disabled
            id="email"
            required
            fullWidth
            variant="outlined"
            value={email || isUpdating}
          />
        </FormControl>

        <FormControl
          sx={{
            width: { xs: "100%", sm: "70%" },
          }}
        >
          <FormLabel htmlFor="name">FullName</FormLabel>
          <TextField
            placeholder="name"
            type="text"
            id="name"
            required
            fullWidth
            disabled={isUpdating}
            variant="outlined"
            {...register("name", {
              required: "This field is required",
            })}
            error={!!errors?.name}
            helperText={errors?.name?.message}
            color={errors?.name?.message ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <div className="flex justify-end gap-4">
            <Button
              onClick={reset}
              variation="reset"
              type="reset"
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button type="submit" variation="primary" disabled={isUpdating}>
              Update Account
            </Button>
          </div>
        </FormControl>
      </Box>
    </Card>
  );
}

export default UpdateUserDataForm;
