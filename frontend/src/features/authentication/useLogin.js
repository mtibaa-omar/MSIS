import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-toastify";

export function useLogin() {
  const queryClient = useQueryClient();

  const { isPending: isLoggingIn, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.data.user);
      toast.success("Login Successfully");
    },
    onError: () => {
      toast.error("Incorrect email or password");
    },
  });
  return { isLoggingIn, login };
}
