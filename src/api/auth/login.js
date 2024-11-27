import { useMutation } from "react-query";
import { queryClient } from "../../providers/queryProvider";
import { showSnackBar, useVisionUIController } from "../../context";
import { authQueryKeys } from "./index";
import { apiClient } from "../apiClient";
import { useAuth } from "../../context/auth/authContext";

const createLoginFn = async (credentials) => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
};

export function useLogin() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context
  const { login } = useAuth();

  return useMutation({
    mutationFn: createLoginFn,
    onSuccess: (data) => {
      // Store access and refresh tokens in localStorage (or secure storage)
      localStorage.setItem("access_token", data.tokens.access.token);
      localStorage.setItem("refresh_token", data.tokens.refresh.token);

      login(data);
      // Trigger success Snackbar
      showSnackBar(dispatch, "User successfully logged!", "success");
    },
    onError: (err, credentials, context) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || "An error occurred!", "error");
      return err.response.data;
    },
  });
}

