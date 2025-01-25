import { useMutation } from "@tanstack/react-query";
import { forgot as forgotApi } from "../../services/apiAuth";
import { toast } from "react-toastify";

export function useForgot() {
  const { isPending: isSendingResetEmail, mutate: forgotPassword } =
    useMutation({
      mutationFn: forgotApi,
      onSuccess: () => {
        toast.success("Mail sent!");
      },
      onError: (err) => {
        console.log(err);
        toast.error("Incorrect email ");
      },
    });
  return { isSendingResetEmail, forgotPassword };
}
