import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      toast.success("User data Successfully updated");
      queryClient.setQueryData(["user"], user.data.user);
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateUser };
}
