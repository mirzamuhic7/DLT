import { useMutation } from "react-query";
import { queryClient } from "../../providers/queryProvider";
import { showSnackBar, useVisionUIController } from "../../context";
import { authQueryKeys } from "./index";
import { apiClient } from "../apiClient";
import { useAuth } from "../../context/auth/authContext";

const createLogoutFn = async (refreshToken) => {
  const response = await apiClient.post("/auth/logout", { refreshToken });
  return response.data;
};

export function useLogout() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context
  const { logout } = useAuth();

  return useMutation({
    mutationFn: createLogoutFn,
    onSuccess: (data) => {
      logout();
      // Trigger success Snackbar
      showSnackBar(dispatch, "User successfully logged out!", "success");
    },
    onError: (err, credentials, context) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || "An error occurred!", "error");
      return err.response.data;
    },
  });
}

