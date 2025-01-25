import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateCurrentPassword } from "../../services/apiAuth";

export function useUpdatePassword() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updatePassword } = useMutation({
    mutationFn: ({ password, passwordCurrent }) => {
      return updateCurrentPassword({ password, passwordCurrent });
    },
    onSuccess: (user) => {
      toast.success("User data Successfully updated");
      queryClient.setQueryData(["user"], user.data.user);
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Error while updating password");
    },
  });
  return { isUpdating, updatePassword };
}
