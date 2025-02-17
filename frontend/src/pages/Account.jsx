import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import Row from "../ui/Row";
import FormContainer from "../ui/FormContainer";
import { Typography } from "@mui/material";

function Account() {
  return (
    <FormContainer>
      <Row>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Update user data
        </Typography>
        <UpdateUserDataForm />

        <UpdatePasswordForm />
      </Row>
    </FormContainer>
  );
}

export default Account;
