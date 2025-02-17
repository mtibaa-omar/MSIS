import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import uploadImageApi from "../../services/apiUploadImage";

export function useUploadImage() {
  const { isPending: isUploading, mutate: uploadImage } = useMutation({
    mutationFn: uploadImageApi,
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isUploading, uploadImage };
}
