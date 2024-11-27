import { useMutation } from "react-query";
import { showSnackBar, useVisionUIController } from "../../context";
import { apiClient } from "../apiClient";
import { useHistory } from "react-router-dom";

const createResetPasswordFn = async ({ token, password }) => {
    const response = await apiClient.post(`/auth/reset-password?token=${token}`, { password });
    return response.data;
};

export function useResetPassword() {
    const [, dispatch] = useVisionUIController(); // Get dispatch from context
    const history = useHistory();

    return useMutation({
        mutationFn: createResetPasswordFn,
        onSuccess: (data) => {
            showSnackBar(dispatch, "Password successfully updated !", "success");
            history.push("/authentication/sign-in");
        },
        onError: (err, credentials, context) => {
            // Trigger error Snackbar
            showSnackBar(dispatch, err.response?.data?.message || "An error occurred!", "error");
        },
    });
}

