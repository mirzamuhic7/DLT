import { useMutation } from "react-query";
import { showSnackBar, useVisionUIController } from "../../context";
import { apiClient } from "../apiClient";
import { useHistory } from "react-router-dom";

const createRefreshTokenFn = async (refreshToken) => {
  const response = await apiClient.post("/auth/refresh-tokens", { refreshToken });
  return response.data;
};

export function useRefreshToken() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context
  const history = useHistory();

  return useMutation({
    mutationFn: createRefreshTokenFn,
    onSuccess: (data) => {
      // Trigger success Snackbar
      console.log(data);

      localStorage.setItem("access_token", data.token);
      localStorage.setItem("refresh_token", data.refresh);
    },
    onError: (err, credentials, context) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || "An error occurred!", "error");
      history.push("/authentication/sign-in");
    },
  });
}

