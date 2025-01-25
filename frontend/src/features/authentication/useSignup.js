import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-toastify";

export function useSignup() {
  const queryClient = useQueryClient();

  const { isPending: isSigninUp, mutate: signup } = useMutation({
    mutationFn: ({ name, email, password }) =>
      signupApi({ name, email, password }),
    onSuccess: (user) => {
      toast.success("User successfully created");
      queryClient.setQueryData(["user"], user.data.user);
    },
    onError: (err) => toast.error(err.message),
  });
  return { isSigninUp, signup };
}
