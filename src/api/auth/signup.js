import { useMutation } from "react-query";
import { apiClient, authQueryKeys } from "../index";
import { queryClient } from "../../providers/queryProvider";
import { showSnackBar, useVisionUIController } from "../../context";
import { useAuth } from "../../context/auth/authContext";

const createSignUpFn = async (newUser) => {
  const response = await apiClient.post("/auth/teacher/register", newUser);
  return response.data;
};

export function useSignUp() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context
  const { login } = useAuth();

  return useMutation({
    mutationFn: createSignUpFn,
    onSuccess: (data) => {
      // Store access and refresh tokens in localStorage (or secure storage)
      localStorage.setItem("access_token", data.tokens.access.token);
      localStorage.setItem("refresh_token", data.tokens.refresh.token);

      login(data);
      // Trigger success Snackbar
      showSnackBar(dispatch, "User successfully registered!", "success");
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || "An error occurred!", "error");
      return err.response.data;
    },
  });
}
